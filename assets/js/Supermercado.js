//Establecer que la función se ejecute cada segundo
//CONSTANTES
const div = document.getElementById("divAbreCierraSuper");
const horApertura = "09:0:0"; //Obligatorio
const horCierre = "20:0:0"; //Obligatorio, cierra sí o sí
const inicioDescanso = "15:0:0"; //Opcional, te va a sugerir que cierres pero no te obliga
const finDescanso = "15:30:0"; //Opcional, te va a sugerir que abras pero no te obliga

//VARIABLES LET
//Cada una de las cajas va representada por un div y sus respectivos labels con información dentro
//CAJA 1 Y SUS ELEMENTOS
let elCaja1 = document.getElementById("caja1");
//CAJA 2 Y SUS ELEMENTOS
let elCaja2 = document.getElementById("caja2");
//CAJA 3 Y SUS ELEMENTOS
let elCaja3 = document.getElementById("caja3");
//CAJA 4 Y SUS ELEMENTOS
let elCaja4 = document.getElementById("caja4");
//Variable de la caja que contiene a los clientes
let divClientes = document.getElementById("divClientes");
//Variables globales
let abierto = false;
//BOTONES
//Abrir y cerrar supermercado
let btnAbre;
let btnCierra;
//Paneles de aviso 
panelAviso = document.getElementById("panelAviso");
//Cajas
let caja1 = new Caja("caja1", true, 0, 0, 0, 0, new Array());
let caja2 = new Caja("caja2", false, 0, 0, 0, 0, new Array());
let caja3 = new Caja("caja3", false, 0, 0, 0, 0, new Array());
let caja4 = new Caja("caja4", false, 0, 0, 0, 0, new Array());
//COLAS
let cola1 = document.getElementById("cola1");
let cola2 = document.getElementById("cola2");
let cola3 = document.getElementById("cola3");
let cola4 = document.getElementById("cola4");
//Lista de cajas abiertas
let cajasAbiertas = new Array(caja1);
//Lista de cajas cerradas
let cajasCerradas = new Array(caja2, caja3, caja4);
//Lista de los clientes que llegan al super
//Número total de clientes
let numTotalClientes = 0;
//Número total de cajas abiertas
let numCajasAbiertas = 0;
//Función llegan clientes aleatorios
let k = 0;
//Contador de tiempo segundo a segundo
let tiempo = 0;
let totalClientes;
//REGEX
let btnLineaComando = document.getElementById("btnLineaComando");
//Promociones
let promociones = new Array();

inicializar();
inicializarPromociones();
setInterval(reloj, 1000);

