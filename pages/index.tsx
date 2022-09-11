import type { NextPage } from "next";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product: any) => ({
      ...product,
      priceFormatted: formatter.format(product.price),
    }));

    const totalPrice: number = data.reduce(
      (total: number, product: { price: number }) => total + product.price,
      0
    );

    setResult({ data: products, totalPrice });
  }

  const addToWishList = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        addToWishList={addToWishList}
        results={result.data}
        totalPrice={result.totalPrice}
      />
    </div>
  );
};

export default Home;
