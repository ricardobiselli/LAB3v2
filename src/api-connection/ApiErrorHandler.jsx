import { useState, useCallback } from "react";

const useApiErrorHandler = () => {
    const [error, setError] = useState(null);

    const handleApiError = useCallback((err) => {
        if (err.response) {
            setError(err.response.data?.error || "Server error. REACT");
        } else if (err.request) {
            setError("No response from the server. Please try again later.REACT");
        } else {
            setError(err.message || "An unknown error occurred.REACT");
        }
        console.error("API Error:", err);
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { error, handleApiError, clearError };
};

export default useApiErrorHandler;
