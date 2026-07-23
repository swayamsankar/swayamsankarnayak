import ReactGA from "react-ga4";

ReactGA.initialize("G-KCHQ2YNX95");

export function trackPageView() {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
}