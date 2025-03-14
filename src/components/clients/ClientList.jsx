import { useState, useContext } from "react";
import ClientCard from "./ClientCard";
import UseClients from "./UseClients";
import { Container, Row } from 'react-bootstrap';
import AuthContext from "../../services/authentication/AuthContext";
import AdminPanel from "../admin/AdminPanel";

const ClientList = () => {
  const { user, role } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0); 
  const { clients, loading } = UseClients(refreshTrigger); 

  if (loading) return <p>pleaes wait while clients are loading....</p>;

  return (
    <Container>
      {user && (role === "admin" || role === "superadmin") && <AdminPanel />}
      <Row>
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            setRefreshTrigger={setRefreshTrigger}
            refreshTrigger={refreshTrigger}
          />
        ))}
      </Row>
    </Container>
  );
};

export default ClientList;

