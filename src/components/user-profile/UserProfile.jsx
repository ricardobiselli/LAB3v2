import { useContext, useEffect , useState} from "react";
import AuthContext from "../../services/authentication/AuthContext";
import { Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import { GetClient } from "../../api-connection/ApiEndpoints";

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [currentClient, setCurrentClient] = useState(null);

    console.log('user sub: ', user.sub);
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await GetClient(user.sub)
                setCurrentClient(response.data)
;
            } catch (err){
            setError(err.message)
            console.log('error details: ', error);}
        }
        fetchClient();
    },[])

    if (!user) {
        return <p>Loading user information...</p>; 
    }
//PENDIENTE PENDIEN PENDIENTE
    return (
        <Card>
            <CardHeader>
                <p>Hi {currentClient.userName}!</p>
            </CardHeader>
            <CardTitle>Your personal information:</CardTitle>
            <CardBody>
                username: {currentClient.userName}<br />
                First name: {currentClient.firstName}<br />
                Last name: {currentClient.lastName}<br />
                Dni number: {currentClient.dniNumber}<br />
                Direccion: {currentClient.adress}<br />
                email: {currentClient.email}<br />
                {console.log("Username: ", currentClient.userName)}
                {console.log("First Name: ", currentClient.firstName)}
                {console.log("Last Name: ", currentClient.lastName)}
                {console.log("DNI Number: ", currentClient.dniNumber)}
                {console.log("Address: ", currentClient.adress)}
                {console.log("Email: ", currentClient.email)}
            </CardBody>
        </Card>
    );
};

export default UserProfile;
