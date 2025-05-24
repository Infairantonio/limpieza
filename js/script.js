window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.pointerEvents = "none";
  setTimeout(() => {
    preloader.remove();
  }, 500);
});

// ===============================
// 1. CONTROL DE VIDEO HERO (Mute/Play)
// ===============================
// ===============================
// VIDEO HERO: Intenta reproducir con sonido, botón para silenciar
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  // ==== 1. CONTROL DE VIDEO HERO (BOTÓN CIRCULAR ADAPTADO) ====
  const videoDesktop = document.querySelector(".video-desktop");
  const videoMobile = document.querySelector(".video-mobile");
  const muteBtn = document.getElementById("toggleMuteBtn");
  const icono = muteBtn.querySelector("i"); // Icono FontAwesome dentro del botón

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const video = isMobile ? videoMobile : videoDesktop;

  if (video && muteBtn) {
    video.muted = true;
    video.volume = 1.0;

    video.addEventListener("loadedmetadata", () => {
      video.play().catch((err) => {
        console.warn("Autoplay falló:", err);
      });
    });

    // Primer clic en cualquier parte activa sonido (excepto si es sobre el botón)
    const activarSonido = () => {
      video.muted = false;
      icono.classList.replace("fa-volume-up", "fa-volume-mute");
      document.removeEventListener("click", activarSonido);
    };

    document.addEventListener("click", activarSonido);

    // Al hacer clic en el botón, se alterna el mute
    muteBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // evitar que dispare el document click
      video.muted = !video.muted;

      if (video.muted) {
        icono.classList.replace("fa-volume-mute", "fa-volume-up");
      } else {
        icono.classList.replace("fa-volume-up", "fa-volume-mute");
      }
    });

    // Estado inicial del icono
    icono.classList.add("fa-volume-up");
  }

  // ==== 2. MENSAJES IMPACTANTES EN BUCLE ====
  const mensajes = [
    "Transforma tu espacio",
    "Desinfección efectiva",
    "Cuidado de jardines",
    "Limpieza industrial especializada",
    "Soluciones de limpieza completas",
    "Contáctanos",
    "Compromiso en cada servicio",
  ];

  const mensajeUnico = document.getElementById("mensajeUnico");
  let index = 0;

  function mostrarSiguienteMensaje() {
    mensajeUnico.textContent = mensajes[index];
    mensajeUnico.classList.remove("d-none", "animate__fadeOut");
    mensajeUnico.classList.add("animate__fadeInDown");

    setTimeout(() => {
      mensajeUnico.classList.remove("animate__fadeInDown");
      mensajeUnico.classList.add("animate__fadeOut");

      setTimeout(() => {
        mensajeUnico.classList.add("d-none");
        index++;

        if (index >= mensajes.length) {
          index = 0;
          setTimeout(mostrarSiguienteMensaje, 4000);
        } else {
          mostrarSiguienteMensaje();
        }
      }, 2000);
    }, 4000);
  }

  mostrarSiguienteMensaje();
});

// ===============================
// 5. Cerrar navbar en móviles al hacer clic en un enlace
// ===============================
document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});

// ===============================
// 2. SCROLL SUAVE PARA ANCLAS DEL MENÚ
// ===============================
document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      const yOffset = -100; // Ajuste para navbar fija
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// ===============================
// 3. MODAL DE IMÁGENES (Galería con Zoom)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const modalImage = document.getElementById("modalImage");
  const galleryImages = document.querySelectorAll(".gallery-click");

  // Cada imagen al hacer clic carga su versión en grande en el modal
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      const imgSrc = img.getAttribute("data-img");
      modalImage.setAttribute("src", imgSrc);
    });
  });
});

// ===============================
// 4. CANVAS: SELLO ANIMADO 100% GARANTÍA
// ===============================
const canvas = document.getElementById("selloGarantia");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let angle = 0;

  function drawSello() {
    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h / 2;

    // Detectar si el body tiene clase tema-oscuro
    const isDarkMode = document.body.classList.contains("tema-oscuro");

    // === MODO CLARO ===
    const colorBordeClaro = "#ffffff";
    const colorTextoClaro = "#ffffff";
    const sombraBordeClaro = "#ffffff";
    const sombraAnimadoClaro = "#81c784"; // verde original
    const fondoClaro = "radial-gradient(circle, #c8e6c9 0%, #a5d6a7 100%)";

    // === MODO OSCURO ===
    const colorBordeOscuro = "#66ccff";
    const colorTextoOscuro = "#eeeeee";
    const sombraBordeOscuro = "#66ccff";
    const sombraAnimadoOscuro = "#66ccff";
    const fondoOscuro = "#1a1a1a";

    // Limpiar fondo (modo claro: simular gradiente manualmente)
    if (isDarkMode) {
      ctx.fillStyle = fondoOscuro;
      ctx.fillRect(0, 0, w, h);
    } else {
      // Gradiente radial manual
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        120
      );
      gradient.addColorStop(0, "#c8e6c9");
      gradient.addColorStop(1, "#a5d6a7");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    // Colores actuales según el tema
    const colorBorde = isDarkMode ? colorBordeOscuro : colorBordeClaro;
    const colorTexto = isDarkMode ? colorTextoOscuro : colorTextoClaro;
    const sombraBorde = isDarkMode ? sombraBordeOscuro : sombraBordeClaro;
    const sombraAnimado = isDarkMode ? sombraAnimadoOscuro : sombraAnimadoClaro;

    // Círculo exterior
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = 8;
    ctx.shadowColor = sombraBorde;
    ctx.shadowBlur = 30;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Texto
    ctx.font = "bold 20px Poppins";
    ctx.fillStyle = colorTexto;
    ctx.textAlign = "center";
    ctx.fillText("100% Limpieza", centerX, centerY - 10);
    ctx.fillText("Garantizada", centerX, centerY + 20);

    // Círculo interior animado
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI / 3);
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = 6;
    ctx.shadowColor = sombraAnimado;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.restore();

    angle += 0.01;
    requestAnimationFrame(drawSello);
  }

  drawSello();
}

// ===============================
// 6. Cambiar tema claro/oscuro
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("temaToggleBtn");
  const body = document.body;

  // Cargar preferencia si existe
  if (localStorage.getItem("tema") === "oscuro") {
    body.classList.add("tema-oscuro");
    toggleBtn.textContent = "☀️ Modo claro";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("tema-oscuro");

    if (body.classList.contains("tema-oscuro")) {
      toggleBtn.textContent = "☀️ Modo claro";
      localStorage.setItem("tema", "oscuro");
    } else {
      toggleBtn.textContent = "🌙 Modo oscuro";
      localStorage.setItem("tema", "claro");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnScrollTop");
  let timeout;

  window.addEventListener("scroll", function () {
    // Si scroll mayor a 300px, mostrar
    if (window.scrollY > 300) {
      btn.style.display = "flex";

      // Reinicia temporizador si hay scroll
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        btn.style.display = "none";
      }, 1500);
    } else {
      btn.style.display = "none";
    }
  });
});

const btnWhatsApp = document.getElementById("btnWhatsApp");
let hideTimeout;

window.addEventListener("scroll", () => {
  btnWhatsApp.style.display = "flex";

  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    btnWhatsApp.style.display = "none";
  }, 2000);
});
