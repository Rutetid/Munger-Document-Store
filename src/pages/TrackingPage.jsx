import { useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import RequestTracker from "../components/RequestTracker";

const TrackingPage = () => {
  const { requestId } = useParams();
  const { getRequestById, updateRequestStatus } = useApp();

  const request = getRequestById(requestId);

  if (!request) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <RequestTracker request={request} onStatusUpdate={updateRequestStatus} />
    </div>
  );
};

export default TrackingPage;
