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
// 1. CONTROL DE VIDEO HERO (Mute/Play)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const videoDesktop = document.querySelector(".video-desktop");
  const videoMobile = document.querySelector(".video-mobile");
  const muteBtn = document.getElementById("toggleMuteBtn");
  const icon = muteBtn.querySelector("i");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const video = isMobile ? videoMobile : videoDesktop;

  if (video && muteBtn) {
    video.muted = true;
    video.volume = 1.0;

    video.addEventListener("loadedmetadata", () => {
      video.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    });

    icon.classList.add("fas", "fa-volume-up");

    const enableSound = () => {
      video.muted = false;
      icon.classList.replace("fa-volume-up", "fa-volume-mute");
      document.removeEventListener("click", enableSound);
    };

    document.addEventListener("click", enableSound);

    muteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        icon.classList.replace("fa-volume-mute", "fa-volume-up");
      } else {
        icon.classList.replace("fa-volume-up", "fa-volume-mute");
      }
    });
  }

  // ===============================
  // 2. FRASES DE IMPACTO EN LOOP
  // ===============================
  const messages = [
    "Transform your space",
    "Effective disinfection",
    "Garden care",
    "Specialized industrial cleaning",
    "Complete cleaning solutions",
    "Contact us",
    "Commitment in every service",
  ];
  const messageElement = document.getElementById("mensajeUnico");
  let index = 0;

  function showNextMessage() {
    messageElement.textContent = messages[index];
    messageElement.classList.remove("d-none", "animate__fadeOut");
    messageElement.classList.add("animate__fadeInDown");

    setTimeout(() => {
      messageElement.classList.remove("animate__fadeInDown");
      messageElement.classList.add("animate__fadeOut");

      setTimeout(() => {
        messageElement.classList.add("d-none");
        index++;
        if (index >= messages.length) {
          index = 0;
          setTimeout(showNextMessage, 4000);
        } else {
          showNextMessage();
        }
      }, 2000);
    }, 4000);
  }

  showNextMessage();
});

// ===============================
// 3. SCROLL SUAVE PARA ENLACES DE MENÚ
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
// 4. CERRAR NAVBAR EN MÓVIL TRAS CLIC
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
// 6. SELLO ANIMADO CON CANVAS (100% Limpieza Garantizada)
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

    if (isDarkMode) {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, w, h);
    } else {
      const gradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 120);
      gradient.addColorStop(0, "#c8e6c9");
      gradient.addColorStop(1, "#a5d6a7");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    const colorBorde = isDarkMode ? "#66ccff" : "#ffffff";
    const colorTexto = isDarkMode ? "#eeeeee" : "#ffffff";
    const sombraBorde = isDarkMode ? "#66ccff" : "#ffffff";
    const sombraAnimado = isDarkMode ? "#66ccff" : "#81c784";

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
    ctx.fillText("100% Clean", centerX, centerY - 10);
    ctx.fillText("Guaranteed", centerX, centerY + 20);

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
// 7. CAMBIO DE TEMA CLARO / OSCURO
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
// 8. BOTÓN SUBIR ARRIBA
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
// 9. BOTÓN WHATSAPP FLOTANTE
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

// ===============================
// 10. ACCESIBILIDAD: Activar modal con teclado (Enter en imágenes)
// ===============================
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.setAttribute('tabindex', '0'); // Hace que la imagen sea navegable con tabulador
  img.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      img.click(); // Simula clic para abrir el modal
    }
  });
});
