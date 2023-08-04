export type Category = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type Product<IncludeCategory extends boolean = false> = {
  id: number;
  title: string;
  price: number;
  description: string | null;
  category_id: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  category: IncludeCategory extends true ? Category : undefined;
};

export type Action = "create" | "delete" | "update" | null;
