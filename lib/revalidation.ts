import { revalidatePath } from "next/cache";

const CONTENT_TYPE_PATHS: Record<string, ((slug?: string) => string[]) | undefined> = {
  pages: (slug?: string) => {
    if (slug === "beranda") return ["/"];
    if (slug === "tentang-kami") return ["/tentang-kami"];
    if (slug === "legalitas") return ["/legalitas"];
    if (slug === "struktur-organisasi") return ["/struktur-organisasi"];
    if (slug === "kontak") return ["/kontak"];
    return ["/"];
  },
  services: (slug?: string) => {
    const paths = ["/layanan", "/"];
    if (slug) paths.push(`/layanan/${slug}`);
    return paths;
  },
  blog_posts: (slug?: string) => {
    const paths = ["/blog"];
    if (slug) paths.push(`/blog/${slug}`);
    return paths;
  },
  blog_categories: () => ["/blog"],
  gallery_photos: () => ["/galeri"],
  gallery_categories: () => ["/galeri"],
  faq: () => ["/faq"],
  organization: () => ["/tentang-kami"],
  clients: () => ["/"],
};

export async function revalidateContentType(contentType: string, slug?: string) {
  const pathFn = CONTENT_TYPE_PATHS[contentType];
  if (!pathFn) {
    revalidatePath("/");
    return;
  }
  const paths = pathFn(slug);
  for (const p of paths) {
    revalidatePath(p);
  }
}