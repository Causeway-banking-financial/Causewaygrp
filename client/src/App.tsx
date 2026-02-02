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
import GovernanceFragileMarkets from "./pages/insights/GovernanceFragileMarkets";
import IslamicFinanceEngineering from "./pages/insights/IslamicFinanceEngineering";
import AMLDevelopmentFinance from "./pages/insights/AMLDevelopmentFinance";
import TreasuryGovernance from "./pages/insights/TreasuryGovernance";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookieNotice from "./pages/legal/CookieNotice";
import HowWeWork from "./pages/HowWeWork";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import IslamicFinanceCalculator from "./pages/IslamicFinanceCalculator";
import Learning from "./pages/Learning";
import Academy from "./pages/Academy";
import Glossary from "./pages/Glossary";
import RegulatoryCalendar from "./pages/RegulatoryCalendar";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import BookingSystem, { useBookingSystem } from "./components/BookingSystem";
import { TrainingRegistrationProvider } from "./components/TrainingRegistration";

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
      <Route path="/learning" component={Learning} />
      <Route path="/academy" component={Academy} />
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
      <Route path="/insights/governance-fragile-markets" component={GovernanceFragileMarkets} />
      <Route path="/insights/islamic-finance-engineering" component={IslamicFinanceEngineering} />
      <Route path="/insights/aml-development-finance" component={AMLDevelopmentFinance} />
      <Route path="/insights/treasury-governance" component={TreasuryGovernance} />
      <Route path="/insights/publications" component={Insights} />
      <Route path="/insights/news" component={Insights} />
      
      {/* Contact */}
      <Route path="/contact" component={Contact} />
      
      {/* Careers */}
      <Route path="/careers" component={Careers} />
      
      {/* Tools */}
      <Route path="/tools/islamic-finance-calculator" component={IslamicFinanceCalculator} />
      <Route path="/glossary" component={Glossary} />
      <Route path="/regulatory-calendar" component={RegulatoryCalendar} />
      
      {/* Legal */}
      <Route path="/privacy" component={Privacy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-notice" component={CookieNotice} />
      <Route path="/terms" component={Terms} />
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Create a context for booking system
import { createContext, useContext } from 'react';

interface BookingContextType {
  openBooking: (type?: string) => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}

function App() {
  const booking = useBookingSystem();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <BookingContext.Provider value={{ openBooking: booking.openBooking }}>
            <TrainingRegistrationProvider>
            <TooltipProvider>
              <Toaster />
              <CookieConsent />
              <WhatsAppButton />
              <BookingSystem 
                isOpen={booking.isOpen} 
                onClose={booking.closeBooking} 
                preselectedType={booking.preselectedType}
              />
              <Router />
            </TooltipProvider>
            </TrainingRegistrationProvider>
          </BookingContext.Provider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
