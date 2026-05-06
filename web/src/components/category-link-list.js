import React from "react";
import ThemedLink from "./ThemedLink";
import { Box } from "theme-ui";

function CategoryLinkList({ categories, currentCategory, all, used }) {
  if (!categories) return null;

  if (used) {
    const { group } = used;
    const usedCategoryTitles = group.map(function (cat) {
      return cat["fieldValue"];
    });

    categories = categories.filter(function (cat) {
      return usedCategoryTitles.includes(cat.title);
    });
  }

  if (all) {
    categories.unshift({ title: "All", slug: { current: "" }, id: "all" });
  }

  const currentCat = currentCategory ? currentCategory.title : "";
  let list = categories.map((cat) => {
    const isCurrent = currentCat === cat.title;
    const path = `/projects${cat.title === "All" ? "" : "/category"}/${cat.slug.current}`;
    return (
      <Box as="li" sx={{ display: "inline-block", pr: "2", lineHeight: [3] }} key={cat.id}>
        <ThemedLink to={path} variant="outlineBtn" activeClassName="active">
          {cat.title}
        </ThemedLink>
      </Box>
    );
  });
  return (
    <Box pb={[4]}>
      <Box
        as="ul"
        sx={{
          listStyle: "none",
          margin: 0,
          p: 0,
        }}
      >
        {list}
      </Box>
    </Box>
  );
}

export default CategoryLinkList;
