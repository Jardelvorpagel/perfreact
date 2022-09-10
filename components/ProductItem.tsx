interface ProductItemProps {
  product: {
    id: string;
    price: number;
    title: string;
  };
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} = <strong>{product.price}</strong>
    </div>
  );
}
