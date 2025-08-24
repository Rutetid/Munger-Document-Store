import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DocumentRequestForm from "./components/DocumentRequestForm";
import Dashboard from "./components/Dashboard";
import RequestTracker from "./components/RequestTracker";

function AppContent() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    // Sample data for demonstration
    {
      id: "REQ-2025-001",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+91-9876543210",
      documentType: "Birth Certificate",
      purpose: "Passport application",
      urgency: "normal",
      currentStep: 2,
      department: "Civil Registration",
      estimatedTime: "7-10 days",
      fees: 50,
      submittedAt: "2025-08-20",
      expectedCompletion: "2025-08-30",
    },
    {
      id: "REQ-2025-002",
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "+91-9876543211",
      documentType: "Trade License",
      purpose: "Business registration",
      urgency: "urgent",
      currentStep: 4,
      department: "Commerce Department",
      estimatedTime: "3-5 days",
      fees: 200,
      submittedAt: "2025-08-18",
      expectedCompletion: "2025-08-25",
    },
  ]);

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const generateRequestId = () => {
    const year = new Date().getFullYear();
    const count = requests.length + 1;
    return `REQ-${year}-${count.toString().padStart(3, "0")}`;
  };

  const getDepartmentInfo = (documentType) => {
    const departments = {
      "Birth Certificate": {
        name: "Civil Registration",
        time: "7-10 days",
        fees: 50,
      },
      "Death Certificate": {
        name: "Civil Registration",
        time: "5-7 days",
        fees: 50,
      },
      "Marriage Certificate": {
        name: "Civil Registration",
        time: "10-15 days",
        fees: 100,
      },
      "Property Registration": {
        name: "Revenue Department",
        time: "15-20 days",
        fees: 500,
      },
      "Trade License": {
        name: "Commerce Department",
        time: "10-12 days",
        fees: 200,
      },
      "Building Permit": {
        name: "Urban Planning",
        time: "20-25 days",
        fees: 300,
      },
      "Tax Certificate": {
        name: "Revenue Department",
        time: "5-7 days",
        fees: 75,
      },
      "Caste Certificate": {
        name: "Social Welfare",
        time: "7-10 days",
        fees: 30,
      },
      "Income Certificate": {
        name: "Revenue Department",
        time: "7-10 days",
        fees: 30,
      },
      "Domicile Certificate": {
        name: "Revenue Department",
        time: "10-12 days",
        fees: 40,
      },
    };
    return (
      departments[documentType] || {
        name: "General Administration",
        time: "7-10 days",
        fees: 50,
      }
    );
  };

  const handleFormSubmit = (formData) => {
    const deptInfo = getDepartmentInfo(formData.documentType);
    const newRequest = {
      ...formData,
      id: generateRequestId(),
      currentStep: 1,
      department: deptInfo.name,
      estimatedTime: deptInfo.time,
      fees: deptInfo.fees,
      submittedAt: new Date().toISOString().split("T")[0],
      expectedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    setRequests((prev) => [...prev, newRequest]);
    setSelectedRequest(newRequest);
    setCurrentPage("tracker");

    // Simulate automatic progression to step 2 after submission
    setTimeout(() => {
      handleStatusUpdate(newRequest.id, 2);
    }, 2000);
  };

  const handleStatusUpdate = (requestId, newStep) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, currentStep: newStep } : req
      )
    );

    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest((prev) => ({ ...prev, currentStep: newStep }));
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setCurrentPage("tracker");
  };

  const Navbar = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCurrentPage("home")}
            className="text-xl font-bold text-blue-600 cursor-pointer"
          >
            Munger Document Store
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === "home"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage("form")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Request
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {currentPage === "home" && (
          <HomePage onNewRequest={() => setCurrentPage("form")} />
        )}

        {currentPage === "form" && (
          <div className="py-8">
            <DocumentRequestForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {currentPage === "dashboard" && (
          <div className="py-8">
            <Dashboard
              requests={requests}
              onRequestClick={handleRequestClick}
            />
          </div>
        )}

        {currentPage === "tracker" && selectedRequest && (
          <div className="py-8">
            <RequestTracker
              request={selectedRequest}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    // <Router>
    <AppContent />
    // </Router>
  );
}
