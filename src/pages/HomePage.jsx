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
  FaArrowRight,
  FaShieldAlt,
  FaUserCheck,
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gray-900"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Munger District Administration
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              <span className="block">Munger</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Abhilekh Seva
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Streamline your government document requests with our modern,
              secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/request"
                className="group bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center"
              >
                Track Status
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
            <FaClock className="mr-2" />
            How It Works
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple Process,
            <span className="text-blue-600"> Amazing Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your government documents in just 5 easy steps with our
            streamlined digital process
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: 1,
                title: "Submit Application",
                description:
                  "Fill out the document request Application with required details",
                icon: FaEdit,
                color: "bg-green-300",
              },
              {
                step: 2,
                title: "Forwarded to Department",
                description:
                  "Your application is forwarded to the relevant department",
                icon: FaBuilding,
                color: "bg-green-400",
              },
              {
                step: 3,
                title: "Document Received",
                description:
                  "Document has been received from concerned department",
                icon: FaFileAlt,
                color: "bg-green-500",
              },
              {
                step: 4,
                title: "Payment",
                description: "Complete secure online payment of nominal fee",
                icon: FaCreditCard,
                color: "bg-green-600",
              },
              {
                step: 5,
                title: "Collection",
                description: "Collect your document or get it delivered",
                icon: FaCheckCircle,
                color: "bg-green-700",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center group">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300`}
                  >
                    <item.icon className="text-white text-xl" />
                  </div>
                  <div className="absolute -top-4 right-[118px] w-8 h-8 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center font-bold text-sm text-gray-700 shadow-md">
                    {item.step}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-3 text-lg whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed ">
                  {item.description}
                </p>

                {index < 4 && (
                  <div className="hidden lg:block absolute top-6 -right-4 text-blue-300">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Documents */}
        <div className="mb-20 mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
              <FaFileAlt className="mr-2" />
              Available Documents
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="text-blue-600"> Document Type</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((doc, index) => (
              <div
                key={doc.name}
                className="group relative bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-100 rounded-2xl group-hover:from-blue-200 group-hover:to-blue-200 transition-all duration-300">
                      <doc.icon className="text-2xl text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-700 transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {doc.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FaMoneyBillWave className="text-green-500 text-sm" />
                            <span className="text-green-600 font-semibold text-sm">
                              {doc.fees}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock className="text-orange-500 text-sm" />
                            <span className="text-gray-500 text-sm">
                              {doc.processingTime}
                            </span>
                          </div>
                        </div>

                        <button className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <FaArrowRight className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied users who have streamlined their
              document requests through our platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/request"
                className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-8 py-3 font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Request
              </Link>
              <Link
                to="/dashboard"
                className="border border-gray-500 text-gray-300 px-8 py-3 font-semibold rounded-2xl hover:border-gray-400 hover:text-white transition-all duration-300"
              >
                View Dashboard
              </Link>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-300 mb-2">
                &copy; 2025 Munger Document Store. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
                <span>📧 support@mungerdocstore.gov.in</span>
                <span className="hidden sm:block">•</span>
                <span>📞 +91-XXXXXXXXXX</span>
                <span className="hidden sm:block">•</span>
                <span>🕒 24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
