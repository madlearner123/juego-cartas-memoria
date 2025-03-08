export class Countdown {
  static HTML_SPAN_ELEMENT = document.getElementById("countdown");
  static MINUTOS_INICIO;
  static SEGUNDOS_INICIO;

  static minutos = 0;
  static segundos = 0;
  static interval;

  static set(minutos, segundos) {
    Countdown.MINUTOS_INICIO = minutos;
    Countdown.SEGUNDOS_INICIO = segundos;
    Countdown.minutos = minutos;
    Countdown.segundos = segundos;
  }

  static update() {
    Countdown.HTML_SPAN_ELEMENT.innerHTML =
      String(Countdown.minutos).padStart(2, "0") +
      ":" +
      String(Countdown.segundos).padStart(2, "0"); //https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
  }

  static isOver() {
    return Countdown.minutos <= 0 && Countdown.segundos <= 0;
  }

  static start() {
    Countdown.interval = setInterval(() => {
      if (Countdown.isOver()) Countdown.stop();
      else if (Countdown.segundos == 0) {
        Countdown.minutos--;
        Countdown.segundos = 59;
      } else {
        Countdown.segundos--;
      }
      Countdown.update();
    }, 1000);
  }

  static stop() {
    clearInterval(Countdown.interval);
  }

  static tiempoTranscurrido() {
    return (
      (Countdown.MINUTOS_INICIO - Countdown.minutos) * 60 +
      Countdown.SEGUNDOS_INICIO -
      Countdown.segundos
    );
  }
}
