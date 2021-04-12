// 2. Primeros Pasos y primer Prototype
// Se tendrá dos objetos la UI y la cotizacion

// Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

        // Crear prototype para seguro. Realiza la cotización con los datos
        // 5. Comenzar el calculo del seguro
Seguro.prototype.cotizarSeguro = function () {
        /*
        1 = Americano 1.15
        2= Asiatico 1.05
        3 = Europeo 1.35
        Se tiene un precio base y basado en las 3 selecciones se incremente el valor
        */
       console.log(this.marca);
       let cantidad;
       const base = 2000;

       switch (this.marca) {
           case '1':
               cantidad = base * 1.15;
               break;
           case '2':
               cantidad = base * 1.05;
               break;
            case '3':
               cantidad = base * 1.35;
               break;
           default:
               break;
       }

        //    Leer el año
       const diferencia = new Date().getFullYear() - this.year;
       
        // Cada año la diferencia es mayor, el costo va a reducir un 3%
       cantidad -= ( (diferencia * 3) * cantidad ) / 100;

        //    console.log(cantidad);
       /*
       Si el seguro es básico se multiplica por un 30% más
       Si el seguro es Completo se multiplica por un 50% más
       */

       if (this.tipo === 'basico') {
           cantidad *= 1.30;
       } else {
           cantidad *= 1.50;
       }
       return cantidad;
}

function UI() {}

// Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

        //   Llenar Select
        const selectYear = document.querySelector('#year');
        for (let i = max; i > min; i--) {
            let optionYear = document.createElement('option');
            optionYear.value = i;
            optionYear.textContent = i;
            selectYear.appendChild(optionYear);
        }
}

// Muestra alertas en pantalla
// 4. Crear un Prototype para mostrar un error
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');        
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // insertar HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// 6. Mostrar el Total a pagar
UI.prototype.mostrarResultado = (seguro, total) => {
    const { marca, year, tipo} = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
    
        case '2':
            textoMarca = 'Asiatico';
            break;
                
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }
    // Crear Resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class="header"> Tu Resumen </p>
    <p class="font-bold"> Marca : <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold"> Año : <span class="font-normal">${year}</span></p>
    <p class="font-bold"> Tipo : <span class="font-normal">${tipo}</span></p>
    <p class="font-bold"> Total: $<span class="font-normal">${total}</span></p>
    `
    const resultadoDiv = document.querySelector('#resultado');
    

    // Mostrar el Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';//Ocultar el spinner
        resultadoDiv.appendChild(div);//luego aparece el resultado
    }, 3000);
}


// Instanciar UI
const ui = new UI();
// console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // Llena eñ select con los años
})

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

// 3. Validar el Formulario
function cotizarSeguro(e) {
    e.preventDefault();
    // Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    // Leer el año seleccionado
    const year = document.querySelector('#year').value;
    //  leer el tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // console.log('Cotizar - seguro');

    if (marca === '' || year === '' || tipo === '') {
        // console.log('No pasa la Validación');
        ui.mostrarMensaje('Todos los Campos son Obligatorios', 'error'); 
        return;
    } 

    ui.mostrarMensaje('Cotizando...', 'exito'); 

    // donde mostramos el mensaje podremos ocultar las cotizaciones previas
    const resultadoRemoveDiv = document.querySelector('#resultado div');
    // Si esta vacio da mensaje de null, validarlo
    if(resultadoRemoveDiv != null) {//Si no es = a null
        resultadoRemoveDiv.remove();
    }

    // Instanciar el seguro
    // 5. Comenzar el calculo del seguro
    const seguro = new Seguro(marca, year, tipo);
    // llamar a Seguro.prototype.cotizarSeguro = function () {
    const total = seguro.cotizarSeguro();// tenemos la cantidad a pagar

    // 6. Mostrar el Total a pagar
    ui.mostrarResultado(seguro, total);



    console.log(seguro);//Con estos datos tenemos que cotizar el seguro y entregarlo al usuario
    // Utilizar el prototype que va a cotizar
}
