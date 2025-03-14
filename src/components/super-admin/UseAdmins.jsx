import { useEffect, useState } from "react";
import { GetAdmins } from "../../api-connection/ApiEndpoints";

const UseAdmins = (refreshTrigger) => { 
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await GetAdmins();
        setAdmins(response);
        setLoading(false);
      } catch (err) {
        console.error("error", err);
      }
    };
    fetchClients();
  }, [refreshTrigger]); 

  return { admins, loading };
};

export default UseAdmins;