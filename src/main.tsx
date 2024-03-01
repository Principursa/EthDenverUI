import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "./index.css";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "./configs/config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreditVaults from "./routes/CreditVaults";
import Landing from "./routes/Landing";
import LendingMarket from "./routes/LendingMarket";

const router = createBrowserRouter([
      {
        path: "/",
        element: <Landing />,
      },
  {
    path: "/App",
    element: <App />,
    children: [

      {
        path: "vaults",
        element: <CreditVaults />,
      },
      {
        path: "markets",
        element: <LendingMarket />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
