//VARIABLES LET
//Cada una de las cajas va representada por un div y sus respectivos labels con información dentro
//CAJA 1 Y SUS ELEMENTOS
let caja1_id = document.getElementById("caja1-id");
let caja1_abierta = document.getElementById("caja1-abierta");
let caja1_libre = document.getElementById("caja1-libre");
let caja1_cola = document.getElementById("caja1-cola");
let caja1_tiempo = document.getElementById("caja1-tiempo");
let caja1_dinero = document.getElementById("caja1-dinero");
//CAJA 2 Y SUS ELEMENTOS
let caja2_id = document.getElementById("caja2-id");
let caja2_abierta = document.getElementById("caja2-abierta");
let caja2_libre = document.getElementById("caja2-libre");
let caja2_cola = document.getElementById("caja2-cola");
let caja2_tiempo = document.getElementById("caja2-tiempo");
let caja2_dinero = document.getElementById("caja2-dinero");

//CAJA 3 Y SUS ELEMENTOS
let caja3_id = document.getElementById("caja3-id");
let caja3_abierta = document.getElementById("caja3-abierta");
let caja3_libre = document.getElementById("caja3-libre");
let caja3_cola = document.getElementById("caja3-cola");
let caja3_tiempo = document.getElementById("caja3-tiempo");
let caja3_dinero = document.getElementById("caja3-dinero");

//CAJA 4 Y SUS ELEMENTOS
let caja4_id = document.getElementById("caja4-id");
let caja4_abierta = document.getElementById("caja4-abierta");
let caja4_libre = document.getElementById("caja4-libre");
let caja4_cola = document.getElementById("caja4-cola");
let caja4_tiempo = document.getElementById("caja4-tiempo");
let caja4_dinero = document.getElementById("caja4-dinero");

//Paneles de aviso 
panelAviso = document.getElementById("panelAviso");

class Caja {
  constructor(
    id,
    abierta,
    saturada,
    tiempoEspera,
    contClientes,
    contDinero,
    cliActuales
  ) 
  {
    this.id = id;
    this.abierta = abierta;
    this.saturada = saturada;
    this.tiempoEspera = tiempoEspera;
    this.contClientes = contClientes;
    this.contDinero = contDinero;
    this.cliActuales = new Array(); //Array de clientes que hay en dicha caja
  }

  pasanClientes() {
    //No se actualizan los datos de la caja pero el cliente se va 
    panelAviso.innerHTML += "<br>Cliente "+ this.cliActuales[0].id + " pasa a pagar"; 
    this.tiempoEspera -= parseInt(this.cliActuales[0].tiempoPagar);
    this.contDinero+=parseInt(this.cliActuales[0].totalPagar); 
    //console.log("LINEA 60: Pasa y se elimina cliente "+this.cliActuales[0].id); //5
    document.getElementById(this.cliActuales[0].id).remove(); 

    this.cliActuales.splice(0, 1);
    //console.log("LINEA 65: DE LA CAJA "+this.id+" hay clientes "+this.cliActuales.length); 
    //console.log(this.cliActuales);//none
    if (this.cliActuales.length >= 0) {
      //Hay clientes esperando
      if(this.tiempoEspera > 15){
        this.actualizaInformacionCaja("Saturada");
      }else{
        this.actualizaInformacionCaja("No saturada");
      }
      if(this.tiempoEspera<10){
            this.removeSaturado(); 
      }
    }
  }
  clientePierdeTurno() {
    //No se actualizan los datos de la caja pero el cliente se va 
    this.tiempoEspera -= parseInt(this.cliActuales[0].tiempoPagar);
    panelAviso.innerHTML += "<br>Cliente "+ this.cliActuales[0].id +" pierde turno"; 
    console.log("el cliente pierde el turno");
    document.getElementById(this.cliActuales[0].id).remove(); 

    this.cliActuales.splice(0, 1);
    //console.log("LINEA 65: DE LA CAJA "+this.id+" hay clientes "+this.cliActuales.length); 
    //console.log(this.cliActuales);//none
    if (this.cliActuales.length >= 0) {
      //Hay clientes esperando
      if(this.tiempoEspera > 15){
        this.actualizaInformacionCaja("Saturada");
      }else{
        this.actualizaInformacionCaja("No saturada");
      }
      if(this.tiempoEspera<10){
            this.removeSaturado(); 
      }
    }
  }
  removeSaturado(){
    switch(this.id){
      case "caja1": 
        var elCaja1 = document.getElementById("caja1"); 
        elCaja1.classList.remove("caja-saturada"); 
        break; 
      case "caja2": 
        let elCaja2 = document.getElementById("caja2"); 
        elCaja2.classList.remove("caja-saturada");
        break; 
      case "caja3": 
        let elCaja3 = document.getElementById("caja3"); 
        elCaja3.classList.remove("caja-saturada"); 
        break; 
      case "caja4":  
        let elCaja4 = document.getElementById("caja4");
        elCaja4.classList.remove("caja-saturada");
        break; 
  }}
  actualizaInformacionCaja(saturada) {

    switch (this.id) {
      case "caja1":
        caja1_abierta.innerHTML = null; 
        caja1_abierta.innerHTML = this.abierta;
        caja1_libre.innerHTML = saturada;
        caja1_tiempo.innerHTML = this.tiempoEspera + "<br>";
        caja1_cola.innerHTML = this.contClientes + "<br>";
        caja1_dinero.innerHTML = this.contDinero + "<br>";
        break;
      case "caja2":
        caja2_abierta.innerHTML = "" + this.abierta;
        caja2_libre.innerHTML = "" + this.saturada;
        caja2_tiempo.innerHTML = "" + this.tiempoEspera;
        caja2_cola.innerHTML = "" + this.contClientes;
        caja2_dinero.innerHTML = "" + this.contDinero;
        break;
      case "caja3":
        caja3_abierta.innerHTML = "" + this.abierta;
        caja3_libre.innerHTML = "" + this.saturada;
        caja3_tiempo.innerHTML = "" + this.tiempoEspera;
        caja1_cola.innerHTML = "" + this.contClientes;
        caja3_dinero.innerHTML = "" + this.contDinero;
        break;
      case "caja4":
        caja4_abierta.innerHTML = "" + this.abierta;
        caja4_libre.innerHTML = "" + this.saturada;
        caja4_tiempo.innerHTML = "" + this.tiempoEspera;
        caja1_cola.innerHTML = "" + this.contClientes;
        caja4_dinero.innerHTML = "" + this.contDinero;
        break;
    }
  }
}
