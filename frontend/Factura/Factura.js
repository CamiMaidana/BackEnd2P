//import { Cabecera } from "../../src/models/models";

document.addEventListener('DOMContentLoaded', async () =>  {
    const mesaSelect = document.getElementById('mesaSelect');
  
    try {
      const response = await fetch('http://localhost:3000/mesas');
      const data = await response.json();
  
      if (response.ok) {
        for (const mesas of data) {
          const option = document.createElement('option');
          option.value = mesas.id;
          option.textContent = mesas.nombre;
          mesaSelect.appendChild(option);
        }
      } else {
        console.error('Error al cargar los restaurantes');
      }
    } catch (error) {
      console.error('Error al realizar la petición', error);
    }

   
    const clienteSelect = document.getElementById('clienteSelect');
 
    try {
        const response = await fetch('http://localhost:3000/cliente');
        const data = await response.json();
    
        if (response.ok) {
          for (const clientes of data) {
            const option = document.createElement('option');
            option.value = clientes.id;
            option.textContent = clientes.nombre;
            clienteSelect.appendChild(option);
          }
        } else {
          console.error('Error al cargar los restaurantes');
        }
      } catch (error) {
        console.error('Error al realizar la petición', error);
    }

    // Obtener elementos del DOM
    
    const mesaDetails = document.getElementById('mesaDetails');
    const mesaId = document.getElementById('mesaId');
    const totalActual = document.getElementById('totalActual');
    const clienteAsociado = document.getElementById('clienteAsociado');
    
    const agregarClienteBtn = document.getElementById('agregarClienteBtn');
    const productoInput = document.getElementById('productoInput');
    const precioInput = document.getElementById('precioInput');
    const agregarDetalleBtn = document.getElementById('agregarDetalleBtn');
    const cerrarMesaBtn = document.getElementById('cerrarMesaBtn');
    
    // Obtener referencia al elemento donde se mostrará el total
    const totalActualElement = document.getElementById('totalActual');

// Realizar una petición HTTP para obtener los datos de la cabecera desde http://localhost:3000/cabecera
    /*fetch('http://localhost:3000/cabecera')
        .then(response => response.json())
        .then(data => {
    // Obtener el total consumido de los datos recibidos
            const cabecera = data[0]; // Suponiendo que recibimos un único objeto de cabecera
            const totalConsumido = cabecera.total;

    // Mostrar el total consumido en el elemento correspondiente
            totalActualElement.textContent = totalConsumido;
        })
    .catch(error => {
        console.error('Error al obtener los datos de la cabecera:', error);
    });*/
    mesaSelect.addEventListener('change', async () => {
        const selectedMesaId = mesaSelect.value;
        console.log('Mesa Seleccionada', selectedMesaId);
        
        try {
          const response = await fetch(`http://localhost:3000/cabecera?idmesa=${selectedMesaId}`);
          const data = await response.json();
    
          if (response.ok && data.length > 0) {
            const cabecera = data[0];
            const totalConsumido = cabecera.total;
            totalActualElement.textContent = totalConsumido;
          } else {
            totalActualElement.textContent = 'N/A';
            console.error('No se encontraron datos de cabecera para la mesa seleccionada');
          }
        } catch (error) {
          totalActualElement.textContent = 'N/A';
          console.error('Error al obtener los datos de la cabecera:', error);
        }
      });
    

    // Obtener referencia al elemento donde se mostrará el cliente asociado
const clienteAsociadoElement = document.getElementById('clienteAsociado');

// Realizar una petición HTTP para obtener los datos de la cabecera desde http://localhost:3000/cabecera
    fetch('http://localhost:3000/cabecera')
        .then(response => response.json())
        .then(data => {
    // Obtener el ID del cliente asociado de los datos recibidos
        const cabecera = data[0]; // Suponiendo que recibimos un único objeto de cabecera
        const clienteId = cabecera.idcliente;

    // Realizar una nueva petición HTTP para obtener los datos del cliente desde http://localhost:3000/cliente
        return fetch(`http://localhost:3000/cliente/${clienteId}`);
    })
        .then(response => response.json())
        .then(cliente => {
    // Obtener el nombre completo del cliente
        const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`;

    // Mostrar el nombre completo del cliente en el elemento correspondiente
        clienteAsociadoElement.textContent = nombreCompleto;
    })
    .catch(error => {
        console.error('Error al obtener los datos del cliente:');//, error);
    });

    // Función para agregar un nuevo cliente a la mesa
    agregarClienteBtn.addEventListener('click', function() {
        const nuevoCliente = prompt('Ingrese el nombre del nuevo cliente:');
        if (nuevoCliente) {
            const selectedMesa = mesas.find(mesa => mesa.Id == mesaSelect.value);
            selectedMesa.cliente = nuevoCliente;
            clienteAsociado.textContent = nuevoCliente;
            agregarClienteBtn.style.display = 'block';
        }
    });

    // Función para agregar un nuevo detalle de consumo
    agregarDetalleBtn.addEventListener('click', function() {
        const producto = productoInput.value;
        const precio = parseFloat(precioInput.value);
        if (producto && precio) {
            const selectedMesa = cabecera.find(mesa => mesa.Id == mesaSelect.value);
            selectedMesa.total = (selectedMesa.total || 0) + precio;
            totalActual.textContent = selectedMesa.totalActual;
            productoInput.value = '';
            precioInput.value = '';
        }
    });

    /*/ Función para cerrar una mesa ocupada
    cerrarMesaBtn.addEventListener('click', function() {
        const selectedMesa = mesas.find(mesa => mesa.Id == mesaSelect.value);
        selectedMesa.ocupada = false;

        // Generar factura en formato PDF
        const fecha = new Date().toLocaleDateString();
        const cliente = selectedMesa.cliente;
        const detalles = `Detalles de consumo:\n${productoInput.value} - ${precioInput.value}\n`;
        const total = selectedMesa.totalActual;
        const factura = `Fecha: ${fecha}\nCliente: ${cliente}\n${detalles}\nTotal: ${total}`;

        // Simulación de impresión en PDF
        console.log(factura);

        // Reiniciar la interfaz
        mesaDetails.style.display = 'none';
        cerrarMesaBtn.style.display = 'none';
        mesaSelect.value = '';
        productoInput.value = '';
        precioInput.value = '';
    });*/
});
