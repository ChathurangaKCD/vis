import { Box, CSSReset, theme, ThemeProvider } from "@chakra-ui/core";
import { StoreProvider } from "easy-peasy";
import React from "react";
import "./App.css";
import store from "./store";
import { ServicesView } from "./views/services";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <React.StrictMode>
        <StoreProvider store={store}>
          <Box m={4}>
            {/* useTitle */}
            <ServicesView />
          </Box>
        </StoreProvider>
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;
