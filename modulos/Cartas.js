export class Cartas {    
  static cuenta = 0;            // Número de cartas dentro del div/section
  static DIV_VELO = document.getElementById("velo-cartas");
  static DIV_CONTENEDOR = document.getElementById("cartas");

  static numCartasVisibles = 0; // Número de cartas en estado Mostrado
  static cartaVisible;          // Referencia a la Carta mostrada
  static lista = [];            // Lista de objetos Carta
  static yaVistas = new Set();  // Cartas ya vistas en el transcurso del juego
  
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

    static estanTodasResueltas(){
      for(let carta of Cartas.lista){
        if(!carta.bloqueada) return false;
      }
      return true;
    }

    static yaSeHaVistoLaParejaDe(carta){
      for(let otraCarta of Cartas.yaVistas){
        if(carta.esParejaDe(otraCarta)) return true;
      }
      return false;
    }

    static aumentarDimensiones(){
      for(let carta of Cartas.lista) carta.reDimensionar(0.05);
    }

    static disminuirDimensiones(){
      for(let carta of Cartas.lista) carta.reDimensionar(-0.05);
    }
  
    static reset() {
      while (!Cartas.divEstaVacio()) Cartas.eliminarCartaDelDiv();
      Cartas.numCartasVisibles = 0;
      Cartas.lista = [];
      Cartas.yaVistas = new Set();
    }
  }