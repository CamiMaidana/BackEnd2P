//fetch
//document.getElementById
/*
const API_URL = "http://localhost:3000/Restaurante"


const tablabody = document.getElementById("tabla-body")

async function mostrarTabla(){
    const Restaurantes = await obtenerRestaurantes()
    tablabody.innerHTML = ""
    Restaurantes.forEach(element => {
        const fila = crearFilaRestaurante(element)
        tablabody.appendChild(fila)
    });
}

async function obtenerRestaurantes(){
    try {
        const response = await fetch(API_URL)
        const restaurantes = await response.json()
        return(restaurantes)
    } catch (error) {
        console.error(error)
    }
}

function crearFilaRestaurante(Restaurante){
    const fila = document.createElement("tr")
    
    const id = document.createElement("td")
    id.textContent = Restaurante.id
    fila.appendChild(id)

    const nombre = document.createElement("td")
    nombre.textContent = Restaurante.nombre
    fila.appendChild(nombre)

    const direccion = document.createElement("td")
    direccion.textContent = Restaurante.direccion
    fila.appendChild(direccion)
    return fila
}

mostrarTabla()*/
// Obtener una referencia al formulario

// Obtener una referencia al formulario
const formulario = document.getElementById('formulario');

// Escuchar el evento submit del formulario
formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir la acción por defecto del formulario

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombreRestaurante').value;
    const direccion = document.getElementById('direccionRestaurante').value;

    try {
        // Enviar la solicitud POST al backend
        const response = await fetch('http://localhost:3000/restaurante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, direccion })
        });

        if (response.ok) {
            // El restaurante se agregó exitosamente
            const restaurante = await response.json();
            console.log('Restaurante agregado:', restaurante);
            formulario.reset();
        } else {
            // Ocurrió un error al agregar el restaurante
            console.error('Error al agregar el restaurante');
        }
    } catch (error) {
        console.error(error);
    }
});

// Obtén una referencia al tbody de la tabla
const tablaBody = document.getElementById('tabla-body');

// Función para cargar la tabla con los datos de los restaurantes
const cargarTablaRestaurantes = async () => {
    try {
        // Realiza una solicitud GET para obtener los datos de los restaurantes desde el backend
        const response = await fetch('http://localhost:3000/restaurante');
        const data = await response.json();

        // Limpia el contenido actual del tbody
        tablaBody.innerHTML = '';

        // Recorre los datos de los restaurantes y crea las filas de la tabla
        data.forEach(restaurante => {
            const fila = document.createElement('tr');

            // Crea las celdas de la fila con los datos del restaurante
            const celdaId = document.createElement('td');
            celdaId.textContent = restaurante.id;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = restaurante.nombre;
            fila.appendChild(celdaNombre);

            const celdaDireccion = document.createElement('td');
            celdaDireccion.textContent = restaurante.direccion;
            fila.appendChild(celdaDireccion);

            const celdaAcciones = document.createElement('td');
            // Agrega cualquier lógica adicional para las acciones (botones, enlaces, etc.)
            // Aquí puedes agregar botones para editar o eliminar el restaurante si lo deseas
            fila.appendChild(celdaAcciones);

            // Agrega la fila a la tabla
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
    }
};

// Llama a la función para cargar la tabla al cargar la página
window.addEventListener('DOMContentLoaded', cargarTablaRestaurantes);

