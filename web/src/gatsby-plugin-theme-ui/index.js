import { alpha,lighten} from "@theme-ui/color"
const theme = {
  sizes: {
    container: 1200,
  },
  colors: {
    text: '#05a696',
    body: '#94d1cb',
    heading: '#f02348',
    background: '#020426',
    primary: '#05a696',
    secondary: '#f02348',
    muted: '#94d1cb',
    darkest: '#020426',
    lightest: '#ffffff',
  },
  fonts: {
    body: 'Inter,"Helvetica Neue", sans-serif',
    heading: 'Inter, sans-serif',
    nav: '"Space Mono",sans-serif',
    monospace: 'Space Mono, monospace'
  },
  space: [
    0,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
    1024,
    2048
  ],
  radii: {
    small: 2,
    default: 16,
    pill: 9999
  },
  borderWidths:[
    0,
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128
  ],
  fontSizes: [
    12,
    14,
    16,
    18,
    20,
    24,
    32,
    48,
    64,
    96
  ],
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  text: {
    color: 'body',
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    heading: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [5, 6, 7],
      p:0,
      pb:'0.66rem',
    },
    title: {
      variant: 'text.heading',
      fontSize: [6,7],
      fontWeight:800,
     },
    subheading: {
      color: 'muted',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [3, 4, 5],
      p:0,
      pb: '0.66rem',
    }
  },
  buttons: {
    nav: {
      backgroundColor: 'transparent',
      color: 'inherit',
      display: 'inline-block',
      textDecoration: 'none',
      fontFamily: 'nav',
      textTransform: 'uppercase',
      letterSpacing: [1],
      '&:hover': {
        color: 'secondary',
      }
    },
    outlineBtn: {
      textDecoration: 'none',
      backgroundColor: 'transparent',
      border: 'solid currentColor',
      borderWidth: '2',
      borderBottomWidth: '3',
      borderTopWidth: '3',
      borderRadius: '0',
      borderTopRightRadius: 'default',
      borderBottomLeftRadius: 'default',
      color: 'text',
      fontFamily: 'nav',
      letterSpacing: [1],
      px: 3,
      py: 2,
      textTransform: 'uppercase',
      transition: '0.33s',
      ":hover": {
        color: lighten('secondary',0.05),
        borderRadius: 'default',
        borderTopRightRadius: '0',
        borderBottomLeftRadius: '0',
      }
    },
    semiOutlineBtn: {
      variant: 'buttons.outlineBtn',
      color: 'background',
      backgroundColor:'secondary',
      borderColor:'secondary',
      ":hover": {
        color: lighten('secondary',0.05),
        backgroundColor:'background',
        borderRadius: 'default',
        borderTopRightRadius: '0',
        borderBottomLeftRadius: '0',
      }
    },
    socialBtn: {
      variant: 'buttons.outlineBtn',
      px: 2,
      py: 2,
      lineHeight: 1,
      mr:2,      
    }
  },
  forms: {
    label: {
      fontSize: 2,
      fontWeight: 'bold',
      pb: 1,
    },
    labelRequired: {
      variant: 'forms.label',
      '&:after': {
        content: '"*"',
        color: 'secondary',
      }
    },
    input: {
      borderColor: 'secondary',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderRadius: 0,
      marginBottom: 3,
      fontFamily: 'body',
      '&:focus': {
        borderColor: 'primary',
        outline: 'none',
      },
    },
    select: {
      borderColor: 'secondary',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderRadius: 0,
      '&:focus': {
        borderColor: 'primary',
        outline: 'none',
      },
    },
    textarea: {
      variant: 'forms.input'
    },
  },
  styles: {
    root: {
      color: 'body',
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 7
    },
    h2: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 6
    },
    h3: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5
    },
    h4: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4
    },
    h5: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3
    },
    h6: {
      color: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2
    },
    p: {
      color: 'body',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'secondary',
      textDecoration: 'none',
      ":hover": {
        textDecoration: "underline",
      }
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    },
    ol: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    ul: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    li: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }
};

export default theme;