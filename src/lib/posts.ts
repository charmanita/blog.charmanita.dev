export type PostMeta = {
    title: string;
    date: string;
    description: string;
    slug: string;
};

export async function getPosts(): Promise<PostMeta[]> {
    const files = import.meta.glob('/src/posts/*.md', { eager: true });
    return Object.entries(files)
        .map(([path, mod]: [string, any]) => ({
            ...mod.metadata,
            slug: path.split('/').pop()!.replace('.md', '')
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}