import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function ActualizarCliente() {
    const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    const [nombresInput, setnombresInput] = useState("");
    const [apellidosInput, setapellidosInput] = useState("");
    const [direccionInput, setdireccionInput] = useState("");
    const [telefonoInput, setTelefonoInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [clients, setClients] = useState([]);

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
    })

    const clienteApiCall = async () => {
        const response = await backend.get('/api/Cliente');
        return response.status === 200 ? response.data : null;
    }

    useEffect(() => {
        const getApiCliente = async () => {
            const apiClientes = await clienteApiCall();
            apiClientes != null && setClients(apiClientes);
        }
        getApiCliente();
    }, [])


    const clienteApiPut = async () => {
        let formData = new FormData();
        formData.append("nombres", nombresInput);
        formData.append("apellidos", apellidosInput);
        formData.append("direccion", direccionInput);
        formData.append("telefono", telefonoInput);
        formData.append("email", emailInput);


        fetch(`https://localhost:7008/api/Cliente/${id}`, {
            method: 'PUT',
            body: formData
        }).then(res => {
            res.ok ? alert('Cliente modificado satisfactoriamente!') : alert('Error al modificar el Cliente!');
            setShow(false);
        });

    }

    const handleUpdate = () => {
        clienteApiPut();

        setnombresInput("")
        setnombresInput("")
        setapellidosInput("")
        setdireccionInput("")
        setdireccionInput("")
        setTelefonoInput("")
        setEmailInput("")
        setId("");
    }

    const handleChange = (event) => {
        setnombresInput(event.target.value)
        setapellidosInput(event.target.value)
        setdireccionInput(event.target.value)
        setdireccionInput(event.target.value)
        setTelefonoInput(event.target.value)
        setEmailInput(event.target.value)
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
                        <th scope="col">Acciones</th>
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
                                    <td> <button type="submit" className="btn btn-primary" onClick={() => {
                                        setId(client.id)
                                        handleShow()
                                    }} >Actualizar Cliente</button></td>
                                </tr>
                            ))
                        }
                    </>
                </tbody>
            </table>
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Actulizar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action='post'>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">ID</label>
                                    <p>
                                        {
                                            id
                                        }
                                    </p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Nombres</label>
                                    <input type="text" className="form-control" id="inputCity" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Apellidos</label>
                                    <input type="text" className="form-control" id="inputCity" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Direccion</label>
                                    <input type="text" className="form-control" id="inputCity" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Telefono</label>
                                    <input type="text" className="form-control" id="inputCity" onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Email</label>
                                    <input type="email" className="form-control" id="inputCity" onChange={handleChange} />
                                </div>
                            </div>
                            <br>
                            </br>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>Actualizar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>




    );

}
