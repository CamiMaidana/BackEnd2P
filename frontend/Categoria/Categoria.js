//import { Categoria } from "../../src/models/models";

const tablaBody = document.getElementById('tabla-body');

// Función para cargar la tabla con los datos de las Categorias
const cargarTablaCategoria = async () => {
    try {
        // Realiza una solicitud GET para obtener los datos de las Categoria desde el backend
        const response = await fetch('http://localhost:3000/categoria');
        const data = await response.json();

        // Limpia el contenido actual del tbody
        tablaBody.innerHTML = '';

        // Recorre los datos de las Categoria y crea las filas de la tabla
        data.forEach(Categoria => {
            const fila = document.createElement('tr');

            // Crea las celdas de la fila con los datos de la Categoria
            const celdaId = document.createElement('td');
            celdaId.textContent = Categoria.id;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = Categoria.nombre;
            fila.appendChild(celdaNombre);

            const celdaAcciones = document.createElement('td');
            // Agrega cualquier lógica adicional para las acciones (botones, enlaces, etc.)
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarCategoria(Categoria.id));
            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);

            // Agrega la fila a la tabla
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
    }
};

// Función para enviar una solicitud DELETE al backend y eliminar una Categoria por su ID
const eliminarCategoria = async (idCategoria) => {
    try {
        const response = await fetch(`http://localhost:3000/categoria/${idCategoria}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Actualiza la tabla después de eliminar la Categoria
            cargarTablaCategoria();
        } else {
            console.error('Error al eliminar la Categoria');
        }
    } catch (error) {
        console.error(error);
    }
};

// Función para enviar una solicitud POST al backend y agregar una nueva Categoria
const agregarCategoria = async (event) => {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById('nombreCategoria').value;

    // Crea un objeto con los datos de la nueva Categoria
    const nuevaCategoria = {
        nombre
    };

    try {
        const response = await fetch('http://localhost:3000/categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaCategoria)
        });

        if (response.ok) {
            // Actualiza la tabla después de agregar la nueva Categoria
            cargarTablaCategoria();
            // Restablece los valores del formulario
            document.getElementById('formulario').reset();
        } else {
            console.error('Error al agregar la Categoria');
        }
    } catch (error) {
        console.error(error);
    }
};

// Registra el evento submit en el formulario para agregar una nueva Categoria
document.getElementById('formulario').addEventListener('submit', agregarCategoria);

// Carga la tabla con los datos de las Categoria al cargar la página
cargarTablaCategoria();
