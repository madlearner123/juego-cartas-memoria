export class Estilo {
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
    historia: {
        extensionCartas: ".jpg",
        extensionReverso: ".png",
        iconoVida: "vida.png",
        totalCartas: 46,
    },
  };

  static HTMLLinkElement = document.getElementById("estilo-especifico");

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
    Estilo.tema = nombreTematica;
    Estilo.HTMLLinkElement.href =
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