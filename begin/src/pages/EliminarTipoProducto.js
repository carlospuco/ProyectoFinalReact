import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function EliminarTipoProducto() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    RefreshListTipoProducto();
  }, [])

  function RefreshListTipoProducto() {
    const getApiTipoProducto = async () => {
      const apiTipoProductos = await tipoProductoApiCall();
      apiTipoProductos != null && setTipoProductos(apiTipoProductos);
    }
    getApiTipoProducto();
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://localhost:7008/api/TipoProducto/${id}`);
      alert("El Producto se Borro de forma existosa");
      setShow(false);
      RefreshListTipoProducto();
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
                  <td> <button type="submit" className="btn btn-danger" onClick={() => {
                    setId(tipoProducto.id);
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
              <Modal.Title>Borrar Tipo Producto</Modal.Title>
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
                Cancelar
              </Button>
              <Button variant="primary" className="btn btn-danger" onClick={() => { deleteProduct(id) 
                RefreshListTipoProducto() 
                }}>Borrar</Button>
            </Modal.Footer>
          </Modal>
        </>
      </table>
    </div>
  )
}
