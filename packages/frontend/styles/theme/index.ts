import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import "@fontsource/antonio/100.css";
import "@fontsource/antonio/200.css";
import "@fontsource/antonio/300.css";
import "@fontsource/antonio/400.css";
import "@fontsource/antonio/500.css";
import "@fontsource/antonio/600.css";
import "@fontsource/pt-serif/400.css";
import "@fontsource/pt-serif/700.css";

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "0",
  },
  variants: {
    outline: {
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "1px",
    },
  },
});

const Tag = defineStyleConfig({
  baseStyle: {},
  defaultProps: {
    size: "lg",
  },
  variants: {
    subtle: {
      borderRadius: "none",
    },
  },
});

export const theme = extendTheme({
  fonts: {
    heading: "'Antonio', sans-serif",
    body: `'PT Serif', sans-serif`,
  },
  textStyles: {},
  colors: {
    devoxSuccess: {
      200: "#D9F9E6",
      600: "#53B483",
      800: "#2F7657",
    },
  },
  components: {
    Button,
    Tag,
  },
});
