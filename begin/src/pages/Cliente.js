import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Cliente() {

    const [clients, setClients] = useState([]);

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BEARER}` 
        }
    })

    const clientApiCall = async () => {
        const response = await backend.get('/api/Cliente');
        return response.status === 200 ? response.data : null;
    }

    useEffect(() => {
        const getApiClient = async () => {
            const apiClients = await clientApiCall();
            apiClients != null && setClients(apiClients);
        }
        getApiClient();
    }, [])

    return (
        <div class="table table-responsive table-striped">
        <table className="table" >
            <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {
                        clients.map((client) => (
                            <tr key={client['id']}>
                                <th scope="row">{client['id']}</th>
                                <td>{client['nombres']}</td>
                                <td>{client['apellidos']}</td>
                                <td>{client['direccion']}</td>
                                <td>{client['telefono']}</td>
                                <td>{client['email']}</td>
                            </tr>
                        ))
                    }
                </>
            </tbody>
        </table>
        </div>
    )
}
