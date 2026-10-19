import React from "react";
import ThemedLink from "./atoms/ThemedLink";
import { Box } from "theme-ui";

function CategoryLinkList({ categories, currentCategory, all, used }) {
  if (!categories) return null;

  let visibleCategories = [...categories];

  if (used) {
    const usedCategoryTitles = used.group.map((cat) => cat.fieldValue);

    visibleCategories = visibleCategories.filter((cat) => usedCategoryTitles.includes(cat.title));
  }

  if (all) {
    visibleCategories.unshift({
      title: "All",
      slug: { current: "" },
      id: "all",
    });
  }

  const currentCat = currentCategory?.title || "All";

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
        {visibleCategories.map((cat) => {
          const isCurrent = currentCat === cat.title;

          const path =
            cat.title === "All"
              ? "/projects/"
              : `/projects/?category=${encodeURIComponent(cat.slug.current)}`;

          return (
            <Box
              as="li"
              key={cat.id}
              sx={{
                display: "inline-block",
                pr: 2,
                lineHeight: 3,
              }}
            >
              <ThemedLink
                to={path}
                variant="outlineBtn"
                className={isCurrent ? "active" : ""}
                aria-current={isCurrent ? "page" : undefined}
              >
                {cat.title}
              </ThemedLink>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default CategoryLinkList;
