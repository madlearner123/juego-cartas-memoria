// https://stackoverflow.com/questions/42743511/reading-writing-to-a-file-in-javascript
export class Resultados {
  static IMG_RESULTADO = document.querySelector("img.resultado");
  static P_RESULTADO = document.querySelector("p.resultado");
  static SPAN_FALLOS = document.querySelector("span#fallos");
  static SPAN_MOVIMIENTOS = document.querySelector("span#movimientos");
  static SPAN_ACIERTOS = document.querySelector("span#aciertos");
  static SPAN_TIEMPO = document.querySelector("span#tiempo");
  static BUTTON_PLAY_AGAIN = document.querySelector("button#playAgainButton");
  static LINK_ESTILO = document.querySelector("link#estilo-especifico");

  static KEY_RESULTADO = "resultado";
  static KEY_FALLOS = "fallos";
  static KEY_MOVIMIENTOS = "movimientos";
  static KEY_ACIERTOS = "aciertos";
  static KEY_TIEMPO = "tiempo";
  static KEY_ESTILO = "estilo-especifico";

  static guardarEnLocalStorage(
    resultado,
    aciertos,
    fallos,
    movimientos,
    tiempo,
    estilo
  ) {
    localStorage.setItem(Resultados.KEY_RESULTADO, resultado);
    localStorage.setItem(Resultados.KEY_ACIERTOS, aciertos);
    localStorage.setItem(Resultados.KEY_FALLOS, fallos);
    localStorage.setItem(Resultados.KEY_MOVIMIENTOS, movimientos);
    localStorage.setItem(Resultados.KEY_TIEMPO, tiempo);
    localStorage.setItem(Resultados.KEY_ESTILO, estilo);
  }

  static cargarEnElHTML() {
    Resultados.LINK_ESTILO.href = localStorage.getItem(Resultados.KEY_ESTILO);
    if (
      localStorage.getItem(Resultados.KEY_RESULTADO).toLowerCase() == "victoria"
    ) {
      Resultados.IMG_RESULTADO.src = "./media/iconos/victoria.png";
      Resultados.P_RESULTADO.innerHTML = "¡Has ganado!";
    } else {
      Resultados.IMG_RESULTADO.src = "./media/iconos/derrota.png";
      Resultados.P_RESULTADO.innerHTML = "¡Has perdido!";
    }
    Resultados.SPAN_FALLOS.innerHTML = localStorage.getItem(
      Resultados.KEY_FALLOS
    );
    Resultados.SPAN_MOVIMIENTOS.innerHTML = localStorage.getItem(
      Resultados.KEY_MOVIMIENTOS
    );
    Resultados.SPAN_ACIERTOS.innerHTML = localStorage.getItem(
      Resultados.KEY_ACIERTOS
    );
    Resultados.SPAN_TIEMPO.innerHTML = localStorage.getItem(
      Resultados.KEY_TIEMPO
    );
    Resultados.BUTTON_PLAY_AGAIN.addEventListener("click", () => {
      window.location.href = "./index.html";
    })
  }
}
