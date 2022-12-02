import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function ElminarCliente() {
    const [clients, setClients] = useState([]);
    const [id, setId] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        RefreshListCliente();
    }, [])

    function RefreshListCliente() {
        const getApiClient = async () => {
            const apiClients = await clientApiCall();
            apiClients != null && setClients(apiClients);
        }
        getApiClient();
    }


    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://localhost:7008/api/Cliente/${id}`);
            alert("El Producto se Borro de forma existosa");
            setShow(false);
            RefreshListCliente();
        } catch (error) {
            alert("El Producto no se borro");
        }
    }

    return (
        <div className="table table-responsive table-striped">
            <table className="table" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Email</th>
                        <th scope="col">Accion</th>

                    </tr>
                </thead>
                <tbody>
                    <>
                        {
                            clients.map((client) => (
                                <tr key={client['id']}>
                                    <th scope="row">{client.id}</th>
                                    <td>{client.nombres}</td>
                                    <td>{client.apellidos}</td>
                                    <td>{client.direccion}</td>
                                    <td>{client.telefono}</td>
                                    <td>{client.email}</td>
                                    <td> <button type="submit" className="btn btn-danger" onClick={() => {
                                        setId(client.id);
                                        handleShow()
                                    }} >Borrar</button></td>
                                </tr>
                            ))
                        }
                    </>
                </tbody>
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Borrar Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form action='post'>
                                <div className="form-row">
                                    Esta seguro de Borrar el Elemento
                                </div>
                                <br>
                                </br>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" class="btn btn-info" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" className="btn btn-danger" onClick={() => {
                                deleteProduct(id);
                                RefreshListCliente();
                            }}>Borrar</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </table>
        </div>
    )
}
