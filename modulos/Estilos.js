export class Estilos {
  static tema = "casino";

  static temas = {
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

  static rutaCartas = "media/" + Estilos.tema + "/cartas/";
  static extensionCartas = Estilos.temas[Estilos.tema].extensionCartas;
  static rutaReversoCarta =
    "media/" +
    Estilos.tema +
    "/reverso" +
    Estilos.temas[Estilos.tema].extensionReverso;

  static totalCartas = Estilos.temas[Estilos.tema].totalCartas;

  static rutaIconoVida = "media/" + Estilos.tema + "/vidas/" + Estilos.temas[Estilos.tema].iconoVida;

  static cambiarTematica(nombreTematica) {
    Estilos.tema = nombreTematica;
    Estilos.HTMLLinkElement.href =
      "estilos/especificos/" + nombreTematica + ".css";
    Estilos.rutaCartas = "media/" + nombreTematica + "/cartas/";
    Estilos.extensionCartas = Estilos.temas[nombreTematica].extensionCartas;
    Estilos.rutaReversoCarta =
        "media/" +
        nombreTematica +
        "/reverso" +
        Estilos.temas[nombreTematica].extensionReverso;
    
    Estilos.totalCartas = Estilos.temas[nombreTematica].totalCartas;
    
    Estilos.rutaIconoVida = "media/" + nombreTematica + "/vidas/" + Estilos.temas[nombreTematica].iconoVida;   
  }
}