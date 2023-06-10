// Productos.js

// Obtén una referencia al tbody de la tabla
const tablaBody = document.getElementById('tabla-body');

// Función para cargar la tabla con los datos de las productos
const cargarTablaProductos = async () => {
    try {
        // Realiza una solicitud GET para obtener los datos de las Productos desde el backend
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();

        // Limpia el contenido actual del tbody
        tablaBody.innerHTML = '';

        // Recorre los datos de las productos y crea las filas de la tabla
        data.forEach(producto => {
            const fila = document.createElement('tr');

            // Crea las celdas de la fila con los datos de la producto
            const celdaId = document.createElement('td');
            celdaId.textContent = producto.id;
            fila.appendChild(celdaId);

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = producto.nombre;
            fila.appendChild(celdaNombre);

            const celdaIdCategoria = document.createElement('td');
            celdaIdCategoria.textContent = producto.idcategoria;
            fila.appendChild(celdaIdCategoria);

            const celdaPrecioventa = document.createElement('td');
            celdaPrecioventa.textContent = producto.precioventa;
            fila.appendChild(celdaPrecioventa);


            const celdaAcciones = document.createElement('td');
            // Agrega cualquier lógica adicional para las acciones (botones, enlaces, etc.)
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarProducto(producto.id));
            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);

            // Agrega la fila a la tabla
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
    }
};

// Función para enviar una solicitud DELETE al backend y eliminar una producto por su ID
const eliminarProducto = async (idProducto) => {
    try {
        const response = await fetch(`http://localhost:3000/productos/${idProducto}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Actualiza la tabla después de eliminar la Producto
            cargarTablaProductos();
        } else {
            console.error('Error al eliminar la Producto');
        }
    } catch (error) {
        console.error(error);
    }
};

// Función para enviar una solicitud POST al backend y agregar una nueva Producto
const agregarProducto = async (event) => {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById('nombreProducto').value;
    const idcategoria = document.getElementById('idcategoria').value;
    const precioventa = document.getElementById('precioventa').value;

    // Crea un objeto con los datos de la nueva Producto
    const nuevaProducto = {
        nombre,
        idcategoria,
        precioventa,
    };

    try {
        const response = await fetch('http://localhost:3000/Productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaProducto)
        });

        if (response.ok) {
            // Actualiza la tabla después de agregar la nueva Producto
            cargarTablaProductos();
            // Restablece los valores del formulario
            document.getElementById('formulario').reset();
        } else {
            console.error('Error al agregar la Producto');
        }
    } catch (error) {
        console.error(error);
    }
};

// Registra el evento submit en el formulario para agregar una nueva Producto
document.getElementById('formulario').addEventListener('submit', agregarProducto);

// Carga la tabla con los datos de las Productos al cargar la página
cargarTablaProductos();
