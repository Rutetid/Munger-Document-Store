import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DocumentRequestForm from "../components/DocumentRequestForm";

const RequestPage = () => {
  const navigate = useNavigate();
  const { submitRequest } = useApp();

  const handleFormSubmit = (formData) => {
    const newRequest = submitRequest(formData);
    // Navigate to confirmation page first
    navigate(`/confirmation/${newRequest.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <DocumentRequestForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RequestPage;
