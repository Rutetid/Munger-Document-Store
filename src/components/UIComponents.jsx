const Loading = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center p-8">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-gray-600">{message}</span>
    </div>
  </div>
);

const NotificationBanner = ({ type, message, onClose }) => {
  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between ${getStyles()}`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-75 font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const ProgressBar = ({ current, total, steps }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          Step {current} of {total}
        </span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {steps && (
        <div className="mt-2 text-sm text-gray-600">
          Current: {steps[current - 1]}
        </div>
      )}
    </div>
  );
};

export { Loading, NotificationBanner, Modal, ProgressBar };
