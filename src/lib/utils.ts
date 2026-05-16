export function formatDate(date: string): string {
  if (!date) return '';
  const [y, m, d] = date.split('T')[0].split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}