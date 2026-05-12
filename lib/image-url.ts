export function getImageUrl(src: string | null | undefined): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/images/")) return src;
  const bare = src.replace(/^\/api\/uploads\//, "").replace(/^\/uploads\//, "");
  if (bare.startsWith("/images/")) return bare;
  return `/api/uploads/${bare}`;
}
