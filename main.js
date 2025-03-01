// Inspiración
// https://www.memozor.com/memory-games/for-adults/deck-of-cards
// https://www.memorymatching.com/#

// Estilos
// Casino: no recuerdo de donde saqué las cartas, otro proyecto
// Geografía: https://github.com/catamphetamine/country-flag-icons/tree/master/flags/3x2

import {Carta} from "./modulos/Carta.js";

import {Countdown} from "./modulos/Countdown.js";
import {Estadisticas} from "./modulos/Estadisticas.js";
import {Cartas} from "./modulos/Cartas.js";
import {Vidas} from "./modulos/Vidas.js";


class Estilo {
  static tema = "casino";

  static estilos = {
    casino: {
      extensionCartas: ".jpg",
      extensionReverso: ".jpg",
      iconoVida: "poker_negro.png",
      totalCartas: 40,
    },
    geografia: {
      extensionCartas: ".svg",
      extensionReverso: ".svg",
      iconoVida: "vida.png",
      totalCartas: 256,
    },
    historia: {},
  };

  static HTMLListElement = document.getElementById("estilo-especifico");

  static rutaCartas = "media/" + Estilo.tema + "/cartas/";
  static extensionCartas = Estilo.estilos[Estilo.tema].extensionCartas;
  static rutaReversoCarta =
    "media/" +
    Estilo.tema +
    "/reverso" +
    Estilo.estilos[Estilo.tema].extensionReverso;

  static totalCartas = Estilo.estilos[Estilo.tema].totalCartas;

  static rutaIconoVida = "media/" + Estilo.tema + "/vidas/" + Estilo.estilos[Estilo.tema].iconoVida;

  static cambiarTematica(nombreTematica) {
    Estilo.HTMLListElement.href =
      "estilos/especificos/" + nombreTematica + ".css";
    Estilo.rutaCartas = "media/" + nombreTematica + "/cartas/";
    Estilo.extensionCartas = Estilo.estilos[nombreTematica].extensionCartas;
    Estilo.rutaReversoCarta =
        "media/" +
        nombreTematica +
        "/reverso" +
        Estilo.estilos[nombreTematica].extensionReverso;
    
    Estilo.totalCartas = Estilo.estilos[nombreTematica].totalCartas;
    
    Estilo.rutaIconoVida = "media/" + nombreTematica + "/vidas/" + Estilo.estilos[nombreTematica].iconoVida;   
  }
}

class Juego {
  // Constantes
  PERIODO_ESPERA = 500; // Milisegundos desde que se muestran las 2 cartas seleccionadas hasta que se vuelven a ocultar
  
  static MIN_PAREJAS = 1;
  static MAX_VIDAS = 15;
  static MIN_VIDAS = 1;
  static MIN_MINUTOS = 0;
  static MAX_MINUTOS = 59;
  static MIN_SEGUNDOS = 0;
  static MAX_SEGUNDOS = 59;

  // Variables para controlar el estado del juego
  jugando = false;

  constructor(
    numParejas,
    numVidasInicial,
    limiteTiempoMin,
    limiteTiempoSeg,
    estilo
  ) {
    //this.estilo = estilo;
    this.setTema(estilo);
    //this.numParejas = numParejas;
    this.setParejas(numParejas);
    //this.numVidasInicial = numVidasInicial;
    this.setVidas(numVidasInicial);
    //this.limiteTiempoMin = limiteTiempoMin;
    //this.limiteTiempoSeg = limiteTiempoSeg;
    this.setCountdown(limiteTiempoMin, limiteTiempoSeg);
  }

  setTema(tema) {
    Estilo.cambiarTematica(tema);
  }

  setParejas(numParejas) {
    if (!Cartas.divEstaVacio()) Cartas.reset();

    // Genera ids de pareja aleatorios sin repetidos entre 0 y el número máximo de cartas para el estilo seleccionado
    let idsPareja = new Set();
    while (idsPareja.size != numParejas)
      idsPareja.add(Math.round(Math.random() * (Estilo.totalCartas - 1)));

    let idCarta = 0;
    for (let idPareja of idsPareja) {
      let carta1 = new Carta(
        Estilo.rutaCartas + idPareja + Estilo.extensionCartas,
        Estilo.rutaReversoCarta,
        idCarta,
        idPareja
      );
      idCarta++;
      let carta2 = new Carta(
        Estilo.rutaCartas + idPareja + Estilo.extensionCartas,
        Estilo.rutaReversoCarta,
        idCarta,
        idPareja
      );
      idCarta++;
      Cartas.lista.push(carta1);
      Cartas.lista.push(carta2);
    }
    Cartas.barajarLista();
    Cartas.agregarTodasAlDiv();
  }

