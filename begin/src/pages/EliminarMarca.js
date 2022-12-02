import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


export default function EliminarMarca() {
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [marcas, setMarcas] = useState([]);

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
    })

    const marcaApiCall = async () => {
        const response = await backend.get('/api/Marcas');
        return response.status === 200 ? response.data : null;
    }

    useEffect(() => {
        RefreshListMarcas();
    }, [])

    function RefreshListMarcas() {
        const getApiMarcas = async () => {
            const apiMarcas = await marcaApiCall();
            apiMarcas != null && setMarcas(apiMarcas);
        }
        getApiMarcas();
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://localhost:7008/api/Marcas/${id}`);
            alert("El Producto se Borro de forma existosa");
            setShow(false);
            RefreshListMarcas();
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
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {
                            marcas.map((marca) => (
                                <tr key={marca['id']}>
                                    <th scope="row">{marca.id}</th>
                                    <td>{marca.nombre}</td>
                                    <td> <button type="submit" className="btn btn-danger" onClick={() => {
                                        setId(marca.id);
                                        handleShow()
                                    }} >Borrar</button></td>
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
                        <Modal.Title>Borar Marca</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action='post'>
                            <div className="form-row">
                                Esta seguro de Borrar el Elmento
                            </div>
                            <br>
                            </br>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" class="btn btn-info" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" className="btn btn-danger" onClick={() => {
                            deleteProduct(id)
                            RefreshListMarcas();
                        }}>Borrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>

    );
}
