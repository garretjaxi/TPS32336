import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminHome from "@/pages/AdminHome";
import AdminDashboard from "@/pages/AdminDashboard";
import PropertyManagement from "@/pages/PropertyManagement";
import DesignServices from "@/pages/DesignServices";
import AdminListings from "@/pages/AdminListings";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/shop/success"} component={OrderConfirmation} />
      {/* Main admin landing page */}
      <Route path={"/admin"} component={AdminHome} />
      {/* Admin sub-sections */}
      <Route path={"/admin/listings"} component={AdminListings} />
      <Route path={"/admin/inventory"} component={() => <AdminDashboard defaultTab="inventory" />} />
      <Route path={"/admin/orders"} component={() => <AdminDashboard defaultTab="orders" />} />
      <Route path={"/admin/analytics"} component={() => <AdminDashboard defaultTab="overview" />} />
      <Route path={"/management"} component={PropertyManagement} />
      <Route path={"/design"} component={DesignServices} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
