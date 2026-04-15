import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "@/Portfolio";
import NotFoundPage from "@/components/ui/page-not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
