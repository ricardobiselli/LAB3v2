import { useEffect, useState } from "react";
import { GetClients } from "../../api-connection/ApiEndpoints";

const UseClients = () => { 
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await GetClients();
      setClients(response);
      setLoading(false);
    } catch (err) {
      console.error("error", err);
    }
  };

  return { fetchClients, clients  , loading };
};


export default UseClients;