//INPUTS de los campos del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');


const contenedorCitas = document.querySelector('#citas');


class Citas {
   constructor(){
       this.citas = [];
   }

}


class UI {

    
    imprimirAlerta(mensaje, tipo){
     //Crear el div
     const divMensaje = document.createElement('div');
     divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');


     //Agregar clase al tipo de error 

     if(tipo === 'error'){
         divMensaje.classList.add('alert-danger');
     }else{
        divMensaje.classList.add('alert-success');
     }

     // Mensaje de error 

     divMensaje.textContent = mensaje;

     //Agregar al DOM

     document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

     //Quitar la alerta despues de 3 segundos

     setInterval(() => {
         divMensaje.remove();
     }, 3000);

    }
     


}


//Se instancian las clases 

const ui = new UI();
const administrarCitas = new Citas();

//Registra eventos
eventListeners();
function eventListeners(){
     mascotaInput.addEventListener('input', datosCita)
     propietarioInput.addEventListener('input', datosCita)
     telefonoInput.addEventListener('input', datosCita)
     fechaInput.addEventListener('input', datosCita)
     horaInput.addEventListener('input', datosCita)
     sintomasInput.addEventListener('input', datosCita)


     formulario.addEventListener('submit', nuevaCita);
}

//Odjeto con la informacion de la cita 
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}

//Funciones que agrega datos al bjeto de citas  

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj)
}

//Valida y agrega una nueva cita a la clase de citas 

function nuevaCita(e) {
    e.preventDefault();
    

    //Extraer la informacion del objeto de cita 

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Se validan los campos 

    if (mascota === '' ||  propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

}

