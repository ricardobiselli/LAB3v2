import { useEffect, useState } from "react";
import { GetAdmins } from "../../api-connection/ApiEndpoints";

const UseAdmins = () => { 
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchAdmins();
  }, []); 

  const fetchAdmins = async () => {
    try {
      const response = await GetAdmins();
      setAdmins(response);
      setLoading(false);
    } catch (err) {
      console.error("error", err);
    }
  };

  return { admins, loading , fetchAdmins };
};

export default UseAdmins;