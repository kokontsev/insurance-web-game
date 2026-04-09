import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import StoryPage from "./pages/StoryPage";
import ResultPage from "./pages/ResultPage";
import MemoPage from "./pages/MemoPage";
import FinalPage from "./pages/FinalPage";
import NotFoundPage from "./pages/NotFoundPage";
import OhNoPage from "./pages/OhNoPage";
import OutcomePage from "./pages/OutcomePage";
import CertificatePage from "./pages/SertificatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/story/:id/result" element={<ResultPage />} />
        <Route path="/story/:id/memo" element={<MemoPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/story/:id/ohno" element={<OhNoPage />} />
        <Route path="/story/:id/outcome" element={<OutcomePage />} />
        <Route path="/certificate" element={<CertificatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;