import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { requests } = useApp();

  const handleRequestClick = (request) => {
    navigate(`/track/${request.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Dashboard requests={requests} onRequestClick={handleRequestClick} />
    </div>
  );
};

export default DashboardPage;
