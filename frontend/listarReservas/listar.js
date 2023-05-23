// Función para cargar los datos de reservas desde el API y mostrarlos en la tabla, ordenados y filtrados
function cargarReservas() {
    const reservasBody = document.getElementById('reservas-body');
    reservasBody.innerHTML = '';
  
    // Obtener los valores de los campos de filtrado
    const restauranteFiltro = document.getElementById('restaurante-filtro').value.toLowerCase();
    const fechaFiltro = document.getElementById('fecha-filtro').value.toLowerCase();
    const clienteFiltro = document.getElementById('cliente-filtro').value.toLowerCase();
  
    // Realizar una solicitud HTTP GET al API para obtener los datos de reservas
    fetch('http://localhost:3000/reservas')
      .then(response => response.json())
      .then(data => {
        // Ordenar los datos por horario y luego por mesaid
        data.sort((a, b) => {
            if (a.fecha !== b.fecha) {
                return a.fecha.localeCompare(b.fecha);
              } else if (a.horario !== b.horario) {
                return a.horario.localeCompare(b.horario);
              } else {
                return a.idMesa - b.idMesa;
              }
        });
  
        // Filtrar los datos según los valores ingresados en los campos de filtrado
        let datosFiltrados = data.filter(reserva =>
          (reserva.idRestaurante == Number(restauranteFiltro) || restauranteFiltro == '') &&
            (reserva.fecha.toLowerCase().includes(fechaFiltro) || fechaFiltro == '') &&
        (reserva.idCliente == Number(clienteFiltro) || clienteFiltro == '')
        );
  
        // Recorrer los datos filtrados y agregar filas a la tabla
        for (const reserva of datosFiltrados) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${reserva.id}</td>
            <td>${reserva.idRestaurante}</td>
            <td>${reserva.idMesa}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.horario}</td>
            <td>${reserva.idCliente}</td>
            <td>${reserva.capacidad}</td>
            <td>${reserva.createdAt}</td>
            <td>${reserva.updatedAt}</td>
          `;
          reservasBody.appendChild(row);
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos de reservas:', error);
      });
  }
  
  // Llama a la función para cargar los datos de reservas cuando la página se carga
  window.addEventListener('load', cargarReservas);
  
  // Agregar event listeners a los campos de filtrado
  document.getElementById('restaurante-filtro').addEventListener('input', cargarReservas);
  document.getElementById('fecha-filtro').addEventListener('input', cargarReservas);
  document.getElementById('cliente-filtro').addEventListener('input', cargarReservas);
  