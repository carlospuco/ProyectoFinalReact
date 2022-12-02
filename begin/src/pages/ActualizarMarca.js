
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function ActualizarMarca() {

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [marcaInput, setMarcaInput] = useState("");

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
    RefreshListMarcas()
  }, [])

  function RefreshListMarcas() {
    const getApiMarca = async () => {
      const apiMarcas = await marcaApiCall();
      apiMarcas != null && setMarcas(apiMarcas);
    }
    getApiMarca();
  }


  const marcaApiPut = async () => {
    let formData = new FormData();
    formData.append("nombre", marcaInput);

    fetch(`https://localhost:7008/api/Marcas/${id}`, {
      method: 'PUT',
      body: formData
    }).then(res => {
      res.ok ? alert('Marca modificada satisfactoriamente!') : alert('Error al modificar la Marca!');
      RefreshListMarcas()
      setShow(false);
    });

  }

  const handleUpdate = () => {
    marcaApiPut();

    setMarcaInput("");
    setId("");
  }

  const handleChange = (event) => {
    setMarcaInput(event.target.value)
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
                  <td> <button type="submit" className="btn btn-primary" onClick={() => {
                    setId(marca.id)
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
                  <label htmlFor="inputCity">Marca</label>
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
            <Button variant="primary" onClick={() => {
              handleUpdate()
              RefreshListMarcas()
            }}>Actualizar</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>




  );

}
