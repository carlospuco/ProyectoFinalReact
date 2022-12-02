import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function ActualizarTipoProducto() {

    const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    const [ids, setIds] = useState("");
    const [tipoProductoInput, setTipoProductoInput] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tipoProductos, setTipoProductos] = useState([]);

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
    })

    const tipoProductoApiCall = async () => {
        const response = await backend.get('/api/TipoProducto');
        return response.status === 200 ? response.data : null;
    }

    useEffect(() => {
        RefreshListTipoProducto()
    }, [])

    function RefreshListTipoProducto() {
        const getApiTipoProductos = async () => {
            const apiTipoProductos = await tipoProductoApiCall();
            apiTipoProductos != null && setTipoProductos(apiTipoProductos);
        }
        getApiTipoProductos();
    }


    const tipoProductoApiPut = async () => {
        let formData = new FormData();
        formData.append("id", ids);
        formData.append("descripcion", tipoProductoInput);

        fetch(`https://localhost:7008/api/TipoProducto/${id}`, {
            method: 'PUT',
            body: formData
        }).then(res => {
            res.ok ? alert('Tipo Producto modificada satisfactoriamente!') : alert('Error al modificar la Tipo Productos!');
            RefreshListTipoProducto()
            setShow(false);
        });

    }

    const handleUpdate = () => {
        tipoProductoApiPut();

        setTipoProductoInput("");
        setId("");
    }

    const handleChange = (event) => {
        setTipoProductoInput(event.target.value)
        setIds(event.target.value)
    }

    return (
        <div className="table table-responsive table-striped">
            <table className="table" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {
                            tipoProductos.map((tipoProducto) => (
                                <tr key={tipoProducto['id']}>
                                    <th id="idFila" scope="row">{tipoProducto.id}</th>
                                    <td>{tipoProducto.descripcion}</td>
                                    <td> <button type="submit" className="btn btn-primary" onClick={() => {
                                        setId(tipoProducto.id)
                                        handleShow()
                                    }} >Actualizar Marca</button></td>
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
                        <Modal.Title>Actulizar Marca</Modal.Title>
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
                                    <label htmlFor="inputCity">Tipo Producto</label>
                                    <input type="text" className="form-control" id="inputCity" onChange={handleChange} />
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
                        <Button variant="primary" onClick={()=>{handleUpdate()
                        RefreshListTipoProducto()}}>Actualizar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>




    );
}
