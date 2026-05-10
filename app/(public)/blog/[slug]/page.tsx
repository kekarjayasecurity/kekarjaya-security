import { notFound } from "next/navigation";
import Link from "next/link";
import { query, queryOne } from "@/lib/db";
import type { BlogPost } from "@/types";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

async function getPost(slug: string) {
  try {
    return await queryOne<(BlogPost & { category_name: string })>(
      `SELECT bp.*, bc.name as category_name 
       FROM blog_posts bp 
       LEFT JOIN blog_categories bc ON bp.category_id = bc.id 
       WHERE bp.slug = ? AND bp.status = 'published'`,
      [slug]
    );
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: number | null, excludeId: number) {
  if (!categoryId) return [];
  try {
    const posts = await query<BlogPost & { category_name: string }>(
      `SELECT bp.*, bc.name as category_name 
       FROM blog_posts bp 
       LEFT JOIN blog_categories bc ON bp.category_id = bc.id 
       WHERE bp.category_id = ? AND bp.id != ? AND bp.status = 'published' 
       ORDER BY bp.published_at DESC 
       LIMIT 3`,
      [categoryId, excludeId]
    );
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post.category_id, post.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <Link
          href="/blog"
          className="text-accent-500 hover:text-accent-600 text-sm mb-4 inline-block"
        >
          &larr; Kembali ke Blog
        </Link>
      </AnimatedSection>

      <article>
        <AnimatedSection variant="fadeInUp" delay={0.1}>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            {post.category_name && (
              <span className="text-accent-500 bg-accent-50 px-2 py-1 rounded">
                {post.category_name}
              </span>
            )}
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
        </AnimatedSection>

        {post.thumbnail && (
          <AnimatedSection variant="fadeInUp" delay={0.2}>
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <img
                src={`/uploads/${post.thumbnail}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        )}

        {post.content ? (
          <AnimatedSection variant="fadeInUp" delay={0.3}>
            <div
              className="prose max-w-none text-gray-700 tiptap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedSection>
        ) : (
          <p className="text-gray-500">Konten artikel belum tersedia.</p>
        )}
      </article>

      {related.length > 0 && (
        <AnimatedSection variant="fadeInUp" delay={0.4}>
          <div className="mt-16 border-t pt-8">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              Artikel Terkait
            </h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {related.map((r) => (
                <StaggerItem key={r.id}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {r.thumbnail && (
                      <div className="aspect-video bg-gray-200">
                        <img
                          src={`/uploads/${r.thumbnail}`}
                          alt={r.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-primary-700 text-sm">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}