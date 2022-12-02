import axios from 'axios';
import React, { useState } from 'react'

export default function CrearCliente() {

    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    const clientApiPost = async () => {
        let formData = new FormData();
        formData.append("nombres", nombres);
        formData.append("apellidos", apellidos);
        formData.append("direccion", direccion);
        formData.append("telefono", telefono);
        formData.append("email", email);

        fetch("https://localhost:7008/api/Cliente", {
            method: 'POST',
            body: formData
        }).then(res => {
            res.ok ? alert('Cliente creado satisfactoriamente!') : alert('Error al crear el cliente!');
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombres !== "" && apellidos !== "" && direccion !== "" && telefono !== "" && email !== "") {
            clientApiPost();

            setNombres("");
            setApellidos("");
            setDireccion("");
            setTelefono("");
            setEmail("");
        } else {
            alert("Favor, complete todos los campos.");
        }
    }

    return (
        <form action='post'>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Nombres</label>
                    <input type="text" className="form-control" id="inputCity" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Apellidos</label>
                    <input type="text" className="form-control" id="inputCity" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">Direccion</label>
                    <input type="text" className="form-control" id="inputAddress" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Telefono</label>
                <input type="text" className="form-control" id="inputAddress" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br>
            </br>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Crear</button>
        </form>
    )
}
