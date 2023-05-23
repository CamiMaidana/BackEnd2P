// Mesas.js

// Obtén una referencia al tbody de la tabla
const tablaBody = document.getElementById('tabla-body');

// Función para cargar la tabla con los datos de las mesas
const cargarTablaMesas = async () => {
    try {
        // Realiza una solicitud GET para obtener los datos de las mesas desde el backend
        const response = await fetch('http://localhost:3000/mesas');
        const data = await response.json();

        // Limpia el contenido actual del tbody
        tablaBody.innerHTML = '';

        // Recorre los datos de las mesas y crea las filas de la tabla
        data.forEach(mesa => {
            const fila = document.createElement('tr');

            // Crea las celdas de la fila con los datos de la mesa
            const celdaId = document.createElement('td');
            celdaId.textContent = mesa.id;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = mesa.nombre;
            fila.appendChild(celdaNombre);

            const celdaIdRestaurante = document.createElement('td');
            celdaIdRestaurante.textContent = mesa.idRestaurante;
            fila.appendChild(celdaIdRestaurante);

            const celdaPosicionX = document.createElement('td');
            celdaPosicionX.textContent = mesa.posicionX;
            fila.appendChild(celdaPosicionX);

            const celdaPosicionY = document.createElement('td');
            celdaPosicionY.textContent = mesa.posicionY;
            fila.appendChild(celdaPosicionY);

            const celdaPiso = document.createElement('td');
            celdaPiso.textContent = mesa.piso;
            fila.appendChild(celdaPiso);

            const celdaCapacidad = document.createElement('td');
            celdaCapacidad.textContent = mesa.capacidad;
            fila.appendChild(celdaCapacidad);

            const celdaAcciones = document.createElement('td');
            // Agrega cualquier lógica adicional para las acciones (botones, enlaces, etc.)
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarMesa(mesa.id));
            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);

            // Agrega la fila a la tabla
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
    }
};

// Función para enviar una solicitud DELETE al backend y eliminar una mesa por su ID
const eliminarMesa = async (idMesa) => {
    try {
        const response = await fetch(`http://localhost:3000/mesas/${idMesa}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Actualiza la tabla después de eliminar la mesa
            cargarTablaMesas();
        } else {
            console.error('Error al eliminar la mesa');
        }
    } catch (error) {
        console.error(error);
    }
};

// Función para enviar una solicitud POST al backend y agregar una nueva mesa
const agregarMesa = async (event) => {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById('nombreMesa').value;
    const idRestaurante = document.getElementById('idRestaurante').value;
    const posicionX = document.getElementById('posicionX').value;
    const posicionY = document.getElementById('posicionY').value;
    const piso = document.getElementById('piso').value;
    const capacidad = document.getElementById('capacidad').value;

    // Crea un objeto con los datos de la nueva mesa
    const nuevaMesa = {
        nombre,
        idRestaurante,
        posicionX,
        posicionY,
        piso,
        capacidad
    };

    try {
        const response = await fetch('http://localhost:3000/mesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaMesa)
        });

        if (response.ok) {
            // Actualiza la tabla después de agregar la nueva mesa
            cargarTablaMesas();
            // Restablece los valores del formulario
            document.getElementById('formulario').reset();
        } else {
            console.error('Error al agregar la mesa');
        }
    } catch (error) {
        console.error(error);
    }
};

// Registra el evento submit en el formulario para agregar una nueva mesa
document.getElementById('formulario').addEventListener('submit', agregarMesa);

// Carga la tabla con los datos de las mesas al cargar la página
cargarTablaMesas();
