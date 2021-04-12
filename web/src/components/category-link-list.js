import React from "react";
import { Link } from "gatsby";
import ThemedLink from "./ThemedLink";
import { Styled, jsx } from "theme-ui";
import { Box } from "rebass";

//@jsx jsx
function CategoryLinkList({ categories, currentCategory, all, used, total }) {
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

    let totalCount = "";
    if (used) {
      const index = used.group.findIndex((x) => x.fieldValue === cat.title);

      if (index > -1) {
        totalCount = `(${used.group[index].totalCount})`;
      }
    }
    const count = cat.title === "All" ? (total ? `(${total})` : "") : totalCount;
    return (
      <Styled.li sx={{ display: "inline-block", pr: "2", lineHeight:[3] }} key={cat.id}>
        <ThemedLink
          to={`/archive/${cat.slug.current}`}
          variant={isCurrent ? "semiOutlineBtn" : "outlineBtn"}
          cover
          direction="top"
          duration={2}
        >
          {cat.title} {count}
        </ThemedLink>
      </Styled.li>
    );
  });
  return (
    <Box pb={[4]}>
      <Styled.ul
        sx={{
          listStyle: "none",
          margin: 0,
          p: 0,
        }}
      >
        {list}
      </Styled.ul>
    </Box>
  );
}

export default CategoryLinkList;
