import { useEffect, useState } from 'react'
import axios from 'axios'
export default function CrearTipoProducto() {
    const [descripciones, setDescripciones] = useState("");
    const [ids, setIds] = useState("");

    const backend = axios.create({
        baseURL: 'https://localhost:7008',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
        }
    })

    const tipoProductosApiPost = async () => {
        let formData = new FormData();
        formData.append("id", ids);
        formData.append("descripcion", descripciones);
        
        

        fetch("https://localhost:7008/api/TipoProducto", {
            method: 'POST',
            body: formData
        }).then(res => {
            res.ok ? alert('Tipo Producto creado satisfactoriamente!') : alert('Error al crear el Tipo Producto!');
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (descripciones !== "" && ids !== "") {
            tipoProductosApiPost();
            setIds("");
            setDescripciones("");
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
                    <label htmlFor="inputCity">Tipo Producto</label>
                    <input type="text" className="form-control" id="inputCity" value={descripciones} onChange={(e) => setDescripciones(e.target.value)} />
                </div>
            </div>
            <br>
            </br>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Crear</button>
        </form>
    )
}
