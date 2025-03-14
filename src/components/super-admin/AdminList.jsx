import { useState, useContext } from "react";
import { Container, Row } from 'react-bootstrap';
import AuthContext from "../../services/authentication/AuthContext";
import AdminPanel from "../admin/AdminPanel";
import UseAdmins from "./UseAdmins";
import AdminCard from "./AdminCard";

const AdminList = () => {
  const { user, role } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0); 
  const { admins, loading } = UseAdmins(refreshTrigger); 

  if (loading) return <p>pleaes wait while clients are loading....</p>;

  return (
    <Container>
      {user && (role === "superadmin") && <AdminPanel />}
      <Row>
        {admins.map((admin) => (
          <AdminCard
            key={admin.id}
            client={admin}
            setRefreshTrigger={setRefreshTrigger}
            refreshTrigger={refreshTrigger}
          />
        ))}
      </Row>
    </Container>
  );
};

export default AdminList;;

