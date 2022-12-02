import { useEffect, useState } from 'react'
import axios from 'axios'
export default function TipoProducto() {
    const [tipoProductos, setTipoProductos] = useState([]);

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BEARER}` 
        }
    })

    const tipoProductoApiCall = async () => {
        const response = await backend.get('/api/TipoProducto');
        return response.status === 200 ? response.data : null;
    }

    useEffect(() => {
        const getApiTipoProducto = async () => {
            const apiTipoProductos = await tipoProductoApiCall();
            apiTipoProductos != null && setTipoProductos(apiTipoProductos);
        }
        getApiTipoProducto();
    }, [])

    return (
        <div className="table table-responsive table-striped">
        <table className="table" >
            <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {
                        tipoProductos.map((tipoProducto) => (
                            <tr key={tipoProducto['id']}>
                                <th scope="row">{tipoProducto['id']}</th>
                                <td>{tipoProducto['descripcion']}</td>
                            </tr>
                        ))
                    }
                </>
            </tbody>
        </table>
        </div>
    )
}
