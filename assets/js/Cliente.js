class Cliente {
    constructor(id, tiempoPagar, tiempoComprar, totalPagar, estado, horaEntrada, horaLlegadaCaja) {
      this.id = id;
      this.tiempoComprar = tiempoComprar;
      this.tiempoPagar = tiempoPagar;
      this.totalPagar = totalPagar;
      this.estado = estado;
      this.horaEntrada = new Date();
      this.horaLlegadaCaja = new Date(); 
    }
  
    reloj() {
      hora = new Date();
      var horas = hora.getHours();
      var minutos = hora.getMinutes();
      var segundos = hora.getSeconds();
  
      switch (true) {
        case segundos < 10:
          segundos = "0" + segundos;
          break;
        case minutos < 10:
          minutos = "0" + minutos;
          break;
        case horas < 10:
          horas = "0" + horas;
          break;
      }
      //Mostrar por pantalla la hora
      relojEl.innerHTML =
        hora.getHours() + ":" + hora.getMinutes() + ":" + segundos;
      //Devolver string con la hora
      horaStr = horas + ":" + minutos + ":" + segundos;
      relojCliente = setTimeout(reloj, 1000);
    }
  
    calcHoraLlegaCaja() {
      /*
      Suponinendo que este método recibe como parámetro la hora a la que el cliente entró en la tienda hay que averiguar: 
          1.- Dado su tiempo de compra y de espera: la hora a la que llega a la caja 
          2.- Una vez avceriguado el apartado anterior: La hora cuando falten 5 segundos antes de llegar a la caja 
          3.- Cuántos segundos quedan desde el instante actual y el que llega a la caja 
      */
      //1. Calcular la hora a la que llegará a la caja
      var horaLlegaCaja = this.horaLlegadaCaja; //DUDA: Por qué al asignarle como valor inicia horaLlegadaCaja y modificarla se modifica a su vez horaEntrada.
      var strLlegada;
      var suma = this.tiempoComprar + this.tiempoPagar; 
      horaLlegaCaja.setSeconds(suma); //Si solamente se pone un paréntesis solo suma el primer valor
      strLlegada = horaLlegaCaja.getHours() + ":" + horaLlegaCaja.getMinutes() + ":" + horaLlegaCaja.getSeconds();
      console.log(strLlegada); 
      return horaLlegaCaja;
    }
    calcHoraLlegaCajaPromocion(tiempoPromocion) {
      /*
      Suponinendo que este método recibe como parámetro la hora a la que el cliente entró en la tienda hay que averiguar: 
          1.- Dado su tiempo de compra y de espera: la hora a la que llega a la caja 
          2.- Una vez avceriguado el apartado anterior: La hora cuando falten 5 segundos antes de llegar a la caja 
          3.- Cuántos segundos quedan desde el instante actual y el que llega a la caja 
      */
      //1. Calcular la hora a la que llegará a la cola de nuevo después de pasar por la promoción
      var horaLlegadaCaja = new Date(); //DUDA: Por qué al asignarle como valor inicia horaLlegadaCaja y modificarla se modifica a su vez horaEntrada.
      var strLlegada;
      horaLlegadaCaja.setSeconds(tiempoPromocion);
      strLlegada =
        horaLlegadaCaja.getHours() +
        ":" +
        horaLlegadaCaja.getMinutes() +
        ":" +
        horaLlegadaCaja.getSeconds();
      return horaLlegadaCaja;
    }
  
    calcHoraAviso() {
      /* Calcular la hora a la que quedarán 5 segundos para que el cliente llegue a la caja. En caso de ser necesario se calculará y se comparará con la hora actual 
      cuando ambas coincidan se lanzará un aviso para el cliente que se encuentre en la promocion y después se deshabilitará este setInterval
      */
      var horaAviso = this.horaEntrada; //DUDA: Por qué al asignarle como valor inicia horaLlegadaCaja y modificarla se modifica a su vez horaEntrada.
      var StrAviso;
      var tiempoCompra = 30; //Tiempo que tarda en coger todos los productos
      var tiempoEspera = 40; //Tiempo que pasa en la cola hasta que llega a la caja a pagar
  
      tiempoEspera -= 5; //Tiempo que tarda en llegar a la caja -5
      horaAviso.setSeconds(tiempoCompra + tiempoEspera); //Si solamente se pone un paréntesis solo suma el primer valor
      StrAviso =
        horaAviso.getHours() +
        ":" +
        horaAviso.getMinutes() +
        ":" +
        horaAviso.getSeconds();
      return StrAviso;
    }
  
    calcTiempoRestante() {
      /*Calcular el intervalo de tiempo en segundos desde el instante actual hasta el momento en el que llega a la caja*/
      var horaActual = new Date();
      var horaLlegadaCaja = this.calcHoraLlegaCaja();
      var segundosRestantes = Math.abs(
        horaLlegadaCaja.getTime() - horaActual.getTime()
      );
      segundosRestantes = segundosRestantes / 1000;
      return segundosRestantes;
    }
  }
  