document.addEventListener('DOMContentLoaded', async () => {
    const selectRestaurante = document.getElementById('restaurante');
  
    try {
      const response = await fetch('http://localhost:3000/restaurante');
      const data = await response.json();
  
      if (response.ok) {
        for (const restaurante of data) {
          const option = document.createElement('option');
          option.value = restaurante.id;
          option.textContent = restaurante.nombre;
          selectRestaurante.appendChild(option);
        }
      } else {
        console.error('Error al cargar los restaurantes');
      }
    } catch (error) {
      console.error('Error al realizar la petición', error);
    }
  });
  
  async function listarMesasDisponibles() {
    const selectRestaurante = document.getElementById('restaurante');
    const fecha = document.getElementById('fecha').value;
    const horarios = Array.from(document.getElementById('horarios').selectedOptions).map(option => option.value);
    const capacidad = document.getElementById('capacidad').value;
  
    try {
      const url = `http://localhost:3000/mesas?restaurante=${selectRestaurante.value}&fecha=${fecha}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        const mesasBody = document.getElementById('mesasBody');
        mesasBody.innerHTML = '';
  
        for (const mesa of data) {
          const { id, nombre, capacidad } = mesa;
  
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${nombre}</td>
            <td>${capacidad}</td>
            <td>
              <input type="radio" name="mesa" value="${id}">
            </td>
          `;
  
          mesasBody.appendChild(row);
        }
      } else {
        console.error('Error al cargar las mesas disponibles');
      }
    } catch (error) {
      console.error('Error al realizar la petición', error);
    }
  }
  
  async function reservarMesa() {
    const selectRestaurante = document.getElementById('restaurante');
    const fecha = document.getElementById('fecha').value;
    const horarios = Array.from(document.getElementById('horarios').selectedOptions).map(option => option.value);
    const capacidad = document.getElementById('capacidad').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const apellidoCliente = document.getElementById('apellidoCliente').value;
    const cedulaCliente = document.getElementById('cedulaCliente').value;
  
    const mesaRadio = document.querySelector('input[name="mesa"]:checked');
    if (!mesaRadio) {
      console.error('No se ha seleccionado una mesa');
      return;
    }
  
    const idMesa = mesaRadio.value;

    const response = await fetch('http://localhost:3000/cliente');
    const listaClientes = await response.json()
    let existe = listaClientes.find(element => {
        if (element.cedula === cedulaCliente) {
            return true;
        }
    });

    if (existe == undefined) {
        const response = await fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombreCliente,
          apellido: apellidoCliente,
          cedula: cedulaCliente
        })
      });
      existe = await response.json();
    }
    try {
  
      const reservas = [];
      for (const horario of horarios) {
        const [inicio, fin] = horario.split('-');
        reservas.push({
          idRestaurante: selectRestaurante.value,
          idMesa,
          fecha,
          horario: `${inicio}-${fin}`,
          idCliente: existe.id,
          capacidad
        });
      }
  
      for (const reserva of reservas) {
        const response = await fetch('http://localhost:3000/reservas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reserva)
        });
  
        if (!response.ok) {
          console.error('Error al realizar la reserva');
        }
      }
  
      console.log('Reservas realizadas exitosamente');
    } catch (error) {
      console.error('Error al realizar la petición', error);
    }
  }
  
  const formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', event => {
    event.preventDefault();
    listarMesasDisponibles();
  });
  
