import React, { useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import { Box, Flex, Text, Button } from "theme-ui";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function MobileCategoryMenu({ categories = [], currentCategory, used }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const currentTitle = currentCategory?.title || "All";

  // Filter out unused categories
  const usedTitles = used?.group?.map((cat) => cat.fieldValue);

  const visibleCategories = categories.filter(
    (cat) => !usedTitles || usedTitles.includes(cat.title),
  );

  const menuCategories = [{ id: "all", title: "All", slug: { current: "" } }, ...visibleCategories];

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (cat) => {
    setIsOpen(false);

    const path =
      cat.title === "All"
        ? "/projects/"
        : `/projects/?category=${encodeURIComponent(cat.slug.current)}`;

    navigate(path);
  };

  return (
    <Box
      ref={menuRef}
      sx={{
        display: ["block", "none"],
        position: "fixed",
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        right: "1rem",
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-category-options"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 12,
              scale: reduceMotion ? 1 : 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : 8,
              scale: reduceMotion ? 1 : 0.95,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
          >
            <Box
              role="group"
              aria-label="Project categories"
              sx={{
                bg: "background",
                border: "2px solid",
                borderColor: "primary",
                borderRadius: "default",
                borderTopRightRadius: "0",
                borderBottomLeftRadius: "0",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                p: 2,
                mb: 2,
                minWidth: "200px",
                maxHeight: "min(60vh, 420px)",
                overflowY: "auto",
                overscrollBehavior: "contain",
              }}
            >
              <Text
                sx={{
                  display: "block",
                  fontFamily: "nav",
                  color: "primary",
                  fontSize: 1,
                  px: 3,
                  py: 2,
                  textTransform: "uppercase",
                }}
              >
                Filter Projects
              </Text>

              {menuCategories.map((cat) => {
                const isActive = currentTitle === cat.title;
                return (
                  <Button
                    key={cat.id}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => handleSelect(cat)}
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      fontFamily: "nav",
                      fontSize: 2,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      bg: isActive ? "primary" : "transparent",
                      color: isActive ? "background" : "text",
                      borderRadius: "default",
                      borderTopRightRadius: "0",
                      borderBottomLeftRadius: "0",
                      border: "2px solid",
                      borderColor: isActive ? "primary" : "transparent",
                      px: 3,
                      py: 2,
                      mb: "1px",
                      "&:hover": {
                        border: "2px solid",
                        color: "selected",
                        background: "btn",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                      },
                    }}
                  >
                    {isActive ? "❯ " : ""}
                    {cat.title}
                  </Button>
                );
              })}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <Flex sx={{ justifyContent: "flex-end" }}>
        <Button
          type="button"
          aria-expanded={isOpen}
          aria-controls={isOpen ? "mobile-category-options" : undefined}
          aria-label={isOpen ? "Close category menu" : "Filter project categories"}
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            bg: "primary",
            color: "background",
            border: "2px solid",
            borderColor: "primary",
            borderRadius: "default",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "0",
            px: 3,
            py: 3,
            fontFamily: "nav",
            fontSize: 2,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <Text sx={{ fontWeight: "bold" }}>{currentTitle}</Text>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            style={{ display: "inline-flex" }}
            aria-hidden="true"
          >
            ▲
          </motion.span>
        </Button>
      </Flex>
    </Box>
  );
}

export default MobileCategoryMenu;
