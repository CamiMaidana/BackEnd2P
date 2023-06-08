// Obtén una referencia a los elementos HTML necesarios
const clientesTable = document.getElementById('clientes-table');
const clientesBody = document.getElementById('clientes-body');
const clienteForm = document.getElementById('cliente-form');

// Variable para almacenar los clientes existentes
let clientes = [];

// Función para cargar la tabla con los datos de los clientes
const cargarTablaClientes = async () => {
    try {
        // Realiza una solicitud GET para obtener los datos de los clientes desde el backend
        const response = await fetch('http://localhost:3000/cliente');
        const data = await response.json();

        // Almacena los clientes en la variable
        clientes = data;

        // Limpia el contenido actual del tbody
        clientesBody.innerHTML = '';

        // Recorre los datos de los clientes y crea las filas de la tabla
        clientes.forEach(cliente => {
            const fila = document.createElement('tr');

            // Crea las celdas de la fila con los datos del cliente
            const celdaId = document.createElement('td');
            celdaId.textContent = cliente.id;
            fila.appendChild(celdaId);

            const celdaCedula = document.createElement('td');
            celdaCedula.textContent = cliente.cedula;
            fila.appendChild(celdaCedula);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = cliente.nombre;
            fila.appendChild(celdaNombre);

            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = cliente.apellido;
            fila.appendChild(celdaApellido);

            const celdaAcciones = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarRestaurante(cliente.id));
            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);

            // Agrega la fila a la tabla
            clientesBody.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
    }
};

// Función para verificar si un cliente con la misma cédula ya existe
const validarClienteExistente = (cedula) => {
    return clientes.some(cliente => cliente.cedula === cedula);
};

// Función para enviar los datos del formulario y agregar un nuevo cliente
const agregarCliente = async (event) => {
    event.preventDefault(); // Prevenir la acción por defecto del formulario

    // Obtener los valores de los campos del formulario
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;

    // Verificar si el cliente ya existe por su cédula
    if (validarClienteExistente(cedula)) {
        console.error('Ya existe un cliente con la misma cédula');
        alert('Ya existe un cliente con la misma cédula');
        return;
    }

    try {
        // Enviar la solicitud POST al backend para agregar un nuevo cliente
        const response = await fetch('http://localhost:3000/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cedula, nombre, apellido })
        });

        if (response.ok) {
            // El cliente se agregó exitosamente
            const cliente = await response.json();
            console.log('Cliente agregado:', cliente);
            clienteForm.reset(); // Limpiar el formulario
            cargarTablaClientes(); // Actualizar la tabla con los datos actualizados
        } else {
            // Ocurrió un error al agregar el cliente
            console.error('Error al agregar el cliente');
        }
    } catch (error) {
        console.error(error);
    }
};

// Agregar un listener para el evento submit del formulario
clienteForm.addEventListener('submit', agregarCliente);

// Función para eliminar un restaurante según su ID
const eliminarRestaurante = async (clienteId) => {
    try {
        // Realiza una solicitud DELETE al backend para eliminar el restaurante
        const response = await fetch(`http://localhost:3000/cliente/${clienteId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Cliente eliminado:', clienteId);
            cargarTablaClientes(); // Vuelve a cargar la tabla actualizada
        } else {
            console.error('Error al eliminar el cliente');
        }
    } catch (error) {
        console.error(error);
    }
};

// Cargar la tabla de clientes al cargar la página
window.addEventListener('DOMContentLoaded', cargarTablaClientes);
