import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaFileAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";

const DocumentRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    documentType: "",
    customDocumentType: "",
    documentDescription: "",
  });

  const documentTypes = [
    { value: "Birth Certificate", fee: "₹50", time: "7-10 days" },
    { value: "Death Certificate", fee: "₹50", time: "5-7 days" },
    { value: "Marriage Certificate", fee: "₹100", time: "10-15 days" },
    { value: "Property Registration", fee: "₹500", time: "15-20 days" },
    { value: "Trade License", fee: "₹200", time: "10-12 days" },
    { value: "Building Permit", fee: "₹300", time: "20-25 days" },
    { value: "Tax Certificate", fee: "₹75", time: "5-7 days" },
    { value: "Caste Certificate", fee: "₹30", time: "7-10 days" },
    { value: "Income Certificate", fee: "₹40", time: "7-10 days" },
    { value: "Domicile Certificate", fee: "₹50", time: "10-12 days" },
    { value: "Other", fee: "Varies", time: "Varies" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.documentType) {
      alert("Please fill in all required fields");
      return;
    }
    if (formData.documentType === "Other" && !formData.customDocumentType) {
      alert("Please specify the custom document type");
      return;
    }
    if (!formData.documentDescription) {
      alert("Please provide a description of the document");
      return;
    }
    onSubmit(formData);
  };

  const selectedDocType = documentTypes.find(
    (doc) => doc.value === formData.documentType
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          Back to Home
        </Link>
        <br />

        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
          <FaFileAlt className="mr-2 text-xs" />
          Document Request
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          Request Document
        </h1>
        <p className="text-lg text-gray-600">
          Fill out the form below to request your government document
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaUser className="text-gray-400" />
                Personal Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Document Information Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaFileAlt className="text-gray-400" />
                Document Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type *
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                    required
                  >
                    <option value="">Select Document Type</option>
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.value} - {type.fee} ({type.time})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Document Type Input - Shows when "Other" is selected */}
                {formData.documentType === "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specify Document Type *
                    </label>
                    <input
                      type="text"
                      name="customDocumentType"
                      value={formData.customDocumentType}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                      placeholder="e.g., Character Certificate, No Objection Certificate"
                      required
                    />
                  </div>
                )}

                {/* Document Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Description *
                  </label>
                  <textarea
                    name="documentDescription"
                    value={formData.documentDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 resize-none"
                    placeholder="e.g., Death certificate for Mr. Ram Kumar, son of Shyam Kumar, who passed away on 15th January 2024 at Munger District Hospital. Required for insurance claim settlement."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Please provide detailed information about the document you
                    need, including names, dates, purposes, and any specific
                    requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
              >
                <FaFileAlt className="text-sm" />
                Submit Request
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Document Preview */}
            {selectedDocType && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Document Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document:</span>
                    <span className="font-medium">
                      {formData.documentType === "Other" &&
                      formData.customDocumentType
                        ? formData.customDocumentType
                        : selectedDocType.value}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium">{selectedDocType.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium">{selectedDocType.time}</span>
                  </div>
                  {formData.documentDescription && (
                    <div className="pt-3 border-t border-gray-100">
                      <span className="text-gray-600 block mb-2">
                        Description:
                      </span>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {formData.documentDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Help Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaInfoCircle className="text-gray-400" />
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                If you need assistance with your document request, our support
                team is here to help.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Phone:</strong> +91-XXXXXXXXXX
                </p>
                <p>
                  <strong>Email:</strong> support@mungerdocstore.gov.in
                </p>
                <p>
                  <strong>Hours:</strong> 9 AM - 6 PM (Mon-Fri)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentRequestForm;
