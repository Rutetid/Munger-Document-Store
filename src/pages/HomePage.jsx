import { Link } from "react-router-dom";
import {
  FaBaby,
  FaDove,
  FaRing,
  FaHome,
  FaStore,
  FaClipboardList,
  FaEdit,
  FaBuilding,
  FaFileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaLaptop,
  FaBolt,
  FaLock,
  FaChartBar,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const HomePage = () => {
  const documentTypes = [
    {
      name: "Birth Certificate",
      description: "Official document certifying birth details",
      fees: "₹50",
      processingTime: "7-10 days",
      icon: FaBaby,
    },
    {
      name: "Death Certificate",
      description: "Official document certifying death details",
      fees: "₹50",
      processingTime: "5-7 days",
      icon: FaDove,
    },
    {
      name: "Marriage Certificate",
      description: "Official document certifying marriage",
      fees: "₹100",
      processingTime: "10-15 days",
      icon: FaRing,
    },
    {
      name: "Property Registration",
      description: "Property ownership and registration documents",
      fees: "₹500",
      processingTime: "15-20 days",
      icon: FaHome,
    },
    {
      name: "Trade License",
      description: "License for conducting trade/business",
      fees: "₹200",
      processingTime: "10-12 days",
      icon: FaStore,
    },
    {
      name: "Caste Certificate",
      description: "Certificate for caste verification",
      fees: "₹30",
      processingTime: "7-10 days",
      icon: FaClipboardList,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Munger Document Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop solution for all government document requests
            </p>
            <Link
              to="/request"
              className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request Document
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How Our Service Works
          </h2>
          <p className="text-gray-600 text-lg">
            Simple 5-step process to get your documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
          {[
            {
              step: 1,
              title: "Submit Form",
              description:
                "Fill out the document request form with required details",
              icon: FaEdit,
            },
            {
              step: 2,
              title: "Department Processing",
              description:
                "Your request is forwarded to the relevant department",
              icon: FaBuilding,
            },
            {
              step: 3,
              title: "Document Preparation",
              description: "Document is prepared and verified by authorities",
              icon: FaFileAlt,
            },
            {
              step: 4,
              title: "Payment",
              description: "Complete secure online payment for document fees",
              icon: FaCreditCard,
            },
            {
              step: 5,
              title: "Collection",
              description: "Collect your document or get it delivered",
              icon: FaCheckCircle,
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <item.icon className="text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Available Documents */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Available Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((doc) => (
              <div
                key={doc.name}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl text-blue-600">
                    <doc.icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {doc.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {doc.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600 font-medium">
                        {doc.fees}
                      </span>
                      <span className="text-gray-500">
                        {doc.processingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose Our Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Digital First",
                description: "Complete process online with real-time tracking",
                icon: FaLaptop,
              },
              {
                title: "Fast Processing",
                description: "Quick turnaround times with priority options",
                icon: FaBolt,
              },
              {
                title: "Secure & Reliable",
                description: "Government-verified process with secure payments",
                icon: FaLock,
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-4xl mb-3 text-blue-600">
                  <benefit.icon />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 Munger Document Store. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            For support, contact: support@mungerdocstore.gov.in | +91-XXXXXXXXXX
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
