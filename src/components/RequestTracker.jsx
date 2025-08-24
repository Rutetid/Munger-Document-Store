import { useState } from "react";
import {
  FaEdit,
  FaBuilding,
  FaFileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaCheck,
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RequestTracker = ({ request, onStatusUpdate }) => {
  const steps = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your document request has been submitted successfully",
      icon: FaEdit,
    },
    {
      id: 2,
      title: "Requested from concerned department",
      description: "Application forwarded to relevant department for processing",
      icon: FaBuilding,
    },
    {
      id: 3,
      title: "Document Received",
      description: "Document has been received from concerned department",
      icon: FaFileAlt,
    },
    {
      id: 4,
      title: "Payment Required",
      description: "Please complete payment to proceed",
      icon: FaCreditCard,
    },
    {
      id: 5,
      title: "Ready for Collection",
      description: "Document is ready for collection/delivery",
      icon: FaCheckCircle,
    },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < request.currentStep) return "completed";
    if (stepId === request.currentStep) return "current";
    return "pending";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-gray-900 text-white";
      case "current":
        return "bg-gray-900 text-white";
      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  const getConnectorColor = (status) => {
    return status !== "pending" ? "bg-gray-900" : "bg-gray-200";
  };

  const handlePayment = () => {
    // Simulate payment process
    alert("Redirecting to payment gateway...");
    setTimeout(() => {
      onStatusUpdate(request.id, 5);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
              <FaClock className="mr-2 text-xs" />
              Request Tracking
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {request.documentType}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-2">
                <strong>ID:</strong> {request.id}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-xs" />
                {request.submittedAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Progress Timeline
        </h2>

        <div className="relative">
          <div className="flex flex-col space-y-8">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="flex items-start gap-4 relative">
                  {/* Step Circle */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${getStatusColor(
                      status
                    )}`}
                  >
                    {status === "completed" ? (
                      <FaCheck className="text-sm" />
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-5 top-10 w-px h-20 ${getConnectorColor(
                        getStepStatus(step.id + 1)
                      )}`}
                    />
                  )}

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold ${
                        status === "current"
                          ? "text-gray-900"
                          : status === "completed"
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        status === "current"
                          ? "text-gray-600"
                          : status === "completed"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>

                    {status === "current" && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                        Current Step
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Step Details */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Current Status
        </h3>

        {request.currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-sm" />
              </div>
              <p className="font-medium text-gray-900">
                Request Submitted Successfully
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your request has been received and assigned ID:{" "}
              <span className="font-semibold">{request.id}</span>. It will be
              forwarded to the relevant department shortly.
            </p>
          </div>
        )}

        {request.currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FaBuilding className="text-blue-600 text-sm" />
              </div>
              <p className="font-medium text-gray-900">
                Processing at Department
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your request is currently being processed by the{" "}
              {request.department} department. Estimated processing time:{" "}
              <span className="font-semibold">{request.estimatedTime}</span>.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> You will be notified once the document is
                ready.
              </p>
            </div>
          </div>
        )}

        {request.currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaFileAlt className="text-green-600 text-sm" />
              </div>
              <p className="font-medium text-gray-900">Document Prepared</p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your document has been prepared and verified. Processing will
              continue to payment.
            </p>
          </div>
        )}

        {request.currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FaCreditCard className="text-orange-600 text-sm" />
              </div>
              <p className="font-medium text-gray-900">Payment Required</p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your document is ready. Please complete the payment to proceed
              with collection.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-semibold text-lg">
                    Amount Due
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{request.fees}
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {request.currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-sm" />
              </div>
              <p className="font-medium text-gray-900">Ready for Collection</p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your document is ready for collection. Please visit our office or
              it will be delivered to your address.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-3">
                Collection Details
              </h4>
              <div className="space-y-2 text-green-800 text-sm">
                <p>
                  <strong>Office Address:</strong> Government Office, Munger
                </p>
                <p>
                  <strong>Working Hours:</strong> 10:00 AM - 5:00 PM (Mon-Fri)
                </p>
                <p>
                  <strong>Contact:</strong> +91-XXXXXXXXXX
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Request Details */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-6">
          Request Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                Applicant Name
              </span>
              <span className="font-medium text-gray-900">
                {request.fullName}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                Email Address
              </span>
              <span className="font-medium text-gray-900">{request.email}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                Document Type
              </span>
              <span className="font-medium text-gray-900">
                {request.documentType}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                Priority Level
              </span>
              <span className="font-medium text-gray-900 capitalize">
                {request.urgency}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                Submitted Date
              </span>
              <span className="font-medium text-gray-900">
                {request.submittedAt}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                Expected Completion
              </span>
              <span className="font-medium text-gray-900">
                {request.expectedCompletion}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTracker;
