import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ColorModeProvider from "./providers/ColorModeProvider";
import LanguageProvider from "./providers/LanguageProvider";
import NotificationsProvider from "./providers/NotificationsProvider";
import MuiThemeProvider from "./providers/ThemeModeProvider";
import { ServicesProvider } from "./providers/ServicesProvider";
import { log } from "./service/console.service";
import { AppThemeProvider } from "./providers/AppThemeProvider";

// All application has access to the same query client to share data
const queryClient = new QueryClient({
  defaultOptions: {
    // All queries will be refetched every 5 minutes
    //queries: { staleTime: 1000 * 60 * 5 },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  log("Providers connected");

  return (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider>
        <AppThemeProvider>
          <ColorModeProvider>
            <LanguageProvider>
              <MuiThemeProvider>
                <NotificationsProvider>{children}</NotificationsProvider>
              </MuiThemeProvider>
            </LanguageProvider>
          </ColorModeProvider>
        </AppThemeProvider>
      </ServicesProvider>
    </QueryClientProvider>
  );
};
