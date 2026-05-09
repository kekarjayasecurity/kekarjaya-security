export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  content: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  category_id: number | null;
  status: "published" | "draft";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category_name?: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface GalleryPhoto {
  id: number;
  title: string | null;
  filename: string;
  category_id: number | null;
  sort_order: number;
  created_at: string;
  category_name?: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: number;
  name: string;
  position: string;
  photo: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
