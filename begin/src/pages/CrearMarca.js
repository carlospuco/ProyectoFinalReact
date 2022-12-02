import axios from 'axios';
import React, { useState } from 'react'
export default function CrearMarca() {

    const [nombres, setNombres] = useState("");
    const [ids, setIds] = useState("");

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
        }
    })

    const marcaApiPost = async () => {
        let formData = new FormData();
        formData.append("id", ids);
        formData.append("nombre", nombres);
        
        

        fetch("https://localhost:7008/api/Marcas", {
            method: 'POST',
            body: formData
        }).then(res => {
            res.ok ? alert('Marca creado satisfactoriamente!') : alert('Error al crear la marca!');
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombres !== "" && ids !== "") {
            marcaApiPost();
            setIds("");
            setNombres("");
        } else {
            alert("Favor, complete todos los campos.");
        }
    }

    return (
        <form action='post'>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">ID</label>
                    <input type="text" className="form-control" id="inputCity" value={ids} onChange={(e) => setIds(e.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Marca</label>
                    <input type="text" className="form-control" id="inputCity" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                </div>
            </div>
            <br>
            </br>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Crear</button>
        </form>
    )
}
