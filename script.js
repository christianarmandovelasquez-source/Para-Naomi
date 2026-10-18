const botonCarta = document.getElementById("botonCarta");
const mensajeExtra = document.getElementById("mensajeExtra");
const botonMusica = document.getElementById("botonMusica");
const musica = document.getElementById("musica");
const corazones = document.getElementById("corazones");

botonCarta.addEventListener("click", () => {
  mensajeExtra.classList.toggle("oculto");

  if (mensajeExtra.classList.contains("oculto")) {
    botonCarta.textContent = "Abra su corazón 💌";
  } else {
    botonCarta.textContent = "Cerrar cartita ❤️";
    crearCorazones(18);
  }
});

botonMusica.addEventListener("click", async () => {
  if (musica.paused) {
    try {
      await musica.play();
      botonMusica.textContent = "⏸ Pausar música";
    } catch (error) {
      alert("Agregue el archivo musica.mp3 a la carpeta ParaNaomi.");
    }
  } else {
    musica.pause();
    botonMusica.textContent = "🎵 Reproducir música";
  }
});

function crearCorazones(cantidad = 1) {
  for (let i = 0; i < cantidad; i++) {
    const corazon = document.createElement("span");

    corazon.className = "corazon";
    corazon.textContent = ["🤎", "✰", "𓆉", "𓆉", "🤎"][
      Math.floor(Math.random() * 5)
    ];

    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = 15 + Math.random() * 25 + "px";
    corazon.style.animationDuration = 4 + Math.random() * 5 + "s";

    corazones.appendChild(corazon);

    corazon.addEventListener("animationend", () => {
      corazon.remove();
    });
  }
}

setInterval(() => crearCorazones(), 800);
const corazonMagico = document.getElementById("corazonMagico");

corazonMagico.addEventListener("click", () => {
  // Cada toque crea 20 corazones nuevos
  crearCorazones(20);

  // Cambia un momento el tamaño del corazón
  corazonMagico.style.transform = "scale(1.35)";

  setTimeout(() => {
    corazonMagico.style.transform = "";
  }, 180);
});
const fechaInicio = new Date(2025, 11, 24, 0, 0, 0);

function actualizarContador() {
  const ahora = new Date();

  if (ahora < fechaInicio) {
    ["meses", "dias", "horas", "minutos", "segundos"]
      .forEach(id => {
        document.getElementById(id).textContent = "0";
      });
    return;
  }

  // Calcular meses completos de calendario
  let meses =
    (ahora.getFullYear() - fechaInicio.getFullYear()) * 12 +
    (ahora.getMonth() - fechaInicio.getMonth());

  let inicioMeses = new Date(fechaInicio);
  inicioMeses.setMonth(inicioMeses.getMonth() + meses);

  if (inicioMeses > ahora) {
    meses--;
    inicioMeses = new Date(fechaInicio);
    inicioMeses.setMonth(inicioMeses.getMonth() + meses);
  }

  // Tiempo restante desde los meses completos
  let restante = ahora.getTime() - inicioMeses.getTime();

  const diaMs = 24 * 60 * 60 * 1000;
  const horaMs = 60 * 60 * 1000;
  const minutoMs = 60 * 1000;

  const dias = Math.floor(restante / diaMs);
  restante %= diaMs;

  const horas = Math.floor(restante / horaMs);
  restante %= horaMs;

  const minutos = Math.floor(restante / minutoMs);
  const segundos = Math.floor((restante % minutoMs) / 1000);

  document.getElementById("meses").textContent = meses;
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);
const pistaFotos = document.getElementById("pistaFotos");

if (pistaFotos) {
  const diapositivas = Array.from(
    pistaFotos.querySelectorAll(".diapositiva")
  );

  const numeroFoto = document.getElementById("numeroFoto");
  const puntosFotos = document.getElementById("puntosFotos");
  const anterior = document.getElementById("fotoAnterior");
  const siguiente = document.getElementById("fotoSiguiente");

  let fotoActual = 0;

  // Crear un punto por cada fotografía
  diapositivas.forEach((foto, indice) => {
    const punto = document.createElement("button");

    punto.type = "button";
    punto.className = "punto-foto";
    punto.setAttribute("aria-label", `Ver foto ${indice + 1}`);

    punto.addEventListener("click", () => {
      mostrarFoto(indice);
    });

    puntosFotos.appendChild(punto);
  });

  function mostrarFoto(indice) {
    fotoActual = (indice + diapositivas.length) %
      diapositivas.length;

    pistaFotos.style.transform =
      `translateX(-${fotoActual * 100}%)`;

    numeroFoto.textContent =
      `${fotoActual + 1} / ${diapositivas.length}`;

    Array.from(puntosFotos.children).forEach((punto, i) => {
      punto.classList.toggle("activo", i === fotoActual);
      punto.setAttribute(
        "aria-current",
        i === fotoActual ? "true" : "false"
      );
    });
  }

  anterior.addEventListener("click", () => {
    mostrarFoto(fotoActual - 1);
  });

  siguiente.addEventListener("click", () => {
    mostrarFoto(fotoActual + 1);
  });

  mostrarFoto(0);
}