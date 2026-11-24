// src/worker/notify.ts
interface Env {
  NOTIFY_SECRET: string;
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
}

const clean = (s: string) =>
  s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? clean(m[1]) : "";
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.headers.get("X-Secret") !== env.NOTIFY_SECRET) {
      return new Response("Unauthorized access.", { status: 401 });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let slug = "";
    try {
      ({ slug } = await request.json<{ slug: string }>());
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }
    if (!slug) return new Response("Missing slug", { status: 400 });

    // Wait (up to ~2 min) for the new post to appear in the live feed
    let item: string | undefined;
    for (let i = 0; i < 12; i++) {
      const rss = await fetch(`https://blog.charmanita.dev/rss.xml?t=${Date.now()}`, {
        cf: { cacheTtl: 0 },
      });
      const text = await rss.text();
      const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];
      item = items.find((it) => it.includes(slug));
      if (item) break;
      await new Promise((r) => setTimeout(r, 10000));
    }
    if (!item) return new Response("Post not in feed yet", { status: 504 });

    const title = tag(item, "title");
    const link = tag(item, "link");
    const description = tag(item, "description");
    if (!title || !link) return new Response("Could not parse RSS item", { status: 500 });

    // Create the campaign (this only makes a draft)
    const res = await fetch("https://api.brevo.com/v3/emailCampaigns", {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `New blog post: ${title}`,
        subject: title,
        sender: { name: "noreply", email: "noreply@charmanita.dev" },
        type: "classic",
        htmlContent: `
          <h1>New blog post: ${title}</h1>
          <p>${description}</p>
          <a href="${link}">Read more</a>
          <hr>
          <p style="font-size: 12px; color: #888;">
            This is a no-reply email. To unsubscribe, reply with "unsubscribe" in the subject line.
          </p>
          <a href="{{ unsubscribe }}" style="font-size: 12px; color: #888;">Unsubscribe</a>
        `,
        recipients: { listIds: [Number(env.BREVO_LIST_ID)] },
      }),
    });

    if (!res.ok) {
      console.log(await res.text());
      return new Response("Failed to create campaign", { status: 500 });
    }

    const { id } = await res.json<{ id: number }>();

    // Actually send it
    const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${id}/sendNow`, {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY },
    });

    if (!sendRes.ok) {
      console.log(await sendRes.text());
      return new Response("Campaign created but failed to send", { status: 500 });
    }

    return new Response("Campaign sent", { status: 200 });
  },
};