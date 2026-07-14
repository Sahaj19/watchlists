import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import ThemeProvider from "./components/providers/ThemeProvider";
import AuthProvider from "./components/providers/AuthProvider";
import WatchlistProvider from "./components/providers/WatchlistProvider";
import AppProvider from "./components/providers/AppProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WatchlistProvider>
          <AppProvider />
        </WatchlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);