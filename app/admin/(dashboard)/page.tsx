import { query } from "@/lib/db";
import Card from "@/components/ui/Card";

async function getDashboardStats() {
  try {
    const blogPosts = await query<{ count: number }>("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published'");
    const galleryPhotos = await query<{ count: number }>("SELECT COUNT(*) as count FROM gallery_photos");
    const unreadMessages = await query<{ count: number }>("SELECT COUNT(*) as count FROM contact_messages WHERE is_read = FALSE");
    const services = await query<{ count: number }>("SELECT COUNT(*) as count FROM services");

    return {
      blogCount: Array.isArray(blogPosts) ? (blogPosts as unknown as { count: number }[])[0]?.count || 0 : 0,
      galleryCount: Array.isArray(galleryPhotos) ? (galleryPhotos as unknown as { count: number }[])[0]?.count || 0 : 0,
      unreadCount: Array.isArray(unreadMessages) ? (unreadMessages as unknown as { count: number }[])[0]?.count || 0 : 0,
      serviceCount: Array.isArray(services) ? (services as unknown as { count: number }[])[0]?.count || 0 : 0,
    };
  } catch {
    return { blogCount: 0, galleryCount: 0, unreadCount: 0, serviceCount: 0 };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Artikel Blog", value: stats.blogCount, color: "bg-blue-50 text-blue-700" },
    { label: "Foto Galeri", value: stats.galleryCount, color: "bg-green-50 text-green-700" },
    { label: "Pesan Belum Dibaca", value: stats.unreadCount, color: "bg-yellow-50 text-yellow-700" },
    { label: "Layanan", value: stats.serviceCount, color: "bg-purple-50 text-purple-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-700 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Card key={card.label} className="p-6">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.color.split(" ")[1]}`}>
              {card.value}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
