import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaClock,
  FaCreditCard,
  FaCheckCircle,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";

const Dashboard = ({ requests, onRequestClick }) => {
  const [filter, setFilter] = useState("all");

  const getStatusText = (step) => {
    const statusMap = {
      1: "Submitted",
      2: "Processing",
      3: "Document Ready",
      4: "Payment Pending",
      5: "Ready for Collection",
    };
    return statusMap[step] || "Unknown";
  };

  const getStatusColor = (step) => {
    const colorMap = {
      1: "bg-blue-100 text-blue-800",
      2: "bg-yellow-100 text-yellow-800",
      3: "bg-purple-100 text-purple-800",
      4: "bg-orange-100 text-orange-800",
      5: "bg-green-100 text-green-800",
    };
    return colorMap[step] || "bg-gray-100 text-gray-800";
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true;
    if (filter === "pending") return request.currentStep < 5;
    if (filter === "completed") return request.currentStep === 5;
    if (filter === "payment") return request.currentStep === 4;
    return true;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.currentStep < 5).length,
    completed: requests.filter((r) => r.currentStep === 5).length,
    payment: requests.filter((r) => r.currentStep === 4).length,
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Document Store Dashboard
        </h1>
        <p className="text-gray-600">Track and manage your document requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaChartBar className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaClock className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Due</p>
              <p className="text-2xl font-bold text-orange-600">
                {stats.payment}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaCreditCard className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "All Requests" },
          { key: "pending", label: "Pending" },
          { key: "payment", label: "Payment Due" },
          { key: "completed", label: "Completed" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Your Requests</h2>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFileAlt className="text-gray-400" />
            </div>
            <p className="text-gray-500">No requests found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => onRequestClick(request)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.documentType}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          request.currentStep
                        )}`}
                      >
                        {getStatusText(request.currentStep)}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>ID: {request.id}</span>
                      <span>Submitted: {request.submittedAt}</span>
                      <span>Urgency: {request.urgency}</span>
                      {request.currentStep === 4 && (
                        <span className="text-orange-600 font-medium">
                          Amount Due: ₹{request.fees}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
