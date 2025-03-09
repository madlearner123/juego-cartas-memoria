export class Carta {
  idCarta;
  idPareja;
  HTMLImageElement;
  rutaImgFrente;
  rutaImgDetras;

  bloqueada = false;
  oculta = true;

  constructor(rutaImgFrente, rutaReverso, idCarta, idPareja) {
    this.idCarta = idCarta;
    this.idPareja = idPareja;
    this.rutaImgFrente = rutaImgFrente;
    this.rutaImgDetras = rutaReverso;

    this.HTMLImageElement = document.createElement("img");
    this.HTMLImageElement.classList.add("carta");
    this.HTMLImageElement.classList.add("oculta");
    this.HTMLImageElement.src = this.rutaImgDetras;
    this.HTMLImageElement.id = idCarta;
    this.HTMLImageElement.setAttribute("id-pareja", idPareja);
  }

  ocultar() {
    let exito = false;
    if (!this.oculta && !this.bloqueada) {
      this.HTMLImageElement.src = this.rutaImgDetras;
      this.HTMLImageElement.classList.remove("mostrada");
      this.HTMLImageElement.classList.add("oculta");
      this.oculta = true;
      exito = true;
    }
    return exito;
  }

  mostrar() {
    let exito = false;
    if (this.oculta && !this.bloqueada) {
      this.HTMLImageElement.src = this.rutaImgFrente;
      this.HTMLImageElement.classList.remove("oculta");
      this.HTMLImageElement.classList.add("mostrada");
      this.oculta = false;
      exito = true;
    }
    return exito;
  }

  bloquear() {
    let exito = false;
    if (!this.oculta && !this.bloqueada) {
      this.HTMLImageElement.classList.remove("mostrada");
      this.HTMLImageElement.classList.add("bloqueada");
      this.bloqueada = true;
      exito = true;
    }
    return exito;
  }

  esParejaDe(carta) {
    return this.idPareja == carta.idPareja && this.idCarta != carta.idCarta;
  }

  reDimensionar(porcentaje) {
    let widthCarta = (1 + porcentaje) * this.HTMLImageElement.width;
    let heightCarta = (1 + porcentaje) * this.HTMLImageElement.height;
    if (widthCarta > 50 && widthCarta < 500) {
      this.HTMLImageElement.style.width = widthCarta + "px";
      this.HTMLImageElement.style.height = heightCarta + "px";
    }
  }
}
