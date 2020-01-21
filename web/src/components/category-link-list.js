import React from "react";
import { Link } from "gatsby";
import Styles from "./category-link-list.module.css";
import { cn } from "../lib/helpers";
function CategoryLinkList({ categories, currentCategory, all }) {
  if (!categories) return null;

  if (all) {
    categories.push({ title: "All", slug: { current: "" }, id: "all" });
  }

  const currentCat = currentCategory ? currentCategory.title : "";
  let list = categories.map(cat => {
    const isCurrent = currentCat === cat.title;
    return (
      <li key={cat.id}>
        <Link
          className={cn(Styles.defaultBtn, isCurrent && Styles.currentBtn)}
          to={`/archive/${cat.slug.current}`}
        >
          {cat.title}
        </Link>
      </li>
    );
  });
  return (
    <div className={Styles.categoryList}>
      <ul>{list}</ul>
    </div>
  );
}

export default CategoryLinkList;
