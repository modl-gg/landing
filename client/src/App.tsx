import { lazy, Suspense, type ReactNode } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import SeoHead from "@/components/SeoHead";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { ThemeProvider } from "next-themes";
import { seoRoutes } from "@/lib/seo";

const Registration = lazy(() => import("@/pages/Registration"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const DataProcessingAddendum = lazy(
  () => import("@/pages/DataProcessingAddendum"),
);

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
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
