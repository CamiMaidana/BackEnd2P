
const API_URL = "http://localhost:3000/Cliente"//URL DE LA API

/*const tablabody = document.getElementById("tabla-body");
const editFormulario = document.getElementById("editform");//divdelformularioEditar
const editarFormulario = editFormulario.querySelector("formulario");
const addForm = document.querySelector("formulario");*
const btnAgregar = document.querySelector('#btnAgregar')
const addForm = document.querySelector('#addForm')
const respuesta = document.querySelector('#respuesta')
const tablabody = document.getElementById("tabla-body");

const getCliente = () => {
    const datos = new FormData(addForm);
    const datosprocesados = Object.fromEntries(datos.entries());
    addForm.reset();
    return datosprocesados;
}

/*Funcion para colocar los datos en el Servidor 

const postCliente = async () => {
     const Cliente = getData();/*Crea un objeto con la informacion del formulario
     try{
            const response = await fetch('http://localhost:3000/Cliente', {
                method: 'POST', /*especifica el metodo que se va a usar
                    headers: {
                        'Content-Type': 'application/json' /*especifica el tipo de informacion (JSON)*
                    },  
                body: JSON.stringify(Cliente)/*coloca la informacion en el formato JSON *
            })
        if(response.ok){
            const jsonResponse = await response.json();
    
            /* Codigo a ejecutarse con la respuesta
    
            const {nombre, direccion} = jsonResponse;
    
            respuesta.innerHTML = 
            `<tr>  
              <td>${nombre}</td> 
              <td>${direccion}</td>
            </tr>`
           
        }
       
       }catch(error){
         console.log(error);
       }
       
    }



btnAgregar.addEventListener('click', (event) => {
    event.preventDefault();
    postCliente();
    
  })*/