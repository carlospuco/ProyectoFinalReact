import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Marca() {
    const [marcas, setMarcas] = useState([]);

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BEARER}` 
        }
    })

    const marcaApiCall = async () => {
        const response = await backend.get('/api/Marcas');
        return response.status === 200 ? response.data : null;
    }

    useEffect(() => {
        const getApiMarca = async () => {
            const apiMarcas = await marcaApiCall();
            apiMarcas != null && setMarcas(apiMarcas);
        }
        getApiMarca();
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
                        marcas.map((marca) => (
                            <tr key={marca['id']}>
                                <th scope="row">{marca['id']}</th>
                                <td>{marca['nombre']}</td>
                            </tr>
                        ))
                    }
                </>
            </tbody>
        </table>
        </div>
    )
}
