import { SuitePage } from './pages/SuitePage';
import { FlashcardsPage } from './pages/FlashcardsPage';

export function App() {
  const path = decodeURIComponent(window.location.pathname);

  if (path.endsWith('/速记卡片.html')) {
    return <FlashcardsPage />;
  }

  return <SuitePage />;
}
