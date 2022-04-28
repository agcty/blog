import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as fs from "fs";
import path from "path";

export const loader: LoaderFunction = async () => {
  const files = fs.readdirSync("app/routes/blog");

  console.log({ files });

  const post = await import(`./blog/test.mdx`);
  console.log(post.filename);

  const data = await Promise.all(
    files.map((file) => {
      console.log("handling", file);
      return import(`../blog/${file}`);
    })
  );
  console.log(data);

  console.log(path.basename(path.resolve()));

  return json(files);
};

function postFromModule(mod) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
  };
}

export default function Products() {
  const products = useLoaderData();

  return (
    <div>
      <h1>Products</h1>
      {JSON.stringify(products)}
    </div>
  );
}
