import { alpha, lighten } from "@theme-ui/color";

const theme = {
  sizes: {
    container: 1200,
    videoL: 1024,
    videoM: 720,
    videoS: 640,
  },
  // colors: {
  //   text: "#05a696",
  //   body: "#94d1cb",
  //   heading: "#dc3856",
  //   background: "#020426",
  //   primary: "#05a696",
  //   secondary: "#dc3856",
  //   muted: "#94d1cb",
  //   darkest: "#020426",
  //   lightest: "#ffffff"
  // },
  colors: {
    text: "#94d1cb",
    body: "#94d1cb",
    heading: "#05a696",
    background: "#121212",
    primary: "#05a696",
    secondary: "#F29E1F", 
    third:"#A6110D",
    muted: "#94d1cb",
    darkest: "#121212",
    lightest: "#ddd"
  },
  fonts: {
    body: '"Helvetica Neue", sans-serif',
    heading: '"Source Code Pro", sans-serif',
    button: '"Helvetica Neue",sans-serif',
    nav: '"Helvetica Neue",sans-serif',
    monospace: "monospace",
    barcode:'"Libre Barcode 39 Text", sans-serif',

  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  radii: {
    small: 2,
    default: 16,
    pill: 9999,
  },
  borderWidths: [0,1, 2, 3,4],
  fontSizes: [14, 16, 18, 20, 24,28,32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 300,
    a: 600,
    bold: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1,
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
      textTransform:"uppercase",
      fontSize: [6, 7, 8],
      p: 0,
      pb: "0.66rem",
    },
    title: {
      variant: "text.heading",
      fontSize: [7, 8],
    },
    subheading: {
      variant: "text.body",
      color: "muted",
      fontSize: [4, 5, 6],
      //m:"5rem",
      pb:"0.25rem"
    },
    brackets:{
      "&:before": {
        content: '"< "',
      },
      "&:after": {
        content: '" />"',
      },
    },
    barcodes: {
      variant: "text.heading",
      fontFamily: "barcode",
      textTransform:"uppercase",
      mb:0,
    },
  },
  buttons: {
    nav: {
      backgroundColor: "transparent",
      color: "muted",
      display: "inline-block",
      textDecoration: "none",
      fontFamily: "nav",
      textTransform: "uppercase",
      letterSpacing: [1],
      "&:hover": {
        color: "secondary",
      },
    },
    outlineBtn: {
      fontSize: [1, 2],
      textDecoration: "none",
      backgroundColor: "transparent",
      border: "solid currentColor",
      borderWidth: [2],
      borderRadius: "0",
      borderTopRightRadius: "default",
      borderBottomLeftRadius: "default",
      color: "primary",
      fontFamily: "button",
      letterSpacing: [1],
      px: 3,
      py: 2,
      textTransform: "uppercase",
      transition: "0.33s",
      fontWeight: "normal",
      ":hover": {
        color: lighten("secondary", 0.05),
        borderRadius: "default",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "0",
      },
    },
    semiOutlineBtn: {
      variant: "buttons.outlineBtn",
      color: "background",
      backgroundColor: "secondary",
      borderColor: "secondary",
      fontWeight: "normal",
      ":hover": {
        color: lighten("secondary", 0.05),
        backgroundColor: "background",
        borderRadius: "default",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "0",
      },
    },
    socialBtn: {
      variant: "buttons.outlineBtn",
      px: 2,
      py: 2,
      lineHeight: 1,
      mr: 2,
    },
  },
  forms: {
    label: {
      fontSize: 2,
      fontWeight: "bold",
      pb: 1,
      color:"muted",
    },
    labelRequired: {
      variant: "forms.label",
      "&:after": {
        content: '"*"',
        color: "secondary",
      },
    },
    input: {
      borderColor: "primary",
      borderStyle: "dashed",
      borderWidth:[1],
      borderRadius: 0,
      marginBottom: 3,
      fontFamily: "body",
      "&:focus": {
        borderColor: "secondary",
        outline: "none",
      },
    },
    select: {
      borderColor: "secondary",
      borderStyle: "dashed",
      borderWidth: [1],
      borderRadius: 0,
      "&:focus": {
        borderColor: "primary",
        outline: "none",
      },
    },
    textarea: {
      variant: "forms.input",
      resize:"none",
    },
  },
  styles: {
    root: {
      color: "body",
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      textTransform:"uppercase",
      fontSize: [6, 7],
    },
    h2: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [5, 6],
    },
    h3: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [4, 5],
    },

    h4: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [3, 4],
    },
    h5: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [2, 3],
    },
    h6: {
      color: "heading",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [1, 2],
    },
    p: {
      color: "body",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      maxWidth: ["40ch","50ch","70ch"],
    },
    a: {
      color: "primary",
      textDecoration: "none",
      fontWeight: "a",
      ":hover": {
        textDecoration: "underline",
        color: "secondary",
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
    ol: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    ul: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    li: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
};

export default theme;
