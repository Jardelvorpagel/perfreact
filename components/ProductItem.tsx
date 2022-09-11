import { memo, useState } from "react";
import dynamic from "next/dynamic";
import lodash from "lodash";
import { AddProductToWishlistProps } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () =>
    import("./AddProductToWishlist").then((mod) => mod.AddProductToWishlist),
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: string;
    price: number;
    priceFormatted: string;
    title: string;
  };
  addToWishList: (id: string) => void;
}

function ProductItemComponent({ product, addToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} = <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        add to wish list
      </button>
      {isAddingToWishList && (
        <AddProductToWishlist
          onAddToWishlist={() => addToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) =>
  lodash.isEqual(prevProps.product, nextProps.product)
);
