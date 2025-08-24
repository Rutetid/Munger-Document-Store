import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import QRCode from "react-qr-code";
import {
  FaSearch,
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
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaExclamationTriangle,
  FaQrcode,
  FaDownload,
  FaPrint,
} from "react-icons/fa";

const PublicTrackingPage = () => {
  const [applicationId, setApplicationId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { getRequestById, requests } = useApp();

  const steps = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your document request has been submitted successfully",
      icon: FaEdit,
    },
    {
      id: 2,
      title: "Under Review",
      description:
        "Application forwarded to relevant department for processing",
      icon: FaBuilding,
    },
    {
      id: 3,
      title: "Document Processing",
      description: "Document is being prepared and verified by authorities",
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!applicationId.trim()) {
      setError("Please enter an application ID");
      return;
    }

    setIsLoading(true);
    setError("");
    setTrackingData(null);

    // Simulate API call delay
    setTimeout(() => {
      const request = getRequestById(applicationId.toUpperCase());
      if (request) {
        // Transform the request data to match our display format
        const transformedData = {
          id: request.id,
          documentType: request.documentType,
          documentDescription: request.documentDescription,
          applicantName: request.fullName,
          email: request.email,
          phone: request.phone,
          submissionDate: request.submittedAt,
          expectedDelivery: request.expectedCompletion,
          currentStep: request.currentStep,
          status: getStatusFromStep(request.currentStep),
          fee: `₹${request.fees}`,
          paymentStatus: request.currentStep >= 4 ? "Completed" : "Pending",
          lastUpdated: new Date().toISOString().split("T")[0],
          remarks: getRemarkFromStep(request.currentStep, request.documentType),
          department: request.department,
        };
        setTrackingData(transformedData);
      } else {
        setError(
          "Application ID not found. Please check your ID and try again."
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusFromStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return "Application Submitted";
      case 2:
        return "Under Review";
      case 3:
        return "In Progress";
      case 4:
        return "Payment Required";
      case 5:
        return "Ready for Collection";
      default:
        return "Unknown";
    }
  };

  const getRemarkFromStep = (currentStep, documentType) => {
    switch (currentStep) {
      case 1:
        return "Application has been successfully submitted and is in queue";
      case 2:
        return `Application forwarded to ${documentType} department for review`;
      case 3:
        return "Document verification and processing in progress";
      case 4:
        return "Please complete payment to proceed with document delivery";
      case 5:
        return "Document is ready for collection or delivery";
      default:
        return "Status update pending";
    }
  };

  const getStepStatus = (stepId) => {
    if (!trackingData) return "pending";
    if (stepId < trackingData.currentStep) return "completed";
    if (stepId === trackingData.currentStep) return "current";
    return "pending";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "current":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  const getConnectorColor = (status) => {
    return status !== "pending" ? "bg-green-500" : "bg-gray-200";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Ready for Collection":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Under Review":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCurrentStepTitle = () => {
    if (!trackingData) return "Application Submitted";
    const currentStep = steps.find(
      (step) => step.id === trackingData.currentStep
    );
    return currentStep ? currentStep.title : "Application Submitted";
  };

  const generateQRData = () => {
    if (!trackingData) return "";
    return JSON.stringify({
      id: trackingData.id,
      name: trackingData.fullName,
      email: trackingData.email,
      phone: trackingData.phone,
      documentType: trackingData.documentType,
      description: trackingData.documentDescription,
      submittedAt: trackingData.submittedAt,
    });
  };

  const handleDownloadQR = () => {
    const svg = document.querySelector("#public-tracking-qr-code svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 256;
    canvas.height = 256;

    img.onload = function () {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${trackingData.id}-qrcode.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleDownloadPrintable = async () => {
    if (!trackingData) return;

    // Get QR code as base64
    const svg = document.querySelector("#public-tracking-qr-code svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const qrCanvas = document.createElement("canvas");
    const qrCtx = qrCanvas.getContext("2d");

    qrCanvas.width = 120;
    qrCanvas.height = 120;

    return new Promise((resolve) => {
      const qrImg = new Image();
      qrImg.onload = function () {
        qrCtx.fillStyle = "white";
        qrCtx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
        qrCtx.drawImage(qrImg, 0, 0, 120, 120);

        // Create main canvas for the printable document (A4 half size)
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Half A4 size at 150 DPI for good print quality
        canvas.width = 620; // ~4.1 inches at 150 DPI
        canvas.height = 400; // ~2.7 inches at 150 DPI (half page)

        // Fill background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw border
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        // Title section
        ctx.fillStyle = "#1F2937";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Munger District Administration", canvas.width / 2, 35);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#6B7280";
        ctx.fillText("Government of Bihar", canvas.width / 2, 50);

        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#3B82F6";
        ctx.fillText("Application Tracking Report", canvas.width / 2, 75);

        // Application ID
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(`ID: ${trackingData.id}`, canvas.width / 2, 95);

        // Current status
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#10B981";
        ctx.fillText(`Status: ${getCurrentStepTitle()}`, canvas.width / 2, 110);

        // Main content area - two columns
        const leftX = 25;
        const rightX = 350;
        let currentY = 135;

        // Left column - Application details
        ctx.textAlign = "left";
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";

        ctx.fillText("Document Type:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(trackingData.documentType, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Description:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(
          trackingData.documentDescription || "Not provided",
          leftX + 85,
          currentY
        );

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Applicant:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(trackingData.fullName, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Email:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(trackingData.email, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Phone:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(
          trackingData.phone || "Not provided",
          leftX + 85,
          currentY
        );

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Department:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(trackingData.department, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Submitted:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(trackingData.submittedAt, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Est. Time:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(trackingData.estimatedTime, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Fees:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(`₹${trackingData.fees}`, leftX + 85, currentY);

        // Right column - QR code and instructions
        ctx.textAlign = "center";
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#3B82F6";
        ctx.fillText("QR Code", rightX + 120, 150);

        // Draw QR code
        ctx.drawImage(qrCanvas, rightX + 60, 160, 120, 120);

        ctx.font = "10px Arial";
        ctx.fillStyle = "#6B7280";
        ctx.fillText("Scan for quick access", rightX + 120, 295);
        ctx.fillText("to track status", rightX + 120, 310);

        // Footer
        ctx.textAlign = "center";
        ctx.font = "10px Arial";
        ctx.fillStyle = "#6B7280";
        const footerY = canvas.height - 30;
        ctx.fillText(
          `Generated: ${new Date().toLocaleDateString("en-IN")}`,
          canvas.width / 2,
          footerY
        );
        ctx.fillText(
          "Munger Document Store - Government of Bihar",
          canvas.width / 2,
          footerY + 12
        );

        // Download the PNG
        const pngDataUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${trackingData.id}-tracking-slip.png`;
        downloadLink.href = pngDataUrl;
        downloadLink.click();

        resolve();
      };
      qrImg.src = "data:image/svg+xml;base64," + btoa(svgData);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
              <FaSearch className="mr-2" />
              Track Application
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Track Your Application
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your application ID to check the status of your document
              request
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application ID
              </label>
              <input
                type="text"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                placeholder="e.g., REQ-2025-002"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                You can find your application ID in the confirmation email or
                SMS
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Searching...
                </>
              ) : (
                <>
                  <FaSearch className="text-sm" />
                  Track Application
                </>
              )}
            </button>
          </form>

          {/* Sample IDs for demo */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl max-w-md mx-auto">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Available Application IDs:</strong>
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              {requests.map((request) => (
                <p key={request.id}>
                  • {request.id} ({request.documentType} -{" "}
                  {getStatusFromStep(request.currentStep)})
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 text-red-700">
              <FaExclamationTriangle className="text-sm" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Application Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {trackingData.documentType}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                        trackingData.status
                      )}`}
                    >
                      {trackingData.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ID: {trackingData.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Applicant</p>
                    <p className="font-medium">{trackingData.applicantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="font-medium">{trackingData.submissionDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Expected Delivery</p>
                    <p className="font-medium">
                      {trackingData.expectedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Fee</p>
                    <p className="font-medium">{trackingData.fee}</p>
                  </div>
                </div>
              </div>

              {/* Document Description - Full Width */}
              {trackingData.documentDescription && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <FaEdit className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Document Description
                      </p>
                      <p className="font-medium text-gray-900">
                        {trackingData.documentDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {trackingData.remarks && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-700">
                    <strong>Latest Update:</strong> {trackingData.remarks}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Last updated: {trackingData.lastUpdated}
                  </p>
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-8">
                Application Progress
              </h3>

              <div className="relative">
                {steps.map((step, index) => {
                  const status = getStepStatus(step.id);
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={step.id} className="relative flex items-start">
                      {/* Connector Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-6 top-12 w-0.5 h-16 ${getConnectorColor(
                            getStepStatus(step.id + 1)
                          )}`}
                        />
                      )}

                      {/* Step Circle */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(
                          status
                        )} transition-all duration-300`}
                      >
                        {status === "completed" ? (
                          <FaCheck className="text-sm" />
                        ) : (
                          <step.icon className="text-sm" />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="ml-6 pb-8">
                        <h4
                          className={`font-semibold mb-1 ${
                            status !== "pending"
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={`text-sm ${
                            status !== "pending"
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>
                        {status === "current" && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                              Current Step
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaQrcode className="text-blue-600" />
                Quick Access QR Code
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl">
                    <div id="public-tracking-qr-code">
                      <QRCode
                        value={generateQRData()}
                        size={200}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Scan this QR code to quickly access your application details
                    from any device
                  </p>
                </div>

                {/* QR Code Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Download Options
                  </h4>

                  <div className="space-y-3">
                    <button
                      onClick={handleDownloadQR}
                      className="w-full bg-blue-100 text-blue-700 px-4 py-3 rounded-xl font-medium hover:bg-blue-200 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaDownload className="text-sm" />
                      Download QR Code
                    </button>

                    <button
                      onClick={handleDownloadPrintable}
                      className="w-full bg-green-100 text-green-700 px-4 py-3 rounded-xl font-medium hover:bg-green-200 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaPrint className="text-sm" />
                      Print Tracking Slip
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">
                      <strong>QR Code contains:</strong> Application ID,
                      Applicant name, Email, Phone, Document type, Document
                      description, and Submission date
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-gray-600">+91-XXXXXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-gray-600">
                      support@mungerdocstore.gov.in
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Office Hours:</strong> Monday to Friday, 9:00 AM -
                  6:00 PM
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTrackingPage;
