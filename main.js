// Inspiración
// https://www.memozor.com/memory-games/for-adults/deck-of-cards
// https://www.memorymatching.com/#

// Estilos
// Casino: no recuerdo de donde saqué las cartas, otro proyecto
// Geografía: https://github.com/catamphetamine/country-flag-icons/tree/master/flags/3x2
// Historia

import {Carta} from "./modulos/Carta.js";

import {Countdown} from "./modulos/Countdown.js";
import {Estadisticas} from "./modulos/Estadisticas.js";
import {Cartas} from "./modulos/Cartas.js";
import {Vidas} from "./modulos/Vidas.js";

import {Estilos} from "./modulos/Estilos.js";
import {Sonidos} from "./modulos/Sonidos.js";

import {Resultados} from "./modulos/Resultados.js";

class Parametros {

  static PARAMETROS_FORM = document.getElementById("parametros");
  static BOTONES_TEMATICA = document.getElementById("tematicas");
  static DIV_CONTENEDOR = document.getElementById("menu-setup");

  static escondidos = false;

  static sizeInput = document.getElementById("sizeInput");
  static lifesInput = document.getElementById("lifesInput");
  static minInput = document.getElementById("minInput");
  static secInput = document.getElementById("secInput");

  static casinoButton = document.getElementById("casinoButton");
  static geografiaButton = document.getElementById("geografiaButton");
  static historiaButton = document.getElementById("historiaButton");

  static formatearValoresMaximosYMinimos(){
    Parametros.sizeInput.setAttribute("max", Juego.MAX_PAREJAS);
    Parametros.sizeInput.setAttribute("min", Juego.MIN_PAREJAS);

    Parametros.lifesInput.setAttribute("max", Juego.MAX_VIDAS);
    Parametros.lifesInput.setAttribute("min", Juego.MIN_VIDAS);

    Parametros.minInput.setAttribute("max", Juego.MAX_MINUTOS);
    Parametros.minInput.setAttribute("min", Juego.MIN_MINUTOS);

    Parametros.secInput.setAttribute("max", Juego.MAX_SEGUNDOS);
    Parametros.secInput.setAttribute("min", Juego.MIN_SEGUNDOS);
  }

  static actualizarValoresPorDefecto(){
    Parametros.sizeInput.setAttribute("value", Gestor.numParejas);
    Parametros.lifesInput.setAttribute("value", Gestor.numVidas);
    Parametros.minInput.setAttribute("value", Gestor.tiempoMin);
    Parametros.secInput.setAttribute("value", Gestor.tiempoSec);
  }

  static activarListeners(){
    // Número de parejas o tamaño
    Parametros.sizeInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_PAREJAS && evento.target.value <= Juego.MAX_PAREJAS){
        Gestor.numParejas = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    // Número de vidas
    Parametros.lifesInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_VIDAS && evento.target.value <= Juego.MAX_VIDAS){
        Gestor.numVidas = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    // Tiempo: minutos y segundos
    Parametros.minInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_MINUTOS && evento.target.value <= Juego.MAX_MINUTOS){
        Gestor.tiempoMin = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    Parametros.secInput.addEventListener("input", (evento) => {
      if (evento.target.value >= Juego.MIN_SEGUNDOS && evento.target.value <= Juego.MAX_SEGUNDOS){
        Gestor.tiempoSec = evento.target.value;
        Gestor.reiniciarJuego();
      }
    });
    // Temática o estilo del juego
    Parametros.casinoButton.addEventListener("click", () => {
      Gestor.tema = "casino";
      Gestor.reiniciarJuego();
    });
    Parametros.geografiaButton.addEventListener("click", () => {
      Gestor.tema = "geografia";
      Gestor.reiniciarJuego();
    });
    Parametros.historiaButton.addEventListener("click", () => {
      Gestor.tema = "historia";
      Gestor.reiniciarJuego();
    });
    // Submit parámetros
    Parametros.PARAMETROS_FORM.addEventListener("submit", (evento) => {
      evento.preventDefault();
      Parametros.esconder();
      Gestor.iniciarJuego();
    });
  }

  static esconder(){
    if(!Parametros.escondidos){
      Parametros.DIV_CONTENEDOR.classList.remove("revelado");
      Parametros.DIV_CONTENEDOR.classList.add("escondido");
      Parametros.escondidos = true;
    }
  }

  static revelar(){
    if(Parametros.escondidos){
      Parametros.DIV_CONTENEDOR.classList.remove("escondido");
      Parametros.DIV_CONTENEDOR.classList.add("revelado");
      Parametros.escondidos = false;
    }
  }

}

class Juego {
  // Constantes
  static PERIODO_ESPERA = 500; // Milisegundos desde que se muestran las 2 cartas seleccionadas hasta que se vuelven a ocultar
  
  static MIN_PAREJAS = 1;
  static MAX_PAREJAS = 40;
  static MAX_VIDAS = 15;
  static MIN_VIDAS = 1;
  static MIN_MINUTOS = 0;
  static MAX_MINUTOS = 59;
  static MIN_SEGUNDOS = 0;
  static MAX_SEGUNDOS = 59;

  // Variables para controlar el estado del juego
  jugando = false;
  intervaloComprobarFinJuego;

  constructor(
    numParejas,
    numVidasInicial,
    limiteTiempoMin,
    limiteTiempoSeg,
    estilo
  ) {
    this.setTema(estilo);
    this.setParejas(numParejas);
    this.setVidas(numVidasInicial);
    this.setCountdown(limiteTiempoMin, limiteTiempoSeg);
  }

  setTema(tema) {
    Estilos.cambiarTematica(tema);
  }

