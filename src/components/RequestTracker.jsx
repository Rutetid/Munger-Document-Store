import { useState } from "react";
import {
  FaEdit,
  FaBuilding,
  FaFileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaCheck,
} from "react-icons/fa";

const RequestTracker = ({ request, onStatusUpdate }) => {
  const steps = [
    {
      id: 1,
      title: "Form Submitted",
      description: "Your document request has been submitted successfully",
      icon: FaEdit,
    },
    {
      id: 2,
      title: "Department Processing",
      description: "Request forwarded to relevant department for processing",
      icon: FaBuilding,
    },
    {
      id: 3,
      title: "Document Prepared",
      description: "Document has been prepared and verified",
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
        return "bg-green-500";
      case "current":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  const handlePayment = () => {
    // Simulate payment process
    alert("Redirecting to payment gateway...");
    setTimeout(() => {
      onStatusUpdate(request.id, 5);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Request Tracking</h2>
        <p className="text-gray-600">Request ID: {request.id}</p>
        <p className="text-sm text-gray-500">
          Document Type: {request.documentType}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold z-10 ${getStatusColor(
                    status
                  )}`}
                >
                  {status === "completed" ? <FaCheck /> : step.id}
                </div>
                <div className="mt-4 text-center max-w-32 h-20">
                  <p className="text-sm font-medium text-gray-800">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-6 left-[88px] w-[188px] h-0.5 z-5 ${
                      getStepStatus(step.id + 1) !== "pending"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Details */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Current Status</h3>
        {request.currentStep === 1 && (
          <div>
            <p className="text-green-600 font-medium flex items-center gap-2">
              <FaCheckCircle /> Request Submitted Successfully
            </p>
            <p className="text-gray-600 mt-2">
              Your request has been received and assigned ID: {request.id}. It
              will be forwarded to the relevant department shortly.
            </p>
          </div>
        )}

        {request.currentStep === 2 && (
          <div>
            <p className="text-blue-600 font-medium flex items-center gap-2">
              <FaBuilding /> Processing at Department
            </p>
            <p className="text-gray-600 mt-2">
              Your request is currently being processed by the{" "}
              {request.department} department. Estimated processing time:{" "}
              {request.estimatedTime}.
            </p>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800">
                <strong>Note:</strong> You will be notified once the document is
                ready.
              </p>
            </div>
          </div>
        )}

        {request.currentStep === 3 && (
          <div>
            <p className="text-green-600 font-medium flex items-center gap-2">
              <FaFileAlt /> Document Prepared
            </p>
            <p className="text-gray-600 mt-2">
              Your document has been prepared and verified. Processing will
              continue to payment.
            </p>
          </div>
        )}

        {request.currentStep === 4 && (
          <div>
            <p className="text-orange-600 font-medium flex items-center gap-2">
              <FaCreditCard /> Payment Required
            </p>
            <p className="text-gray-600 mt-2">
              Your document is ready. Please complete the payment to proceed
              with collection.
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded">
              <p className="text-blue-800 font-semibold">
                Amount Due: ₹{request.fees}
              </p>
              <button
                onClick={handlePayment}
                className="mt-3 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {request.currentStep === 5 && (
          <div>
            <p className="text-green-600 font-medium flex items-center gap-2">
              <FaCheckCircle /> Ready for Collection
            </p>
            <p className="text-gray-600 mt-2">
              Your document is ready for collection. Please visit our office or
              it will be delivered to your address.
            </p>
            <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded">
              <p className="text-green-800">
                <strong>Collection Details:</strong>
                <br />
                Office Address: Government Office, Munger
                <br />
                Working Hours: 10:00 AM - 5:00 PM (Mon-Fri)
                <br />
                Contact: +91-XXXXXXXXXX
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Request Details */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Request Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Applicant:</span> {request.fullName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {request.email}
          </div>
          <div>
            <span className="font-medium">Document Type:</span>{" "}
            {request.documentType}
          </div>
          <div>
            <span className="font-medium">Urgency:</span> {request.urgency}
          </div>
          <div>
            <span className="font-medium">Submitted:</span>{" "}
            {request.submittedAt}
          </div>
          <div>
            <span className="font-medium">Expected Completion:</span>{" "}
            {request.expectedCompletion}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTracker;
