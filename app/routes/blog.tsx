import { Outlet } from "@remix-run/react";

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <Outlet />
    </div>
  );
}
