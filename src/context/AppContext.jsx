import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [requests, setRequests] = useState([
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

  const submitRequest = (formData) => {
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

    // Simulate automatic progression to step 2 after submission
    setTimeout(() => {
      updateRequestStatus(newRequest.id, 2);
    }, 2000);

    return newRequest;
  };

  const updateRequestStatus = (requestId, newStep) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, currentStep: newStep } : req
      )
    );
  };

  const getRequestById = (requestId) => {
    return requests.find((req) => req.id === requestId);
  };

  const value = {
    requests,
    submitRequest,
    updateRequestStatus,
    getRequestById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
