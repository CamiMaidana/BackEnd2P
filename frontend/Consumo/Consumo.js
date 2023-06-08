//import { Cabecera } from "../../src/models/models";
function agregarCabecera() {
    var idmesa = document.getElementById('idmesa').value;
    var idcliente = document.getElementById('idcliente').value;
    var estado = document.getElementById('estado').value;
    var total = document.getElementById('total').value;
  
    // Realizar la lógica para agregar la cabecera al backend usando JavaScript o realizar una petición AJAX al servidor.
    // Puedes utilizar la función fetch para realizar una solicitud POST al servidor y enviar los datos en formato JSON.
    // Ejemplo:
    fetch('http://localhost:3000/cabecera', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idmesa: idmesa, 
        idcliente: idcliente,
        estado: estado,
        total: total
      })
    })
    .then(function(response) {
      if (response.ok) {
        console.log("idmesA",idmesa);
        console.log('Cabecera agregada exitosamente');
        // Realizar las acciones necesarias después de agregar la cabecera, como limpiar el formulario o actualizar la interfaz.
      } else {
        console.error('Error al agregar la cabecera');
      }
    })
    .catch(function(error) {
      console.error('Error al realizar la petición', error);
    });
  }
  
  function agregarDetalle() {
    var idcabecera = document.getElementById('idcabecera').value;
    var idproducto = document.getElementById('idproducto').value;
    var cantidad = document.getElementById('cantidad').value;
    console.log('idcabecera',idcabecera);
    console.log('idproducto',idproducto);
    console.log('cantidad',cantidad);
  
    // Realizar la lógica para agregar el detalle al backend usando JavaScript o realizar una petición AJAX al servidor.
    // Puedes utilizar la función fetch para realizar una solicitud POST al servidor y enviar los datos en formato JSON.
    // Ejemplo:
    fetch('http://localhost:3000/detalles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idcabecera: idcabecera,
        idproducto: idproducto,
        cantidad: cantidad
      })
    })
    .then(function(response) {
      if (response.ok) {
        console.log('Detalle agregado exitosamente');
        // Realizar las acciones necesarias después de agregar el detalle, como limpiar el formulario o actualizar la interfaz.
      } else {
        console.error('Error al agregar el detalle');
      }
    })
    .catch(function(error) {
      console.error('Error al realizar la petición', error);
    });
  }
  