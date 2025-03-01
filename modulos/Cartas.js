export class Cartas {
    static cuenta = 0;
    static numCartasVisibles = 0;
  
    static cartaVisible;  // Referencia a la Carta mostrada
    static lista = [];    // Lista de objetos Carta
  
    static DIV_VELO = document.getElementById("velo-cartas");
    static DIV_CONTENEDOR = document.getElementById("cartas");
  
    static agregarCartaAlDiv(carta) {
      Cartas.DIV_CONTENEDOR.append(carta.HTMLImageElement);
      Cartas.cuenta++;
    }
  
    static eliminarCartaDelDiv() {
      if (Cartas.cuenta > 0) {
        Cartas.DIV_CONTENEDOR.lastElementChild.remove();
        Cartas.cuenta--;
      }
    }
  
    static agregarTodasAlDiv() {
      for (let carta of Cartas.lista) Cartas.agregarCartaAlDiv(carta);
    }
  
    static divEstaVacio() {
      return Cartas.cuenta == 0;
    }
  
    static desvelar() {
      Cartas.DIV_VELO.setAttribute("hidden", "hidden");
    }
  
    static encubrir() {
      Cartas.DIV_VELO.removeAttribute("hidden");
    }
  
    static barajarLista() {
      Cartas.lista.sort((a, b) => Math.random() * 2 - 1); // Ordenar aleatoriamente, o sea, barajar. Créditos al profe de programación.
    }
  
    static reset() {
      while (!Cartas.divEstaVacio()) Cartas.eliminarCartaDelDiv();
      Cartas.numCartasVisibles = 0;
      Cartas.lista = [];
    }
  }