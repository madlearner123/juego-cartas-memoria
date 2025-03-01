export class Vidas {
    static cuenta = 0;
  
    static DIV_CONTENEDOR = document.getElementById("vidas");
  
    static agregarVida(rutaIconoVida) {
      let vida = document.createElement("img");
      vida.src = rutaIconoVida;
      vida.alt = "vida";
      vida.classList.add("vida");
      Vidas.DIV_CONTENEDOR.append(vida);
      Vidas.cuenta++;
    }
  
    static eliminarVida() {
      if (Vidas.cuenta > 0) {
        Vidas.DIV_CONTENEDOR.lastElementChild.remove();
        Vidas.cuenta--;
      }
    }
  
    static estaVacio() {
      return Vidas.cuenta == 0;
    }
  
    static vaciar() {
      while (!Vidas.estaVacio()) Vidas.eliminarVida();
    }
  }