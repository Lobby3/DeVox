import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import "@fontsource/antonio/100.css";
import "@fontsource/antonio/200.css";
import "@fontsource/antonio/300.css";
import "@fontsource/antonio/400.css";
import "@fontsource/antonio/500.css";
import "@fontsource/antonio/600.css";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import { lavender } from "../colors";

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "0",
    fontFamily: "Inter",
  },
  variants: {
    outline: {
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "1px",
      backgroundColor: "white",
    },
    solid: {
      color: "black",
      backgroundColor: lavender,
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
  textStyles: {
    inter: {
      fontFamily: "'Inter', sans-serif",
    },
  },
  colors: {
    devoxSuccess: {
      50: "#F6FEF9",
      100: "#EFFDF6",
      200: "#D9F9E6",
      300: "#B8F1D2",
      400: "#8EE4BA",
      500: "#6AD09D",
      600: "#53B483",
      700: "#2F9461",
      800: "#2F7657",
      900: "#255E46",
      1000: "#1E4D3A",
    },
  },
  components: {
    Button,
    Tag,
  },
});
