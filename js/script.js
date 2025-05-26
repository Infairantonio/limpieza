// ===============================
// 0. PRELOADER (pantalla de carga)
// ===============================
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.pointerEvents = "none";
  setTimeout(() => {
    preloader.remove();
  }, 500);
});

// ===============================
// 1. VIDEO HERO (Mute/Play y activación por clic)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const videoDesktop = document.querySelector(".video-desktop");
  const videoMobile = document.querySelector(".video-mobile");
  const muteBtn = document.getElementById("toggleMuteBtn");
  const icono = muteBtn.querySelector("i");

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

    const activarSonido = () => {
      video.muted = false;
      icono.classList.replace("fa-volume-up", "fa-volume-mute");
      document.removeEventListener("click", activarSonido);
    };

    document.addEventListener("click", activarSonido);

    muteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      video.muted = !video.muted;

      if (video.muted) {
        icono.classList.replace("fa-volume-mute", "fa-volume-up");
      } else {
        icono.classList.replace("fa-volume-up", "fa-volume-mute");
      }
    });

    icono.classList.add("fa-volume-up");
  }

  // ===============================
  // 2. MENSAJES ANIMADOS EN BUCLE
  // ===============================
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
        if (index >= mensajes.length) index = 0;
        setTimeout(mostrarSiguienteMensaje, 4000);
      }, 2000);
    }, 4000);
  }

  mostrarSiguienteMensaje();
});

// ===============================
// 3. SCROLL SUAVE EN MENÚ ANCLA
// ===============================
document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// ===============================
// 4. CERRAR MENÚ EN MÓVIL TRAS CLIC
// ===============================
document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  });
});

// ===============================
// 5. MODAL DE IMÁGENES EN GALERÍA
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const modalImage = document.getElementById("modalImage");
  const galleryImages = document.querySelectorAll(".gallery-click");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      const imgSrc = img.getAttribute("data-img");
      modalImage.setAttribute("src", imgSrc);
    });
  });
});

// ===============================
// 6. ACCESIBILIDAD CON TECLADO EN GALERÍA
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        img.click();
      }
    });
  });
});

// ===============================
// 7. SELLO ANIMADO CON CANVAS
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
    const isDarkMode = document.body.classList.contains("tema-oscuro");

    const colorBorde = isDarkMode ? "#66ccff" : "#ffffff";
    const colorTexto = isDarkMode ? "#eeeeee" : "#ffffff";
    const sombraBorde = isDarkMode ? "#66ccff" : "#ffffff";
    const sombraAnimado = isDarkMode ? "#66ccff" : "#81c784";

    ctx.clearRect(0, 0, w, h);
    if (!isDarkMode) {
      const gradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 120);
      gradient.addColorStop(0, "#c8e6c9");
      gradient.addColorStop(1, "#a5d6a7");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, w, h);
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = 8;
    ctx.shadowColor = sombraBorde;
    ctx.shadowBlur = 30;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font = "bold 20px Poppins";
    ctx.fillStyle = colorTexto;
    ctx.textAlign = "center";
    ctx.fillText("100% Limpieza", centerX, centerY - 10);
    ctx.fillText("Garantizada", centerX, centerY + 20);

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
// 8. CAMBIAR TEMA CLARO / OSCURO
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("temaToggleBtn");
  const body = document.body;

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

// ===============================
// 9. BOTÓN VOLVER ARRIBA (desaparece tras scroll)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnScrollTop");
  let timeout;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.style.display = "flex";
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        btn.style.display = "none";
      }, 1500);
    } else {
      btn.style.display = "none";
    }
  });
});

// ===============================
// 10. BOTÓN WHATSAPP (visible al hacer scroll)
// ===============================
const btnWhatsApp = document.getElementById("btnWhatsApp");
let hideTimeout;

window.addEventListener("scroll", () => {
  btnWhatsApp.style.display = "flex";
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    btnWhatsApp.style.display = "none";
  }, 2000);
});
