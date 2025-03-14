import {  useContext } from "react";
import ClientCard from "./ClientCard";
import UseClients from "./UseClients";
import { Container, Row } from 'react-bootstrap';
import AuthContext from "../../services/authentication/AuthContext";
import AdminPanel from "../admin/AdminPanel";

  const ClientList = () => {
    const { user, role } = useContext(AuthContext);
    const {fetchClients, clients, loading } = UseClients();

    // const handleEditClient = (updatedClient) => {
    //   setClients((prevClients) =>
    //     prevClients.map((client) =>
    //       client.id === updatedClient.id ? updatedClient : client
    //     )
    //   );
    // };

    if (loading) return <p>pleaes wait while clients are loading....</p>;

    return (
      <Container>
        {user && (role === "admin" || role === "superadmin") && <AdminPanel />}
        <Row>
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              // onClientEdit={handleEditClient} 
              fetchClients={fetchClients}
            />
          ))}
        </Row>
      </Container>
    );
  };

  export default ClientList;

