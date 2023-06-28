import Homepage from './homepage/Homepage.page';
import LandingPage from './landing/LandingPage.page';

export default function Home() {
  const LANDING_PAGE = true;

  if (LANDING_PAGE) {
    return <LandingPage />;
  }

  return <Homepage />;
}
