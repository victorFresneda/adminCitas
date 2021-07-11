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

   agregarCita(cita){
       this.citas = [...this.citas, cita];
       console.log(this.citas);
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

    imprimirCitas({citas}){


        this.limpiarHTML();
        
        
        
        
        citas.forEach(cita => {


        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;



        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;


        //Scripting de los elementos de la cita 

        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario: </span> ${propietario}
        `;

        
        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span> ${telefono}
        `;
        
        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha: </span> ${fecha}
        `;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora: </span> ${hora}
        `;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
        `;

        
        


        //Agregar los parrafos a divCita 
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);

        //Agregar citas al HTML
        contenedorCitas.appendChild(divCita);

            
        });
        
        


    }


    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
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

    //Generar un id unico

    citaObj.id = Date.now();

    // Creando nueva cita 

    administrarCitas.agregarCita({...citaObj});

    //Reinicia objeto para la validacion 

    reiniciarObjeto();

    //Reiniciar el formulario 

    formulario.reset();

    //Mostrar el HTML en las citas 

    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto(){
    citaObj. mascota = '';
    citaObj. propietario = '';
    citaObj. telefono = '';
    citaObj. fecha = '';
    citaObj. hora = '';
    citaObj. sintomas = '';
}


