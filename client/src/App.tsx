import type { ReactNode } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@modl-gg/shared-web/components/ui/toaster";
import { TooltipProvider } from "@modl-gg/shared-web/components/ui/tooltip";
import SeoHead from "@/components/SeoHead";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Registration from "@/pages/Registration";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import DataProcessingAddendum from "@/pages/DataProcessingAddendum";
import { ThemeProvider } from "next-themes";
import { seoRoutes } from "@/lib/seo";

function WithSeo({
  route,
  children,
}: {
  route: (typeof seoRoutes)[keyof typeof seoRoutes];
  children: ReactNode;
}) {
  return (
    <>
      <SeoHead route={route} />
      {children}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <WithSeo route={seoRoutes.home}>
          <Home />
        </WithSeo>
      </Route>
      <Route path="/register">
        <WithSeo route={seoRoutes.register}>
          <Registration />
        </WithSeo>
      </Route>
      <Route path="/terms">
        <WithSeo route={seoRoutes.terms}>
          <TermsOfService />
        </WithSeo>
      </Route>
      <Route path="/privacy">
        <WithSeo route={seoRoutes.privacy}>
          <PrivacyPolicy />
        </WithSeo>
      </Route>
      <Route path="/dpa">
        <WithSeo route={seoRoutes.dpa}>
          <DataProcessingAddendum />
        </WithSeo>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
