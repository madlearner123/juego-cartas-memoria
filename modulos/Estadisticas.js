export class Estadisticas {
    static numFallos = 0;
    static numAciertos = 0;
    static numMovimientos = 0;
    // racha, puntuación
  
    static spanFallos = document.getElementById("fallos");
    static spanAciertos = document.getElementById("aciertos");
    static spanMovimientos = document.getElementById("movimientos");
  
    static actualizar() {
      Estadisticas.spanFallos.innerHTML = Estadisticas.numFallos;
      Estadisticas.spanAciertos.innerHTML = Estadisticas.numAciertos;
      Estadisticas.spanMovimientos.innerHTML = Estadisticas.numMovimientos;
    }
  
    static reset() {
      Estadisticas.numFallos = 0;
      Estadisticas.numAciertos = 0;
      Estadisticas.numMovimientos = 0;
      Estadisticas.actualizar();
    }
  }