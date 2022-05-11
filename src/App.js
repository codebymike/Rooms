import Providers from './providers/Providers.comp';
import Router from './components/Routes.comp';
import Navbar from './components/Navbar'
import { ROUTES } from './config/routes.config';

export default function App() {
  return (
    <Providers>
      <Navbar />
      <Router routes={ROUTES} />
    </Providers>
  )
}