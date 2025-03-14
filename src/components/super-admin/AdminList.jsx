import { useContext } from "react";
import { Container, Row } from 'react-bootstrap';
import AuthContext from "../../services/authentication/AuthContext";
import AdminPanel from "../admin/AdminPanel";
import UseAdmins from "./UseAdmins";
import AdminCard from "./AdminCard";

const AdminList = () => {
  const { user, role } = useContext(AuthContext);
  const { admins, loading, fetchAdmins } = UseAdmins(); 

  if (loading) return <p>please wait while Admins are loading....</p>;

  return (
    <Container>
      {user && (role === "superadmin") && <AdminPanel />}
      <Row>
        {admins.map((admin) => (
          <AdminCard
            key={admin.id}
            admin={admin}
            fetchAdmins={fetchAdmins}
          />
        ))}
      </Row>
    </Container>
  );
};

export default AdminList;;

