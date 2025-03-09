export class Sonidos {

    static habilitados = true;

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
    static MP3_FALLO = new Audio("../media/sonidos/fallo.mp3");
    static MP3_ACIERTO = new Audio("../media/sonidos/acierto.mp3");

    static soundButton = document.getElementById("soundButton");
    static soundIcon = document.querySelector("#soundButton img");

    static activarBoton(){
        Sonidos.soundButton.addEventListener("click", () => {
            if (Sonidos.habilitados){
                Sonidos.habilitados = false;
                Sonidos.soundIcon.src = "../media/iconos/no-sound.png";
            } else {
                Sonidos.habilitados = true;
                Sonidos.soundIcon.src = "../media/iconos/sound.png";
            }
        });
    }

    static reproducirFallo(){
        if(Sonidos.habilitados) Sonidos.MP3_FALLO.play();
    }

    static reproducirAcierto(){
        if(Sonidos.habilitados) Sonidos.MP3_ACIERTO.play();       
    }
}