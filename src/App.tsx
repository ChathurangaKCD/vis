import React from "react";
import "./App.css";
import { ServicesView } from "./views/services";
import { ThemeProvider, CSSReset, theme, Box } from "@chakra-ui/core";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <React.StrictMode>
        <Box m={4}>
          {/* useTitle */}
          <ServicesView />
        </Box>
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;
