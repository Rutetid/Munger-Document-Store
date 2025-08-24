import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaClock,
  FaCreditCard,
  FaCheckCircle,
  FaFileAlt,
  FaArrowRight,
  FaPlus,
  FaFilter,
  FaTachometerAlt,
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
      1: "bg-gray-100 text-gray-700",
      2: "bg-orange-100 text-orange-700",
      3: "bg-blue-100 text-blue-700",
      4: "bg-red-100 text-red-700",
      5: "bg-green-100 text-green-700",
    };
    return colorMap[step] || "bg-gray-100 text-gray-700";
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
              <FaTachometerAlt className="mr-2 text-xs" />
              Dashboard
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Your Documents
            </h1>
            <p className="text-lg text-gray-600">
              Track and manage your document requests
            </p>
          </div>

          <Link
            to="/request"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
          >
            <FaPlus className="text-sm" />
            New Request
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Requests
              </p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <FaChartBar className="text-gray-600 text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                In Progress
              </p>
              <p className="text-3xl font-bold text-orange-600">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-orange-600 text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Payment Due
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.payment}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaCreditCard className="text-blue-600 text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Completed
              </p>
              <p className="text-3xl font-bold text-green-600">
                {stats.completed}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400 text-sm" />
          <span className="text-sm font-medium text-gray-600">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All" },
            { key: "pending", label: "In Progress" },
            { key: "payment", label: "Payment Due" },
            { key: "completed", label: "Completed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Requests
          </h2>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaFileAlt className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No requests found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first document request
            </p>
            <Link
              to="/request"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 inline-flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Create Request
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => onRequestClick(request)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                        {request.documentType}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          request.currentStep
                        )}`}
                      >
                        {getStatusText(request.currentStep)}
                      </span>
                    </div>
                    {request.documentDescription && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {request.documentDescription}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-500">
                      <span>
                        ID: <span className="font-medium">{request.id}</span>
                      </span>
                      <span>
                        Submitted:{" "}
                        <span className="font-medium">
                          {request.submittedAt}
                        </span>
                      </span>
                      <span>
                        Priority:{" "}
                        <span className="font-medium capitalize">
                          {request.urgency}
                        </span>
                      </span>
                      {request.currentStep === 4 && (
                        <span className="text-orange-600 font-semibold">
                          Due: ₹{request.fees}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-300 group-hover:text-gray-400 transition-colors">
                    <FaArrowRight className="text-sm" />
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