function reloj() {
  var today = new Date();
  var currentTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  switch (currentTime) {
    case horApertura:
      avisoEstado = true;
      if (btnAbre == null || btnCierra == null) {
        div.innerHTML = `<button id="btnAbreSuper" class="button supermarket__button button-abrir-anim">Abrir Supermercado</button>
                                 <button id="btnCierraSuper" class="button supermarket__button button-cerrar">Cerrar Supermercado</button>`;
      }
      break;
    case horCierre:
      div.innerHTML = `<button id="btnAbreSuper" class="button supermarket__button button-abrir">Abrir Supermercado</button>
                             <button id="btnCierraSuper" class="button supermarket__button button-cerrar-anim">Cerrar Supermercado</button>`;
      break;
    case inicioDescanso:
      div.innerHTML = `<button id="btnAbreSuper" class="button supermarket__button button-abrir">Abrir Supermercado</button>
                             <button id="btnCierraSuper" class="button supermarket__button button-cerrar-anim">Cerrar Supermercado</button>`;
      break;
    case finDescanso:
      div.innerHTML = `<button id="btnAbreSuper" class="button supermarket__button button-abrir-anim">Abrir Supermercado</button>
                             <button id="btnCierraSuper" class="button supermarket__button button-cerrar">Cerrar Supermercado</button>`;
  }
  //return currentTime;
}
function cambioEstadoAbrir() {
  btnAbre.disabled = true;
  btnCierra.disabled = false;
  btnAbre.classList = "button supermarket__button button-abrir";
  clientesAleatorios();
  if (btnAbre.disabled) {
  } else {
  }
}
function cambioEstadoCerrar() {
  btnCierra.disabled = true;
  btnAbre.disabled = false;
  btnCierra.classList = "button supermarket__button button-cerrar";
}
function inicializar() {
  var today = new Date();
  var currentTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  if (today.getHours() < 10) {
    currentTime = "0" + currentTime;
  }
  if (
    (currentTime >= horApertura && currentTime < inicioDescanso) ||
    (currentTime >= finDescanso && currentTime < horCierre)
  ) {
    div.innerHTML = `<button id="btnAbreSuper" class="button supermarket__button button-abrir-anim">Abrir Supermercado</button>
                         <button id="btnCierraSuper" class=" button supermarket__button button-cerrar">Cerrar Supermercado</button>`;
  } else {
    div.innerHTML = `<button id="btnAbreSuper" class="button supermarket__button button-abrir">Abrir Supermercado</button>
                         <button id="btnCierraSuper" class="button supermarket__button button-cerrar-anim">Cerrar Supermercado</button>`;
  }
  btnAbre = document.getElementById("btnAbreSuper");
  btnCierra = document.getElementById("btnCierraSuper");
  btnAbre.addEventListener("click", cambioEstadoAbrir);
  btnCierra.addEventListener("click", cambioEstadoCerrar);
}
function clientesAleatorios() {
  var nClientes = Math.round(Math.random() * (7 - 4) + 4);
  totalClientes = nClientes;
  for (var i = 0; i < nClientes; i++) {
    numTotalClientes++;
    var tiempoComprar = Math.round(Math.random() * (25 - 10) + 10);
    var tiempoPagar = Math.round(Math.random() * (20 - 10) + 10);
    var dinero = Math.round(Math.random() * (50 - 1) + 1);
    var estado = "espera";
    var horaEntrada = new Date(); // Aunque esta no es real, deberá ser actualizada cuando se le asigne la caja
    var horaCaja = new Date(); // Aunque esta no es real, deberá ser actualizada cuando se le asigne la caja
    var cliente = new Cliente(
      numTotalClientes,
      tiempoComprar,
      tiempoPagar,
      dinero,
      estado,
      horaEntrada,
      horaCaja
    );
      console.log("Se ha creado el cliente: "+numTotalClientes);
    setTimeout(asignarCaja, tiempoComprar * 1000, cliente);
  }
}
function asignarCaja(cliente) {
  var contador = 0; 
  cliente.horaEntrada = new Date();
  ordenarCajas(cajasAbiertas);
  cajasAbiertas.forEach((caja) => {
    
    console.log("Entra cliente "+cliente.id);
    if(contador==0){
    if (totalClientes >= 0) { //Esta comprobación asegura que el numero de clientes no es menor a 0 
      if (caja.tiempoEspera >= 15) {
        estiloSaturada(caja.id);
        if (cajasCerradas.length == 0) {
          console.log("TODAS LAS CAJAS ESTÁN ABIERTAS");
        } else {
          estiloAbierta(cajasCerradas[0].id);
          cajasCerradas[0].abierta = true;
          cajasAbiertas.push(cajasCerradas[0]);
          cajasCerradas.splice(0, 1);
          numCajasAbiertas++;

          ordenarCajas(cajasAbiertas);
          contador++;
          cajasAbiertas[0].cliActuales.push(cliente);
          cajasAbiertas[0].tiempoEspera += cliente.tiempoPagar;
          cajasAbiertas[0].contClientes++;
          actualizaInformacionCaja(cajasAbiertas[0], "Saturada");
          nuevoCliente = `<span onclick="clientePromocion(${cajasAbiertas[0].cliActuales.length}, ${cliente.id}, ${cajasAbiertas[0].id})" class="spanClientes cli-anim-inicial" id="${cliente.id}">cliente ${cliente.id}
                                    <span class="infoCliente" id="infoCliente">Total: ${cliente.totalPagar}</span>
                                </span>`;

          switch (cajasAbiertas[0].id) {
            case "caja1":
              cola1.innerHTML += nuevoCliente;
              break;
            case "caja2":
              cola2.innerHTML += nuevoCliente;
              break;
            case "caja3":
              cola3.innerHTML += nuevoCliente;
              break;
            case "caja4":
              cola4.innerHTML += nuevoCliente;
              break;
          }
          //cliente.estado = "paga";
          setTimeout(pasanClientesCaja, cliente.tiempoPagar * 1000, cliente, cajasAbiertas[0].id);
        }
      } else {
        contador++;
        cajasAbiertas[0].cliActuales.push(cliente);
        cajasAbiertas[0].tiempoEspera += cliente.tiempoPagar;
        cajasAbiertas[0].contClientes++;
        actualizaInformacionCaja(cajasAbiertas[0], "No saturada");
        nuevoCliente = `<span onclick="clientePromocion(${cajasAbiertas[0].cliActuales.indexOf(cliente)}, ${cliente.id},'${cajasAbiertas[0].id}')" 
                          class="spanClientes cli-anim-inicial" id="${cliente.id}">cliente ${cliente.id}
                        <span class="infoCliente" id="infoCliente">Total: ${cliente.totalPagar}</span>
                        </span>`;
        switch (cajasAbiertas[0].id) {
          case "caja1":
            cola1.innerHTML += nuevoCliente;
            break;
          case "caja2":
            cola2.innerHTML += nuevoCliente;
            break;
          case "caja3":
            cola3.innerHTML += nuevoCliente;
            break;
          case "caja4":
            cola4.innerHTML += nuevoCliente;
            break;
        }
        setTimeout(pasanClientesCaja, cliente.tiempoPagar * 1000, cliente, cajasAbiertas[0].id);
      }
    }
    ordenarCajas(cajasAbiertas);
    totalClientes--;
  }
});
}
function ordenarCajas(cajas) {
  if (cajas.length > 1) {
    cajas.sort((a, b) => {
      if (a.tiempoEspera < b.tiempoEspera) {
        return -1;
      }
      if (a.tiempoEspera > b.tiempoEspera) {
        return 1;
      }
      return 0;
    });
  }
}
function pasanClientesCaja(cliente, idCaja) {
  var aux = 0; 
  switch (cliente.estado) {
    case "espera": 
      while (cajasAbiertas[aux].tiempoEspera == 0) {
        aux++;
      }
      cajasAbiertas[aux].pasanClientes();
      break;
    case "promocion":
      for(var i = 0; i < cajasAbiertas.length; i++){
        if(cajasAbiertas[i].id == idCaja){
          cajasAbiertas[i].clientePierdeTurno(); 
        }
      }
      break;
    case "paga": 
      console.log("Si este caso se da, malo"); 
  }
}
function actualizaInformacionCaja(caja, estado) {
  switch (caja.id) {
    case "caja1":
      caja1_abierta.innerHTML = caja.abierta;
      caja1_libre.innerHTML = estado + "<br>";
      caja1_tiempo.innerHTML = caja.tiempoEspera + "<br>";
      caja1_cola.innerHTML = caja.contClientes + "<br>";
      break;
    case "caja2":
      caja2_abierta.innerHTML = "" + caja.abierta;
      caja2_libre.innerHTML = "" + caja.saturada;
      caja2_tiempo.innerHTML = "" + caja.tiempoEspera + "<br>";
      caja2_cola.innerHTML = "" + caja.contClientes;
      caja2_dinero.innerHTML = "" + caja.contDinero;
      break;
    case "caja3":
      caja3_abierta.innerHTML = "" + caja.abierta;
      caja3_libre.innerHTML = "" + caja.saturada;
      caja3_tiempo.innerHTML = "" + caja.tiempoEspera + "<br>";
      caja3_cola.innerHTML = "" + caja.contClientes;
      caja3_dinero.innerHTML = "" + caja.contDinero;
      break;
    case "caja4":
      caja4_abierta.innerHTML = "" + caja.abierta;
      caja4_libre.innerHTML = "" + caja.saturada;
      caja4_tiempo.innerHTML = "" + caja.tiempoEspera + "<br>";
      caja4_cola.innerHTML = "" + caja.contClientes;
      caja4_dinero.innerHTML = "" + caja.contDinero;
      break;
  }
}
function clickCaja(caja) {
  if (caja.abierta) {
    var i = cajasAbiertas.indexOf(caja);
    cajasAbiertas[i].abierta = false;
    cajasCerradas.push(cajasAbiertas[i]);
    cajasAbiertas.splice(i, 1);
    numCajasAbiertas--;
    ordenarCajas(cajasAbiertas);
  } else {
    var i = cajasCerradas.indexOf(caja);
    cajasCerradas[i].abierta = true;
    cajasAbiertas.push(cajasCerradas[i]);
    cajasCerradas.splice(i, 1);
    numCajasAbiertas++;
    ordenarCajas(cajasAbiertas);
  }
}
function estiloAbierta(id) {
  switch (id) {
    case "caja1":
      elCaja1.classList.add("supermarket__caja-abierta");
      elCaja1.classList.remove("supermarket__caja-cerrada");
      break;
    case "caja2":
      elCaja2.classList.add("supermarket__caja-abierta");
      elCaja2.classList.remove("supermarket__caja-cerrada");
      break;
    case "caja3":
      elCaja3.classList.add("supermarket__caja-abierta");
      elCaja3.classList.remove("supermarket__caja-cerrada");
      break;
    case "caja4":
      elCaja4.classList.add("supermarket__caja-abierta");
      elCaja4.classList.remove("supermarket__caja-cerrada");
      break;
  }
}
function estiloCerrada(id) {
  switch (id) {
    case "caja1":
      elCaja1.classList.add("supermarket__caja-cerrada");
      elCaja1.classList.remove("supermarket__caja-abierta");
      break;
    case "caja2":
      elCaja2.classList.add("supermarket__caja-cerrada");
      elCaja2.classList.remove("supermarket__caja-abierta");
      break;
    case "caja3":
      elCaja3.classList.add("supermarket__caja-cerrada");
      elCaja3.classList.remove("supermarket__caja-abierta");
      break;
    case "caja4":
      elCaja4.classList.add("supermarket__caja-cerrada");
      elCaja4.classList.remove("supermarket__caja-abierta");
      break;
  }
}
function estiloSaturada(id) {
  switch (id) {
    case "caja1":
      elCaja1.classList.add("caja-saturada");
      break;
    case "caja2":
      elCaja2.classList.add("caja-saturada");
      break;
    case "caja3":
      elCaja3.classList.add("caja-saturada");
      break;
    case "caja4":
      elCaja4.classList.add("caja-saturada");
      break;
  }
}
function inicializarPromociones() {
  if (localStorage.length > 0) {
    promociones = localStorage.getItem("promociones");
    promociones = JSON.parse(promociones);
    for (var i = 0; i < promociones.length; i++) {
      //console.log(promociones[i].categoria);
      crearElementoPromocion(promociones[i]);
    }
  }else{
    //Crear 3 arrays por defecto 
    var prom1 = ['prom', '-20% desc.', 'Carne', 'Lechazo y asadura']; 
    var prom2 = ['prom', '3x2', 'Panaderia', 'Mazapanes y canapés']; 
    var prom3 = ['prom', '-30%', 'Preparados', 'Lazaña de calabaza']; 
    crearPromocion(prom1); 
    crearPromocion(prom2); 
    crearPromocion(prom3); 
  }
}
function crearElementoPromocion(promocion) {
  var imgPath;
  //Se va a recoger la seccion determinada y deendiendo e su nombre se le aplica un estilo u otro
  switch (promocion.categoria) {
    case "Carne":
    case "carne":
      imgPath = "assets/img/categories/meat.png";
      break;
    //C:\xampp\htdocs\Supernarket multithreading\images
    case "Pescaderia":
    case "pescaderia":
    case "pescadería":
    case "Pescadería":
      imgPath = "assets/img/categories/fish.png";
      break;

    case "Fruteria":
    case "fruteria":
    case "frutería":
    case "Frutería":
      imgPath = "assets/img/categories/fruit.png";
      break;

    case "Panaderia":
    case "panaderia":
    case "Panaderia":
    case "panadería":
      imgPath = "assets/img/categories/bakery.png";
      break;

    case "congelados":
    case "Congelados":
      imgPath = "assets/img/categories/frozen.png";
      break;

    case "preparados":
    case "Preparados":
      imgPath = "assets/img/categories/prepared-plates.png";
      break;
  }
  //Crear el bloque de código
  var divPromociones = document.getElementById("wrapperPromociones");
  
  divPromociones.innerHTML += `
  <div class="giving__content promocion" id="prom">
    <img src=${imgPath} alt="" class="giving__img">
    <h3 class="giving__title">${promocion.nombre} en ${promocion.categoria}</h3>
    <p class="giving__description">${promocion.descripcion}</p>
  </div>`;
}
function crearPromocion(arrayRegex) {
  //Crear objeto de tipo promocion
  var promocion = new Promocion(
    arrayRegex[1],
    arrayRegex[2],
    arrayRegex[3],
    true
  );
  promociones.push(promocion);
  localStorage.setItem("promociones", JSON.stringify(promociones));
  crearElementoPromocion(promocion);
}
/*Que la caja avise al cliente una vez que queden dos clientes por delante de el, si se sale 
pierde el turno */
function clientePromocion(posCliente, idCliente, idCaja) {
  //recoger el cliente y la caja en la que se encuentra
  var arrayDatos = getCajaCliente(idCaja, posCliente);
  var cliente = arrayDatos[0];
  var caja = arrayDatos[1];
  //Cuál es el estado del cliente
  switch (cliente.estado) {
    case "espera":
      //Aplicar la promocion, cambiar el cliente al estado de la promocion, calculos sobre el tiempo restante
      caja.cliActuales[posCliente].estado = "promocion";
      cliente.estado = "promocion";
      //----------------------------------------------------------------------------Mandar al cliente a una promoción------------------------------------------------------------------------------------------
      //1. Comprobar que hay promociones
      if (promociones.length > 0) {
        //2. Escoger aleatoriamente un indice del array de las promociones
        var indiceProm = Math.round(Math.random() * (promociones.length - 1)); //como el minimo es 0, no tiene sentido que se reste y sume 0.
        //3. Calcula el tiempo restante que le queda al cliente hasta que llegue a pagar
        var tiempoEsperaRestante = cliente.calcTiempoRestante();
        //4. Se le asigna al cliente el tiempo (aleatorio 10-30) que va a permanecer en la promocion
        var tiempoPromocion = Math.round(Math.random() * (30 - 10) + 10);
        //5. Se calcula el tiempo el tiempo restante hasta que un aviso sea lanzado, en caso de ser necesario. Cinco segundos antes de que llegue el turno del cliente se le avisará de que su turno está a punto de llegar
        var tiempoAviso = cliente.calcTiempoRestante() - 5;
        //6. Se lanza un TimeOut con el tiempo de promocion
        setTimeout(terminaPromocion, tiempoPromocion * 1000, cliente, caja);
        //7. Si el tiempo de espera es menor que el tiempo de la promoción y mayor de 5 segundos
        //se tiene que lanzar un aviso 5 segundos antes por si el cliente quiere volver a la cola y no perder su turno
        if (
          tiempoEsperaRestante < tiempoPromocion &&
          tiempoEsperaRestante > 5
        ) {
          setTimeout(lanzaAviso, tiempoAviso * 1000, cliente);
        }
      }
      console.log(
        "PROMOCION: Cliente " +
          cliente.id +
          " se dirige a " +
          promociones[indiceProm].nombre +
          " categoría: " +
          promociones[indiceProm].categoria
      );
      panelAviso.innerHTML += ("<br>PROMOCION: Cliente " +
      cliente.id +
      " se dirige a " +
      promociones[indiceProm].nombre +
      " categoría: " +
      promociones[indiceProm].categoria);
      break;

    case "promocion":
      //0. Si al pulsarse el cliente se encuentra en una promoción este vuelve a la cola
      //1. Hay que comprobar que el usuario se encuentra en la cola aún (Puede ser que haya perdido el turno y tenga que volver a buscar un hueco en la cola )
      if (cliente == null) {
        console.log("El cliente ya ha pagado y se ha marchado");
        panelAviso.innerHTML += ("<br>El cliente "+cliente.id+" ya ha pagado y se ha marchado"); 
      } else {
        console.log("El cliente vuelve a la cola antes de que llegue su turno");
        panelAviso.innerHTML += ("<br>El cliente "+cliente.id+" vuelve a la cola antes de perder su turno"); 
        //1. Se cambia el estado del cliente a espera y se actualiza el array global
        caja.cliActuales[posCliente].estado = "espera";
        cliente.estado = "espera";
        setCaja(caja);
        //1.1. Próximo: Realizar cambios en los datos del cliente para reflejar que ha pasado por la promoción
      }
      break;
    case "paga":
      console.log(
        "El cliente está pagando y no puede irse a pillar una promoción, chau"
      );
      
      panelAviso.innerHTML += ("<br>El cliente "+cliente.id+" está pagando y no puede irse a pillar una promoción, chau"); 
      break;
  }
  //Hay que sobreescribir los datos de la caja en la cual cliente se ha estado modificando
  setCaja(caja);
}

