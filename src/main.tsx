
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PrivyProvider } from '@privy-io/react-auth';
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PrivyProvider
        appId="cmkmajzrh04h1l40chno4vpk3"
        clientId="client-WY6V996UJ7LbRoi8VhrHYBmye1j1UVkcrjVV2gq8dyDap"
        config={{
          embeddedWallets: {
            ethereum: {
              createOnLogin: 'all-users'
            }
          },
          appearance: {
            theme: 'dark',
            accentColor: '#D4A843',
            logo: '/images/Dexora.png',
          }
        }}
      >
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </PrivyProvider>
    </BrowserRouter>
  </StrictMode>
);
