import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaIdCard,
  FaDownload,
  FaEye,
  FaQrcode,
  FaArrowRight,
  FaPrint,
} from "react-icons/fa";

const RequestConfirmation = ({ request }) => {
  const [showQR, setShowQR] = useState(false);

  // QR Code data containing ID, name, email, phone, and document type
  const qrData = JSON.stringify({
    id: request.id,
    name: request.fullName,
    email: request.email,
    phone: request.phone,
    documentType: request.documentType,
    submittedAt: request.submittedAt,
  });

  const handleDownloadQR = () => {
    const svg = document.querySelector("#qr-code svg");
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
      downloadLink.download = `${request.id}-qrcode.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleDownloadPrintable = async () => {
    // Get QR code as base64
    const svg = document.querySelector("#qr-code svg");
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
        ctx.fillText("Document Request Application", canvas.width / 2, 75);

        // Application ID
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(`ID: ${request.id}`, canvas.width / 2, 95);

        // Main content area - two columns
        const leftX = 25;
        const rightX = 350;
        let currentY = 120;

        // Left column - Application details
        ctx.textAlign = "left";
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";

        ctx.fillText("Document Type:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.documentType, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Applicant:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.fullName, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Email:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.email, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Phone:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.phone || "Not provided", leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Department:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.department, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Submitted:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.submittedAt, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Est. Time:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(request.estimatedTime, leftX + 85, currentY);

        currentY += 20;
        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "#4B5563";
        ctx.fillText("Fees:", leftX, currentY);
        ctx.font = "11px Arial";
        ctx.fillStyle = "#1F2937";
        ctx.fillText(`₹${request.fees}`, leftX + 85, currentY);

        // Right column - QR code and instructions
        ctx.textAlign = "center";
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#3B82F6";
        ctx.fillText("QR Code", rightX + 120, 135);

        // Draw QR code
        ctx.drawImage(qrCanvas, rightX + 60, 145, 120, 120);

        ctx.font = "10px Arial";
        ctx.fillStyle = "#6B7280";
        ctx.fillText("Scan for quick access", rightX + 120, 280);
        ctx.fillText("to application details", rightX + 120, 295);

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
        downloadLink.download = `${request.id}-application-slip.png`;
        downloadLink.href = pngDataUrl;
        downloadLink.click();

        resolve();
      };
      qrImg.src = "data:image/svg+xml;base64," + btoa(svgData);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="text-green-600 text-2xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your document request has been received and is being processed. Here
            are your request details:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaFileAlt className="text-blue-600" />
                Application Details
              </h2>

              <div className="space-y-6">
                {/* Request ID */}
                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                  <div className="flex items-center gap-3">
                    <FaIdCard className="text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">
                        Application ID
                      </p>
                      <p className="text-xl font-bold text-blue-900">
                        {request.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Type */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <FaFileAlt className="text-gray-600 text-lg" />
                  <div>
                    <p className="text-sm text-gray-600">Document Type</p>
                    <p className="font-semibold text-gray-900">
                      {request.documentType}
                    </p>
                  </div>
                </div>

                {/* Applicant Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <FaUser className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-semibold text-gray-900">
                        {request.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <FaEnvelope className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">
                        {request.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <FaPhone className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {request.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <FaFileAlt className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-semibold text-gray-900">
                        {request.department}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Processing Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Processing Time</p>
                    <p className="font-semibold text-gray-900">
                      {request.estimatedTime}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Fees</p>
                    <p className="font-semibold text-gray-900">
                      ₹{request.fees}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Expected Completion</p>
                    <p className="font-semibold text-gray-900">
                      {request.expectedCompletion}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/track/${request.id}`}
                className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaEye className="text-sm" />
                Track Application
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/dashboard"
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaQrcode className="text-blue-600" />
                QR Code
              </h3>

              <div className="text-center">
                <div className="mb-6">
                  <div
                    id="qr-code"
                    className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl"
                  >
                    <QRCode
                      value={qrData}
                      size={200}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  This QR code contains your application details. Scan it to
                  quickly access your request information.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FaQrcode className="text-sm" />
                    {showQR ? "Hide" : "Show"} QR Data
                  </button>

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
                    Print Slip
                  </button>
                </div>

                {/* QR Data Display */}
                {showQR && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl text-left">
                    <p className="text-xs text-gray-600 mb-2">QR Code Data:</p>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                      {JSON.stringify(JSON.parse(qrData), null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="font-semibold text-yellow-800 mb-3">
            Important Notes:
          </h4>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>
              • Please save your Application ID: <strong>{request.id}</strong>
            </li>
            <li>
              • You will receive email/SMS updates on your application status
            </li>
            <li>
              • Use the QR code for quick access to your application details
            </li>
            <li>• Processing time: {request.estimatedTime}</li>
            <li>
              • Total fees: ₹{request.fees} (payable upon document completion)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmation;
