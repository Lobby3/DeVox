import { extendTheme } from "@chakra-ui/react";
import "@fontsource/antonio/100.css";
import "@fontsource/antonio/200.css";
import "@fontsource/antonio/300.css";
import "@fontsource/antonio/400.css";
import "@fontsource/antonio/500.css";
import "@fontsource/antonio/600.css";

export const theme = extendTheme({
  fonts: {
    heading: "'Antonio', sans-serif",
  },
});
