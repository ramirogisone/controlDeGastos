const presupuestoSemanal = prompt('Ingrese su presupuesto semanal:');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
	}
	//metodos de la clase
	presupuestoRestante(saldo = 0){
		return this.restante -= Number(saldo);
	}
}    
//Interfaz maneja todo lo relacionado al html
class Interfaz {
	insertarPresupuesto(saldoInicial){
		const total = document.getElementById('total');
		const restante = document.getElementById('restante');

		total.innerHTML = `${saldoInicial}`;
		restante.innerHTML = `${saldoInicial}`; 
		// console.log(saldoInicial);
	}
	mostrarMensaje(mensaje, tipo){
		const div = document.createElement('div');
		div.classList.add('text-center', 'alert')
		if(tipo === 'error'){
			// div.classList.add('mensaje', 'error');
			div.classList.add('alert-danger');
		}else{
			// div.classList.add('mensaje', 'correcto');
			div.classList.add('alert-success');
		}
		div.appendChild(document.createTextNode(mensaje));
		document.querySelector('.primario').insertBefore(div, formulario);
		setTimeout(function(){
			document.querySelector('.alert').remove();
			formulario.reset();
		}, 3000);
	}
	insertarListado(gasto, cantidad){
		const gastoListado = document.querySelector('#gastos ul');
		const li = document.createElement('li');
		li.className = 'list-group-item d-flex justify-content-between aling-items-center';
		li.innerHTML = `
			${gasto}
			<span class='badge badge-primary badge-pill'> $ ${cantidad}</span>
		`;
		gastoListado.appendChild(li);
	}
	presupuestoRestante(cantidad){
		const restante = document.getElementById('restante');
		const saldoRestante = cantidadPresupuesto.presupuestoRestante(cantidad);
		restante.innerHTML = `${saldoRestante}`;
	}
}
document.addEventListener('DOMContentLoaded', function(){
	if(presupuestoSemanal === null || presupuestoSemanal === ''){
		window.location.reload();
	}else{
		//instanciamos presupuesto
		cantidadPresupuesto = new Presupuesto(presupuestoSemanal);
		//instanciamos la interfaz
		const interfaz = new Interfaz();
		interfaz.insertarPresupuesto(cantidadPresupuesto.presupuesto);
	}
});
formulario.addEventListener('submit', function(event){
	event.preventDefault();
	//validar que los campos no esten vacios
	const gasto = document.getElementById('gasto').value;
	const cantidad = document.getElementById('cantidad').value;
	const interfaz = new Interfaz();
	if(gasto === '' || cantidad === ''){
		interfaz.mostrarMensaje('Faltan datos, por favor revisar', 'error');	
	}else{
		interfaz.mostrarMensaje('Gasto agregado', 'correcto');
		interfaz.insertarListado(gasto, cantidad);
		interfaz.presupuestoRestante(cantidad);
	}
	
})