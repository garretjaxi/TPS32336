import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import AdminListings from "./pages/AdminListings";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import PropertyManagement from "./pages/PropertyManagement";
import DesignServices from "./pages/DesignServices";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import ThemeParkTickets from "./pages/Explore";
import Community from "./pages/Community";
import PropertyView from "./pages/PropertyView";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import { AdminGuard } from "./components/AdminGuard";
import LoadingDisplay from "./components/LoadingDisplay";
import { useEffect, useState } from "react";

function AppRouter() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={() => <AdminGuard><AdminHome /></AdminGuard>} />
      <Route path={"/admin/listings"} component={() => <AdminGuard><AdminListings /></AdminGuard>} />
      <Route path={"/admin/users"} component={() => <AdminGuard><AdminUsers /></AdminGuard>} />
      <Route path={"/admin/orders"} component={() => <AdminGuard><AdminDashboard defaultTab="orders" /></AdminGuard>} />
      <Route path={"/admin/analytics"} component={() => <AdminGuard><AdminDashboard defaultTab="overview" /></AdminGuard>} />
      <Route path={"/admin/inventory"} component={() => <AdminGuard><AdminDashboard defaultTab="inventory" /></AdminGuard>} />
      <Route path={"/admin/inquiries"} component={() => <AdminGuard><AdminDashboard defaultTab="inquiries" /></AdminGuard>} />
      <Route path={"/property-management"} component={PropertyManagement} />
      <Route path={"/design-services"} component={DesignServices} />
      <Route path={"/order-confirmation"} component={OrderConfirmation} />
      <Route path={"/about"} component={About} />
      <Route path="/theme-park-tickets" component={ThemeParkTickets} />
      <Route path="/explore" component={ThemeParkTickets} /> {/* Redirect for backwards compatibility */}
      <Route path={"/community"} component={Community} />
      <Route path={"/property-view"} component={PropertyView} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />      <Route path={"/terms-of-service"} component={TermsOfService} />
      <Route path={"/contact-us"} component={ContactUs} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after a short delay to allow page to render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="light"
        >
          <TooltipProvider>
            <Toaster />
            {isLoading && <LoadingDisplay />}
            <AppRouter />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