  setVidas(numVidasInicial) {
    if (!Vidas.estaVacio()) Vidas.vaciar();
    for (let i = 0; i < numVidasInicial; i++) {
      Vidas.agregarVida(Estilo.rutaIconoVida);
    }
  }

  setCountdown(limiteTiempoMin, limiteTiempoSeg) {
    if (!Countdown.isOver()) Countdown.stop();
    Countdown.set(limiteTiempoMin, limiteTiempoSeg);
    Countdown.update();
  }

  empezar() {
    let exito = false;
    if (!this.jugando) {
      Countdown.start();
      this.activarListeners();
      this.jugando = true;
      exito = true;
    }
    return exito;
  }

  pausar() {
    let exito = false;
    if (this.jugando) {
      Countdown.stop();
      //this.desactivarListeners() // No es necesario desactivar los listeners de las cartas porque el velo las cubre y evita que se puedan clicar
      this.jugando = false;
      exito = true;
    }
    return exito;
  }

  finalizar() {
    Cartas.reset();
    Vidas.vaciar();
    Estadisticas.reset();
    Countdown.stop();
  }

  activarListeners() {
    for (let carta of Cartas.lista) {
      carta.HTMLImageElement.addEventListener("click", () => {
        if (Cartas.numCartasVisibles == 0 && carta.mostrar()) {
          Cartas.cartaVisible = carta;
          Cartas.numCartasVisibles ++;
        } else if (Cartas.numCartasVisibles == 1 && carta.mostrar()) {
          Cartas.numCartasVisibles ++;
          if (carta.esParejaDe(Cartas.cartaVisible)) {
            carta.bloquear();
            Cartas.cartaVisible.bloquear();
            Estadisticas.numAciertos++;
            Estadisticas.numMovimientos++;
            Estadisticas.actualizar();
            Cartas.numCartasVisibles -= 2;
          } else {
            setTimeout(() => {
              carta.ocultar();
              Cartas.cartaVisible.ocultar();
              Estadisticas.numFallos++;
              Vidas.eliminarVida();
              Estadisticas.numMovimientos++;
              Estadisticas.actualizar();
              Cartas.numCartasVisibles -= 2;
            }, this.PERIODO_ESPERA);
          }
        }
        if (this.haPerdido()) console.log("Game over");
      });
    }
  }

  //https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
  static desactivarListeners() {}

  haPerdido() {
    return Vidas.estaVacio() || Countdown.isOver();
  }

  haGanado() {
    return false;
  }

  redirectToResultPage() {}
}

class Parametro {
  HTMLButtonElement;
  HTMLFormElement;
  HTMLInputElements = [];
}


class Gestor {
  // Configuración por defecto de los parámetros que puede establecer el usuario
  static numParejas = 5;
  static numVidas = 4;
  static tiempoMin = 0;
  static tiempoSec = 30;
  static tema = "casino";
  static juego = new Juego(
    Gestor.numParejas,
    Gestor.numVidas,
    Gestor.tiempoMin,
    Gestor.tiempoSec,
    Gestor.tema
  );

  // Botones para controlar el estado de la partida
  static startButton = document.getElementById("startButton");
  static pauseButton = document.getElementById("pauseButton");
  static restartButton = document.getElementById("restartButton");

  // Botones, forms e inputs para configurar los parámetros del juego
  static sizeButton = document.getElementById("sizeButton");
  static lifesButton = document.getElementById("lifesButton");
  static timeButton = document.getElementById("timeButton");
  static themeButton = document.getElementById("themeButton");

  static forms = document.forms;
  static sizeForm = document.forms.namedItem("sizeForm");
  static lifesForm = document.getElementById("lifesForm");
  static timeForm = document.getElementById("timeForm");
  static themeForm = document.getElementById("themeForm");

  static sizeInput = document.getElementById("sizeInput");
  static lifesInput = document.getElementById("lifesInput");
  static minInput = document.getElementById("minInput");
  static secInput = document.getElementById("secInput");

  static casinoButton = document.getElementById("casinoButton");
  static geografiaButton = document.getElementById("geografiaButton");

