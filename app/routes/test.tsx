import data from "../../posts.json";

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      {data.map((post) => post.title)}
    </div>
  );
}
