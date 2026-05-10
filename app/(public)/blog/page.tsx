import Link from "next/link";
import { query } from "@/lib/db";
import type { BlogPost, BlogCategory } from "@/types";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

async function getPosts(page: number, categoryId?: number) {
  const limit = 9;
  const offset = (page - 1) * limit;

  let where = "WHERE bp.status = 'published'";
  const params: unknown[] = [];

  if (categoryId) {
    where += " AND bp.category_id = ?";
    params.push(categoryId);
  }

  const posts = await query<BlogPost & { category_name: string }>(
    `SELECT bp.*, bc.name as category_name 
     FROM blog_posts bp 
     LEFT JOIN blog_categories bc ON bp.category_id = bc.id 
     ${where} 
     ORDER BY bp.published_at DESC 
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const countResult = await query<BlogPost & { category_name: string }>(
    `SELECT bp.*, bc.name as category_name 
     FROM blog_posts bp 
     LEFT JOIN blog_categories bc ON bp.category_id = bc.id 
     ${where}`,
    params
  );

  const total = Array.isArray(countResult) ? countResult.length : 0;

  return {
    posts: Array.isArray(posts) ? posts : [],
    totalPages: Math.ceil(total / limit),
  };
}

async function getCategories() {
  try {
    return await query<BlogCategory & { post_count: number }>(
      `SELECT bc.*, COUNT(bp.id) as post_count 
       FROM blog_categories bc 
       LEFT JOIN blog_posts bp ON bc.id = bp.category_id AND bp.status = 'published' 
       GROUP BY bc.id 
       ORDER BY bc.name`
    );
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; kategori?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const categoryId = params.kategori ? Number(params.kategori) : undefined;
  const { posts, totalPages } = await getPosts(page, categoryId);
  const categories = await getCategories();
  const catList = Array.isArray(categories) ? categories : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <h1 className="text-4xl font-bold text-primary-700 mb-8">Blog</h1>
      </AnimatedSection>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {Array.isArray(posts) && posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.thumbnail && (
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={`/uploads/${post.thumbnail}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {post.category_name && (
                      <span className="text-xs font-medium text-accent-500 bg-accent-50 px-2 py-1 rounded">
                        {post.category_name}
                      </span>
                    )}
                    <h3 className="font-bold text-primary-700 mt-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt || ""}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {posts.length === 0 && (
            <p className="text-gray-500 text-center py-12">
              Belum ada artikel yang dipublikasikan.
            </p>
          )}

          {totalPages > 1 && (
            <AnimatedSection variant="fadeInUp" delay={0.3}>
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categoryId ? `&kategori=${categoryId}` : ""}`}
                    className={`px-3 py-2 text-sm rounded-lg ${
                      p === page
                        ? "bg-primary-700 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>

        <aside className="lg:w-64 shrink-0">
          <AnimatedSection variant="fadeInRight">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-primary-700 mb-4">Kategori</h3>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className={`block text-sm px-3 py-2 rounded ${
                    !categoryId ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Semua
                </Link>
                {catList.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?kategori=${cat.id}`}
                    className={`block text-sm px-3 py-2 rounded ${
                      categoryId === cat.id ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name} ({cat.post_count})
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </aside>
      </div>
    </div>
  );
}