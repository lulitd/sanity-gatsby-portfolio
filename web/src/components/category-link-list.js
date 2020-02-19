import React from "react";
import { Link } from "gatsby";
import Styles from "./category-link-list.module.css";
import { cn } from "../lib/helpers";
function CategoryLinkList({ categories, currentCategory, all, used, total }) {
  if (!categories) return null;

  if (used) {
    const { group } = used;
    const usedCategoryTitles = group.map(function(cat) {
      return cat["fieldValue"];
    });

    categories = categories.filter(function(cat) {
      return usedCategoryTitles.includes(cat.title);
    });
  }

  if (all) {
    categories.unshift({ title: "All", slug: { current: "" }, id: "all" });
  }

  const currentCat = currentCategory ? currentCategory.title : "";
  let list = categories.map(cat => {
    const isCurrent = currentCat === cat.title;

    let totalCount="";
    if (used){
      const index= used.group.findIndex(x => x.fieldValue === cat.title);
      
      if (index>-1){
        totalCount = `(${used.group[index].totalCount})`; 
      }
    }
    const count = cat.title === "All" ? (total ? `(${total})` : "") : totalCount;
    return (
      <li key={cat.id}>
        <Link
          className={cn(Styles.defaultBtn, isCurrent && Styles.currentBtn)}
          to={`/archive/${cat.slug.current}`}
        >
          {cat.title} {count}
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
