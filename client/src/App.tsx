import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import IslamicFinance from "./pages/services/IslamicFinance";
import RiskCompliance from "./pages/services/RiskCompliance";
import CoreBanking from "./pages/services/CoreBanking";
import Microfinance from "./pages/services/Microfinance";
import CapacityBuilding from "./pages/services/CapacityBuilding";
import Branding from "./pages/services/Branding";
import Observatory from "./pages/Observatory";
import Insights from "./pages/Insights";
import ArticleDetail from "./pages/insights/ArticleDetail";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookieNotice from "./pages/legal/CookieNotice";
import HowWeWork from "./pages/HowWeWork";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      
      {/* Services */}
      <Route path="/services" component={Services} />
      <Route path="/how-we-work" component={HowWeWork} />
      <Route path="/resources" component={Resources} />
      <Route path="/faq" component={FAQ} />
      <Route path="/services/islamic-finance" component={IslamicFinance} />
      <Route path="/services/risk-compliance" component={RiskCompliance} />
      <Route path="/services/core-banking" component={CoreBanking} />
      <Route path="/services/microfinance" component={Microfinance} />
      <Route path="/services/capacity-building" component={CapacityBuilding} />
      <Route path="/services/branding" component={Branding} />
      
      {/* Observatory */}
      <Route path="/observatory" component={Observatory} />
      
      {/* Insights */}
      <Route path="/insights" component={Insights} />
      <Route path="/insights/articles/:id" component={ArticleDetail} />
      <Route path="/insights/publications" component={Insights} />
      <Route path="/insights/news" component={Insights} />
      
      {/* Contact */}
      <Route path="/contact" component={Contact} />
      
      {/* Legal */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-notice" component={CookieNotice} />
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