  static activarBotones() {
    // Forms
    sizeInput.setAttribute("max", Estilo.estilos[Gestor.tema].totalCartas);
    sizeInput.setAttribute("min", Juego.MIN_PAREJAS);
   
    lifesInput.setAttribute("max", Juego.MAX_VIDAS);
    lifesInput.setAttribute("min", Juego.MIN_VIDAS);

    minInput.setAttribute("max", Juego.MAX_MINUTOS);
    minInput.setAttribute("min", Juego.MIN_MINUTOS);
    secInput.setAttribute("max", Juego.MAX_SEGUNDOS);
    secInput.setAttribute("min", Juego.MIN_SEGUNDOS);

    // Botones de control de flujo
    Gestor.startButton.addEventListener("click", () => {
      Gestor.iniciarJuego();
    });
    Gestor.pauseButton.addEventListener("click", () => {
      Gestor.pausarJuego();
    });
    Gestor.restartButton.addEventListener("click", () => {
      // Este Timeout es necesario para contrarrestar el Timeout dentro de Juego
      // Esta parte del código no se puede ejecutar antes que el código dentro del otro Timeout
      setTimeout(() => {
        Gestor.reiniciarJuego();
      }, Gestor.juego.PERIODO_ESPERA);
    });

    // Botones de configuración
    Gestor.sizeButton.addEventListener("click", () => {
      Gestor.pausarJuego();
      Gestor.esconderForms();
      Gestor.mostrar(Gestor.sizeForm);
    });
    Gestor.lifesButton.addEventListener("click", () => {
      Gestor.pausarJuego();
      Gestor.esconderForms();
      Gestor.mostrar(Gestor.lifesForm);
    });
    Gestor.timeButton.addEventListener("click", () => {
      Gestor.pausarJuego();
      Gestor.esconderForms();
      Gestor.mostrar(Gestor.timeForm);
    });
    Gestor.themeButton.addEventListener("click", () => {
      Gestor.pausarJuego();
      Gestor.esconderForms();
      Gestor.mostrar(Gestor.themeForm);
    });

    // Inputs de configuración

    // Parámetro número de parejas
    Gestor.sizeInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_PAREJAS && evento.target.value <= Estilo.estilos[Gestor.tema].totalCartas){
        Gestor.numParejas = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    // Parámetro número de vidas
    Gestor.lifesInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_VIDAS && evento.target.value <= Juego.MAX_VIDAS){
        Gestor.numVidas = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    // Parámetros tiempo
    Gestor.minInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_MINUTOS && evento.target.value <= Juego.MAX_MINUTOS){
        Gestor.tiempoMin = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    Gestor.secInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_SEGUNDOS && evento.target.value <= Juego.MAX_SEGUNDOS){
        Gestor.tiempoSec = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    // Parámetros tema de juego
    Gestor.casinoButton.addEventListener("click", () => {
      Gestor.tema = "casino";
      Gestor.reiniciarJuego();
    });
    Gestor.geografiaButton.addEventListener("click", () => {
      Gestor.tema = "geografia";
      Gestor.reiniciarJuego();
    });

    // Forms de configuración
    for(let form of Gestor.forms){
      form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        Gestor.esconder(form);
        Gestor.iniciarJuego();
      });
    }
  }

  static iniciarJuego() {
    if (Gestor.juego.empezar()) {
      Cartas.desvelar();
      Gestor.esconder(Gestor.startButton);
      Gestor.esconderForms();
    }
  }

  static pausarJuego() {
    if (Gestor.juego.pausar()) {
      Cartas.encubrir();
      Gestor.mostrar(Gestor.startButton);
      Gestor.startButton.innerHTML = "Reanudar";
    }
  }

  static reiniciarJuego() {
    Gestor.juego.finalizar();
    Gestor.juego = new Juego(
      Gestor.numParejas,
      Gestor.numVidas,
      Gestor.tiempoMin,
      Gestor.tiempoSec,
      Gestor.tema
    );
    Cartas.encubrir();
    Gestor.mostrar(Gestor.startButton);
    Gestor.startButton.innerHTML = "Empezar";
  }

  static esconder(ElementoHTML){
    ElementoHTML.setAttribute("hidden", "hidden");
    ElementoHTML.classList.add("oculto");
    ElementoHTML.classList.remove("visible");
  }
  static mostrar(ElementoHTML){
    ElementoHTML.removeAttribute("hidden");
    ElementoHTML.classList.add("visible");
    ElementoHTML.classList.remove("oculto");
  }

  static esconderForms(){
    for(let form of Gestor.forms) Gestor.esconder(form);
  }
}

Gestor.activarBotones();