function getCajaCliente(idCaja, posCliente) {
  var caja;
  var cliente;
  try {
    switch (idCaja) {
      case "caja1":
        caja = caja1;
        cliente = caja1.cliActuales[posCliente];
        return [cliente, caja];
      case "caja2":
        caja = caja2;
        cliente = caja2.cliActuales[posCliente];
        return [cliente, caja];
      case "caja3":
        caja = caja3;
        cliente = caja3.cliActuales[posCliente];
        return [cliente, caja];
      case "caja4":
        caja = caja4;
        cliente = caja4.cliActuales[posCliente];
        return [cliente, caja];
    }
  } catch (e) {
    console.log(e + "Error recogiendo los datos del array");
    //La caja siempre la va a detectar, pero el cliente puede ser eliminado durante el programa
    return [caja, null];
  }
}
function setCaja(caja) {
  switch (caja.id) {
    case "caja1":
      var indice = cajasAbiertas.indexOf(caja1); 
      cajasAbiertas[indice] = caja; 
      caja1 = caja;
      break;
    case "caja2":
      var indice = cajasAbiertas.indexOf(caja2); 
      cajasAbiertas[indice] = caja; 
      caja2 = caja;
      break;
    case "caja3":
      var indice = cajasAbiertas.indexOf(caja3); 
      cajasAbiertas[indice] = caja; 
      caja3 = caja;
      break;
    case "caja4":
      var indice = cajasAbiertas.indexOf(caja4); 
      cajasAbiertas[indice] = caja; 
      caja4 = caja;
      break;
  }
  ordenarCajas(cajasAbiertas);
}
function lanzaAviso(cliente) {
  console.log(
    "Cliente " + cliente.id + " quedan 5 segundos para que llegue su turno"
  );
  panelAviso.innerHTML += ("<br>El cliente "+cliente.id+" ¡AVISO! Quedan 5 segundos para que llegue su turno"); 
}
function terminaPromocion(cliente, caja) {
  //0. Una vez que el tiempo aleatorio de la promoción finaliza hay que comprobar si el estado del cliente sigue siendo o no el de promoción (mirar cómo hacer clear)
  switch (cliente.estado) {
    case "espera":
      console.log("El cliente ya ha salido de la seccion de las promociones");
      panelAviso.innerHTML += ("<br>El cliente "+cliente.id+" ya ha salido de la seccion de las promociones y posiblemente también haya pagado"); 
      break;
    case "promocion":
      console.log("El cliente sale ahora de la seccion de las promociones, va a buscar la cola con menos tiempo de espera");
      panelAviso.innerHTML += ("<br>El cliente "+cliente.id+" sale ahora de la sección de las promociones, va a buscar la cola con menos tiempo de espera"); 
      asignarCaja(cliente); 
  }
}
elCaja1.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  clickCaja(caja1);
  elCaja1.classList.toggle("supermarket__caja-cerrada");
  elCaja1.classList.toggle("supermarket__caja-abierta");
});
elCaja2.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  clickCaja(caja2);
  elCaja2.classList.toggle("supermarket__caja-cerrada");
  elCaja2.classList.toggle("supermarket__caja-abierta");
});
elCaja3.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  clickCaja(caja3);
  elCaja3.classList.toggle("supermarket__caja-cerrada");
  elCaja3.classList.toggle("supermarket__caja-abierta");
});
elCaja4.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  clickCaja(caja4);
  elCaja4.classList.toggle("supermarket__caja-cerrada");
  elCaja4.classList.toggle("supermarket__caja-abierta");
});
btnLineaComando.addEventListener("click", () => {
  var inputRegex = document.getElementById("lineaComando").value;
  var divRegex = document.getElementById("div-linea-comando");
  if (inputRegex == null) {
    divRegex.innerHTML += "Debe introducir el regex";
  } else {
    var arrayRegex = inputRegex.split(" ");
    switch (arrayRegex[0].toLowerCase()) {
      case "prom":
        console.log(arrayRegex);
        crearPromocion(arrayRegex);
        break;
      case "caja":
        if (cajasCerradas.length == 0) {
          if (arrayRegex[1] == "++") {
            divRegex.innerHTML +=
              "¡No hay cajas cerradas, introduzca promociones o espere!";
          } else if (arrayRegex == "--") {
            divRegex.innerHTML += "Cerrar caja " + arrayRegex[2];
          }
        } else {
          if (arrayRegex[1] == "++") {
            divRegex.innerHTML += "Abrir caja " + arrayRegex[2];
          } else if (arrayRegex == "--") {
            divRegex.innerHTML +=
              "¡No hay cajas abiertas, introduzca promociones o espere!";
          }
        }
        break;
    }
    if (arrayRegex[0].toLowerCase() == "prom") {
    }
  }
});