  setParejas(numParejas) {
    if (!Cartas.divEstaVacio()) Cartas.reset(); // Por si acaso

    // Genera ids de pareja aleatorios sin repetidos entre 0 y el número máximo de cartas para el estilo seleccionado
    let idsPareja = new Set();
    while (idsPareja.size != numParejas)
      idsPareja.add(Math.round(Math.random() * (Estilos.totalCartas - 1)));

    let idCarta = 0;
    for (let idPareja of idsPareja) {
      let carta1 = new Carta(
        Estilos.rutaCartas + idPareja + Estilos.extensionCartas,
        Estilos.rutaReversoCarta,
        idCarta,
        idPareja
      );
      idCarta++;
      let carta2 = new Carta(
        Estilos.rutaCartas + idPareja + Estilos.extensionCartas,
        Estilos.rutaReversoCarta,
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
    if (!Vidas.estaVacio()) Vidas.vaciar(); // Por si acaso también
    for (let i = 0; i < numVidasInicial; i++) {
      Vidas.agregarVida(Estilos.rutaIconoVida);
    }
  }

  setCountdown(limiteTiempoMin, limiteTiempoSeg) {
    if (!Countdown.isOver()) Countdown.stop(); // También por si acaso
    Countdown.set(limiteTiempoMin, limiteTiempoSeg);
    Countdown.update();
  }

  empezar() {
    let exito = false;
    if (!this.jugando) {
      Countdown.start();
      this.activarBucleComprobarFinJuego();
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
      this.desactivarBucleComprobarFinJuego();
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
    this.desactivarBucleComprobarFinJuego();
  }

  activarListeners() {    
    for (let carta of Cartas.lista) {
      carta.HTMLImageElement.addEventListener("click", () => {
        if (Cartas.numCartasVisibles == 0 && carta.mostrar()) {
          Cartas.cartaVisible = carta;
          Cartas.numCartasVisibles ++;
          Cartas.yaVistas.add(carta);
        } else if (Cartas.numCartasVisibles == 1 && carta.mostrar()) {
          Cartas.numCartasVisibles ++;
          if (carta.esParejaDe(Cartas.cartaVisible)) {
            carta.bloquear();
            Cartas.cartaVisible.bloquear();
            if(Cartas.yaSeHaVistoLaParejaDe(Cartas.cartaVisible)){
              Estadisticas.numAciertos++;
            }
            Sonidos.reproducirAcierto();
            Estadisticas.numMovimientos++;
            Estadisticas.actualizar();
            Cartas.numCartasVisibles -= 2;
          } else {
            setTimeout(() => {
              carta.ocultar();
              Cartas.cartaVisible.ocultar();
              if(Cartas.yaSeHaVistoLaParejaDe(Cartas.cartaVisible)){
                Estadisticas.numFallos++;
                Vidas.eliminarVida();
              }
              Sonidos.reproducirFallo();
              //Vidas.eliminarVida();
              Estadisticas.numMovimientos++;
              Estadisticas.actualizar();
              Cartas.numCartasVisibles -= 2;
              Cartas.yaVistas.add(carta);
            }, Juego.PERIODO_ESPERA);
          }
        }
      });
    }
  }

  activarBucleComprobarFinJuego(){
    this.intervaloComprobarFinJuego = setInterval(() => {
      if(this.haPerdido()){
        Resultados.guardarEnLocalStorage(
          "derrota",
          Estadisticas.numAciertos,
          Estadisticas.numFallos,
          Estadisticas.numMovimientos,
          Countdown.tiempoTranscurrido(),
          "estilos/especificos/" + Estilos.tema + ".css"
        );
        this.redirectToResultPage();
      } 
      if(this.haGanado()){
        Resultados.guardarEnLocalStorage(
          "victoria",
          Estadisticas.numAciertos,
          Estadisticas.numFallos,
          Estadisticas.numMovimientos,
          Countdown.tiempoTranscurrido(),
          "estilos/especificos/" + Estilos.tema + ".css"        
        )
        this.redirectToResultPage();
      }
    }, 500);
  }

  desactivarBucleComprobarFinJuego(){
    clearInterval(this.intervaloComprobarFinJuego);
  }

  haPerdido() {
    return Vidas.estaVacio() || Countdown.isOver();
  }

  haGanado() {
    return Cartas.estanTodasResueltas();
  }

  // https://stackoverflow.com/questions/2018567/loading-another-html-page-from-javascript
  redirectToResultPage() {
    window.location.href = "./resultados.html";
  }
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

  // Botones para controlar el tamaño de las cartas así como el estado de la partida
  static augmentSizeButton = document.getElementById("augmentSizeButton");
  static reduceSizeButton = document.getElementById("reduceSizeButton");
  static startButton = document.getElementById("startButton");
  static configureButton = document.getElementById("configureButton");
  static pauseButton = document.getElementById("pauseButton");
  static restartButton = document.getElementById("restartButton");

  static activarListeners() {

    Gestor.augmentSizeButton.addEventListener("click", () => {
      Cartas.aumentarDimensiones();
    });
    Gestor.reduceSizeButton.addEventListener("click", () => {
      Cartas.disminuirDimensiones();
    });
    Gestor.configureButton.addEventListener("click", () => {
      Parametros.revelar();
      Gestor.pausarJuego();
    });
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
      }, Juego.PERIODO_ESPERA);
    });
    Sonidos.activarBoton();

  }

  static iniciarJuego() {
    if (Gestor.juego.empezar()) {
      Cartas.desvelar();
      Gestor.esconder(Gestor.startButton);
      Parametros.esconder();
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
  }
  static mostrar(ElementoHTML){
    ElementoHTML.removeAttribute("hidden");
  }
}

Parametros.formatearValoresMaximosYMinimos();
Parametros.actualizarValoresPorDefecto();
Parametros.activarListeners();
Gestor.activarListeners();