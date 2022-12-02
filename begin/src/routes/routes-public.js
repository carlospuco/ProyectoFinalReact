import Cliente from "../pages/Cliente";
import CrearCliente from "../pages/CrearCliente";
import ActualizarMarca from "../pages/ActualizarMarca";
import EliminarTipoProducto from "../pages/EliminarTipoProducto";
import Marca from "../pages/Marca";
import CrearMarca from "../pages/CrearMarca";
import TipoProducto from "../pages/TipoProducto";
import CrearTipoProducto from "../pages/CrearTipoProducto";
import EliminarCliente from "../pages/ElminarCliente";
import EliminarMarca from "../pages/EliminarMarca";
import ActualizarTipoProducto from "../pages/ActualizarTipoProducto";
import ActualizarCliente from "../pages/ActualizarCliente";

export default [
    {
        name: "Cliente",
        key:"cliente",
        route: "/cliente",
        component: <Cliente />,
        showLink:true
    },
    {
        name: "Crear Cliente",
        key:"crearcliente",
        route: "/crearcliente",
        component: <CrearCliente />,
        showLink:true
    },
    {
        name: "Actualizar Cliente",
        key:"actualizarcliente",
        route: "/actualizarcliente",
        component: <ActualizarCliente />,
        showLink:true
    },
    {
        name: "Eliminar Cliente",
        key:"eliminarcliente",
        route: "/eliminarcliente",
        component: <EliminarCliente />,
        showLink:true
    },
    {
        name: "Marca",
        key:"marca",
        route: "/marca",
        component: <Marca />,
        showLink:true
    },
    {
        name: "Crear Marca",
        key:"crearmarca",
        route: "crearmarca",
        component: <CrearMarca />,
        showLink:true
    },
    {
        name: "Actualizar Marca",
        key:"actualizarmarca",
        route: "/actualizarmarca",
        component: <ActualizarMarca />,
        showLink:true
    },
    {
        name: "Eliminar Marca",
        key:"eliminarmarca",
        route: "/eliminarmarca",
        component: <EliminarMarca />,
        showLink:true
    },
    {
        name: "Tipo Producto",
        key:"tipoproducto",
        route: "/tipoproducto",
        component: <TipoProducto />,
        showLink:true
    },
    {
        name: "Crear Tipo Producto",
        key:"creartipoproducto",
        route: "/creartipoproducto",
        component: <CrearTipoProducto />,
        showLink:true
    },
    {
        name: "Actualizar Tipo Producto",
        key:"actualizartipoproducto",
        route: "/actualizartipoproducto",
        component: <ActualizarTipoProducto />,
        showLink:true
    },
    {
        name: "Eliminar Tipo Producto",
        key:"eliminartipoproducto",
        route: "/eliminartipoproducto",
        component: <EliminarTipoProducto />,
        showLink:true
    }
];