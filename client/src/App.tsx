import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Suspense, lazy, useEffect } from "react";
import { addResourceHints } from "./utils/performance";

// Critical pages - loaded immediately
import Home from "./pages/Home";

// Lazy loaded pages for code splitting
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const IslamicFinance = lazy(() => import("./pages/services/IslamicFinance"));
const RiskCompliance = lazy(() => import("./pages/services/RiskCompliance"));
const CoreBanking = lazy(() => import("./pages/services/CoreBanking"));
const Microfinance = lazy(() => import("./pages/services/Microfinance"));
const CapacityBuilding = lazy(() => import("./pages/services/CapacityBuilding"));
const Branding = lazy(() => import("./pages/services/Branding"));
const Observatory = lazy(() => import("./pages/Observatory"));
const Insights = lazy(() => import("./pages/Insights"));
const ArticleDetail = lazy(() => import("./pages/insights/ArticleDetail"));
const GovernanceFragileMarkets = lazy(() => import("./pages/insights/GovernanceFragileMarkets"));
const IslamicFinanceEngineering = lazy(() => import("./pages/insights/IslamicFinanceEngineering"));
const AMLDevelopmentFinance = lazy(() => import("./pages/insights/AMLDevelopmentFinance"));
const TreasuryGovernance = lazy(() => import("./pages/insights/TreasuryGovernance"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const Privacy = lazy(() => import("./pages/Privacy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const CookieNotice = lazy(() => import("./pages/legal/CookieNotice"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
const Resources = lazy(() => import("./pages/Resources"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Careers = lazy(() => import("./pages/Careers"));
const Terms = lazy(() => import("./pages/Terms"));
const IslamicFinanceCalculator = lazy(() => import("./pages/IslamicFinanceCalculator"));
const Learning = lazy(() => import("./pages/Learning"));
const Academy = lazy(() => import("./pages/Academy"));
const Glossary = lazy(() => import("./pages/Glossary"));
const RegulatoryCalendar = lazy(() => import("./pages/RegulatoryCalendar"));

// Components loaded immediately (critical for UX)
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import BookingSystem, { useBookingSystem } from "./components/BookingSystem";
import { TrainingRegistrationProvider } from "./components/TrainingRegistration";
import { createContext, useContext, ReactNode } from "react";

// Create booking context for global access
interface BookingContextType {
  isOpen: boolean;
  preselectedType: string | undefined;
  openBooking: (type?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

const BookingProvider = ({ children }: { children: ReactNode }) => {
  const bookingState = useBookingSystem();
  return (
    <BookingContext.Provider value={bookingState}>
      {children}
      <BookingSystem 
        isOpen={bookingState.isOpen} 
        onClose={bookingState.closeBooking}
        preselectedType={bookingState.preselectedType}
      />
    </BookingContext.Provider>
  );
};

// Premium loading spinner matching CauseWay brand
const PageLoader = () => (
  <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      {/* CauseWay branded loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#133129]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-[#d4a84b] rounded-full animate-spin" />
        <div className="absolute inset-2 border-4 border-transparent border-t-[#133129] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#133129] font-medium tracking-wide">CauseWay</span>
        <span className="text-[#d4a84b]">|</span>
        <span className="text-[#133129]/60 text-sm">Loading...</span>
      </div>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/insights/:slug" component={ArticleDetail} />
        <Route path="/insights/governance-fragile-markets" component={GovernanceFragileMarkets} />
        <Route path="/insights/islamic-finance-engineering" component={IslamicFinanceEngineering} />
        <Route path="/insights/aml-development-finance" component={AMLDevelopmentFinance} />
        <Route path="/insights/treasury-governance" component={TreasuryGovernance} />
        
        {/* Tools */}
        <Route path="/tools/islamic-finance-calculator" component={IslamicFinanceCalculator} />
        <Route path="/glossary" component={Glossary} />
        <Route path="/regulatory-calendar" component={RegulatoryCalendar} />
        
        {/* Contact & Careers */}
        <Route path="/contact" component={Contact} />
        <Route path="/careers" component={Careers} />
        
        {/* Legal */}
        <Route path="/privacy" component={Privacy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/cookie-notice" component={CookieNotice} />
        
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Add resource hints on mount for performance
  useEffect(() => {
    addResourceHints();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <TrainingRegistrationProvider>
              <BookingProvider>
                <Router />
                <CookieConsent />
                <WhatsAppButton />
                <PWAInstallPrompt />
              </BookingProvider>
            </TrainingRegistrationProvider>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
