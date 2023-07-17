import { getColor, shade, lightness, lighten, alpha, darken } from "@theme-ui/color";

const theme = {
  sizes: {
    container: 1024,
    videoL: 1024,
    videoM: 720,
    videoS: 640
  },
  colors: {
    primary: "#F29E1F",
    secondary: "#05a6fe",
    third: "#dc3856",
    background: "#1a1a1a",
    btn: "#1f1f1f",
    clickable: "#05a6fe",
    selected: "#dc3856",
    active: "#F29E1F",
    text: lightness("primary", 0.9),
    body: lightness("primary", 0.9),
    heading: "#F29E1F",
    muted: lightness("primary", 0.9),
    darkest: "#020426",
    lightest: "#ddd",
    primary100: lighten("primary", 0.3),
    primary300: lighten("primary", 0.1),
    primary500: "#F29E1F",
    primary700: darken("primary", 0.2),
    primary900: darken("primary", 0.35),
    secondary100: lighten("secondary", 0.3),
    secondary300: lighten("secondary", 0.1),
    secondary500: "#05a6fe",
    secondary700: darken("secondary", 0.2),
    secondary900: darken("secondary", 0.35),
    third100: lighten("third", 0.3),
    third300: lighten("third", 0.1),
    third500: "#dc3856",
    third700: darken("third", 0.2),
    third900: darken("third", 0.35)
  },
  fonts: {
    body: '"Inter","Helvetica Neue", sans-serif',
    heading: '"Inter","Helvetica Neue", sans-serif',
    btn: '"Source Code Pro","Inter","Helvetica Neue",sans-serif',
    nav: '"Source Code Pro","Inter","Helvetica Neue",sans-serif',
    monospace: '"Source Code Pro","monospace"'
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  radii: {
    none: "0",
    small: "0.25rem",
    default: "0.5rem",
    regular: "1rem",
    large: "1.25rem",
    pill: 9999
  },
  borderWidths: [
    "0rem",
    "0.125rem",
    "0.25rem",
    "0.375rem",
    "0.5rem",
    "0.625rem",
    "0.75rem",
    "1rem"
  ],
  fontSizes: [14, 16, 18, 20, 24, 28, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 900,
    a: 600,
    bold: 600,
    nav: 400,
    btn: 400
  },
  lineHeights: {
    body: "1.6rem",
    heading: 1
  },
  text: {
    color: "body",
    fontFamily: "body",
    fontWeight: "body",
    lineHeight: "body",
    heading: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontStyle: "normal",
      textTransform: "uppercase",
      fontSize: [6, 7, 7],
      marginTop: "0.75em",
      marginBottom: "1em",
      textWrap: "balance"
    },
    title: {
      variant: "text.heading",
      fontSize: [5, 6, 7]
    },
    subheading: {
      variant: "text.body",
      color: "muted",
      fontWeight: "body",
      fontSize: [3, 4, 4]
    },
    brackets: {
      variant: "text.subheading",
      "&:before": {
        content: '"< "'
      },
      "&:after": {
        content: '" />"'
      }
    }
  },
  buttons: {
    nav: {
      color: "muted",
      backgroundColor: "transparent",
      display: "inline-block",
      position: "relative",
      px: 2,
      py: 2,
      fontFamily: "nav",
      fontWeight: "nav",
      textTransform: "uppercase",
      textDecoration: "none",
      letterSpacing: [1],
      borderRadius: "none",
      border: "solid 1px currentColor",
      borderWidth: 1,
      borderColor: "transparent",
      transition: "0.25s ease-in",
      "&.active": {
        color: "active",
        borderColor: "currentColor",
        borderRadius: "default"
      },
      "&:hover,&:focus": {
        color: "selected",
        borderColor: "currentColor",
        borderRadius: "default",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "0",
        outline: "none"
      }
    },
    navBorderless: {
      color: "muted",
      backgroundColor: "transparent",
      display: "inline-block",
      position: "relative",
      px: 2,
      py: 2,
      fontFamily: "nav",
      fontWeight: "nav",
      textTransform: "uppercase",
      textDecoration: "none",
      letterSpacing: [1],
      borderRadius: "none",
      border: "solid 1px transparent",
      transition: "0.25s ease-in",
      "&.active": {
        color: "active"
      },
      "&:hover,&:focus": {
        color: "selected"
      }
    },
    outlineBtn: {
      color: "clickable",
      backgroundColor: "btn",
      px: 3,
      py: 2,
      fontSize: [1, 2],
      fontFamily: "btn",
      fontWeight: "btn",
      letterSpacing: [1],
      textDecoration: "none",
      textTransform: "uppercase",
      border: "solid currentColor",
      borderWidth: [1],
      borderRadius: 0,
      transition: "0.2s ease-in",
      "&.active": {
        color: "active",
        background: "btn",
        borderRadius: "default"
      },
      "&:hover,&:focus": {
        color: "selected",
        background: "btn",
        borderRadius: "default",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "0",
        outline: "none"
      }
    },
    fillBtn: {
      variant: "buttons.outlineBtn",
      color: "btn",
      backgroundColor: "clickable",
      borderColor: "clickable",
      "&.active": {
        color: "btn",
        background: "active",
        borderColor: "active",
        borderRadius: "default"
      },
      "&:hover,&:focus": {
        color: "btn",
        backgroundColor: "selected",
        borderColor: "selected",
        borderRadius: "default",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "0",
        outline: "none"
      }
    },
    socialBtn: {
      variant: "buttons.outlineBtn",
      px: 2,
      py: 2,
      lineHeight: 1,
      mr: 2
    }
  },
  cards: {
    primary: {
      padding: 4,
      border: "1px solid",
      borderColor: "primary300",
      boxShadow: "2px 10px 25px #F29E1F30"
    },
    compact: {
      padding: 1,
      border: "1px solid",
      borderColor: "primary300",
      boxShadow: "1px 5px 12px #F29E1F20"
    }
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999
    },
    duotone: {
      filter: "url(/duo-tone.svg#duotone_peachypink)"
    }
  },
  forms: {
    label: {
      fontSize: 2,
      fontWeight: "bold",
      pb: 1,
      color: "muted"
    },
    labelRequired: {
      variant: "forms.label",
      "&:after": {
        content: '"*"',
        color: "secondary"
      }
    },
    input: {
      borderColor: "secondary",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 0,
      marginBottom: 3,
      fontFamily: "body",
      "&:hover,&:focus": {
        borderColor: "primary",
        outline: "none"
      }
    },
    select: {
      borderColor: "secondary",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 0,
      "&:hover,&:focus": {
        borderColor: "primary",
        outline: "none"
      }
    },
    textarea: {
      variant: "forms.input",
      resize: "none"
    }
  },
  styles: {
    root: {
      color: "body",
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body"
    },
    h1: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      textTransform: "uppercase",
      fontSize: [6, 7]
    },
    h2: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [5, 6]
    },
    h3: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [9]
    },

    h4: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [3, 4]
    },
    h5: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [2, 3]
    },
    h6: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [1, 2]
    },
    p: {
      color: "body",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    },
    a: {
      color: "primary",
      textDecoration: "none",
      fontWeight: "a",
      ":hover,:focus": {
        textDecoration: "underline",
        color: "selected",
        outline: "none"
      }
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit"
      }
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit"
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    img: {
      maxWidth: "100%"
    },
    ol: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    },
    ul: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    },
    li: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    }
  }
};

export default theme;
