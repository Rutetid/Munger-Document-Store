import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RequestPage from "./pages/RequestPage";
import DashboardPage from "./pages/DashboardPage";
import TrackingPage from "./pages/TrackingPage";
import PublicTrackingPage from "./pages/PublicTrackingPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/request" element={<RequestPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tracking" element={<PublicTrackingPage />} />
              <Route path="/track/:requestId" element={<TrackingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
