interface ProductGalleryProps {
  slug: string;
}

export function ProductGallery({ slug: _slug }: ProductGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="aspect-square bg-zinc-100 rounded-lg" />
      <div>
        <h1 className="text-2xl font-semibold">Tên sản phẩm</h1>
        <p className="mt-2 text-xl font-medium">299.000₫</p>
      </div>
    </div>
  );
}
