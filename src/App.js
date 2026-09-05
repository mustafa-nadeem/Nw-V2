import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ImpactPage from "./pages/ImpactPage";
import LearnMorePage from "./pages/LearnMorePage";
import ConnectPage from "./pages/ConnectPage";
import DonatePage from "./pages/DonatePage";
import { setupScrollTriggerResize } from "./utils/setupScrollTriggerResize";

function scrollPageTo(top) {
  const y = Math.max(0, Number(top) || 0);
  const normalizer = ScrollTrigger.normalizeScroll();

  if (normalizer) {
    normalizer.disable();
  }

  const scroller = ScrollTrigger.getAll()[0];
  if (scroller && typeof scroller.scroll === "function") {
    scroller.scroll(y);
  } else {
    window.scrollTo(0, y);
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
  }

  ScrollTrigger.update();

  if (normalizer) {
    window.requestAnimationFrame(() => {
      normalizer.enable();
      ScrollTrigger.update();
    });
  }
}

function App() {
  const location = useLocation();

  useEffect(() => setupScrollTriggerResize(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      scrollPageTo(0);
      return undefined;
    }

    const id = location.hash.replace("#", "");
    let cancelled = false;
    const timers = [];

    const pinnedHashes = {
      learn: { triggerId: "what-is-waqf-stack-pin-trigger", label: "firstCardLocked" },
      impact: { triggerId: "home-scroll-lock-impact", progress: 0 },
      "why-waqf-scroll-title": { triggerId: "why-waqf-stage-pin", progress: 0 },
      "about-works": { triggerId: "about-works-cycle-pin", progress: 0.08 },
      "about-funding": { triggerId: "about-funding-stage-pin", progress: 0.98 },
      "about-principles": { triggerId: "about-scroll-lock-principles", progress: 0 },
      "about-trustees": { triggerId: "about-scroll-lock-trustees", progress: 0 },
      "about-shariah-board": { triggerId: "about-scroll-lock-sharia", progress: 0 },
      "impact-map": { triggerId: "impact-scroll-lock-map", progress: 0 },
      "impact-eligibility": { triggerId: "impact-scroll-lock-eligibility", progress: 0 },
      "impact-funded": { triggerId: "impact-scroll-lock-funded", progress: 0 },
      "impact-areas": { triggerId: "impact-scroll-lock-areas", progress: 0 },
      "impact-causes": { triggerId: "impact-scroll-lock-causes", progress: 0 },
      "learn-role": { triggerId: "learn-scroll-lock-role", progress: 0 },
      "learn-usage": { triggerId: "learn-scroll-lock-usage", progress: 0 },
      "learn-workshop": { triggerId: "learn-scroll-lock-workshop", progress: 0 },
      "learn-policies": { triggerId: "learn-scroll-lock-policies", progress: 0 },
      "learn-reports": { triggerId: "learn-scroll-lock-reports", progress: 0 },
    };

    const schedule = (fn, delay) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timers.push(timer);
    };

    const currentScrollY = () => {
      const scroller = ScrollTrigger.getAll()[0];
      if (scroller && typeof scroller.scroll === "function") {
        return scroller.scroll() || 0;
      }
      return window.scrollY || window.pageYOffset || 0;
    };

    const scrollToPin = (config) => {
      ScrollTrigger.refresh();
      const pin = ScrollTrigger.getById(config.triggerId);
      if (!pin) return false;

      let progress = typeof config.progress === "number" ? config.progress : 0;

      if (config.label && pin.animation) {
        const timeline = pin.animation;
        const labelTime = timeline.labels?.[config.label];
        const duration = timeline.duration?.() || 0;
        if (typeof labelTime === "number" && duration > 0) {
          progress = Math.min(1, Math.max(0, labelTime / duration));
        }
      }

      const top = pin.start + (pin.end - pin.start) * progress;
      scrollPageTo(top);
      return true;
    };

    const scrollToSectionTop = (elementId) => {
      const target = document.getElementById(elementId);
      if (!target) return false;

      ScrollTrigger.refresh();
      const top = target.getBoundingClientRect().top + currentScrollY();
      scrollPageTo(top);
      return true;
    };

    const scrollToHash = (retries = 60) => {
      if (cancelled) return;

      const pinConfig = pinnedHashes[id];

      if (pinConfig) {
        if (scrollToPin(pinConfig)) {
          schedule(() => scrollToPin(pinConfig), 180);
          return;
        }
        if (retries > 0) {
          schedule(() => scrollToHash(retries - 1), 80);
          return;
        }
      }

      if (scrollToSectionTop(id)) {
        schedule(() => scrollToSectionTop(id), 180);
        return;
      }

      if (retries > 0) {
        schedule(() => scrollToHash(retries - 1), 80);
      }
    };

    const startDelay = ScrollTrigger.isTouch === 1 ? 120 : 60;
    schedule(() => scrollToHash(), startDelay);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [location.hash, location.pathname]);

  return (
    <main className="homepage">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
