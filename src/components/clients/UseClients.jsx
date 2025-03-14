import { useEffect, useState } from "react";
import { GetClients } from "../../api-connection/ApiEndpoints";

const UseClients = (refreshTrigger) => { 
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await GetClients();
        setClients(response);
        setLoading(false);
      } catch (err) {
        console.error("error", err);
      }
    };
    fetchClients();
  }, [refreshTrigger]); 

  return { clients, loading };
};

export default UseClients;