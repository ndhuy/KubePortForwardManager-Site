import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Guide from './pages/Guide';
import Faq from './pages/Faq';
import Support from './pages/Support';
import Privacy from './pages/Privacy';
import Changelog from './pages/Changelog';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features/" element={<Features />} />
        <Route path="/guide/" element={<Guide />} />
        <Route path="/faq/" element={<Faq />} />
        <Route path="/support/" element={<Support />} />
        <Route path="/privacy/" element={<Privacy />} />
        <Route path="/changelog/" element={<Changelog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
