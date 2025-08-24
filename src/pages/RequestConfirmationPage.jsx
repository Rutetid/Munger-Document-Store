import { useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import RequestConfirmation from "../components/RequestConfirmation";

const RequestConfirmationPage = () => {
  const { requestId } = useParams();
  const { getRequestById } = useApp();

  const request = getRequestById(requestId);

  if (!request) {
    return <Navigate to="/request" replace />;
  }

  return <RequestConfirmation request={request} />;
};

export default RequestConfirmationPage;
