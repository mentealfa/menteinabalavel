// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// ===== REVEAL AO SCROLL (efeito premium) =====
const reveals = document.querySelectorAll("section, .card, .module-card, .depo-card");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ===== FLIP DOS CARDS =====
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});


// ===== CARROSSEL (AUTO + DRAG) =====
const track = document.querySelector(".carousel-track");

if (track) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // DRAG
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // AUTOPLAY
  let autoScroll = setInterval(() => {
    track.scrollLeft += 1;
  }, 20);

  track.addEventListener("mouseenter", () => clearInterval(autoScroll));
  track.addEventListener("mouseleave", () => {
    autoScroll = setInterval(() => {
      track.scrollLeft += 1;
    }, 20);
  });
}


// ===== PLAYER DE ÁUDIO =====
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");

if (audio && playBtn) {

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.innerText = "Pausar";
    } else {
      audio.pause();
      playBtn.innerText = "Tocar";
    }
  });

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  });
}


// ===== MODAL DE IMAGEM =====
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".clickable-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

if (modal) {
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}


// ===== MICROINTERAÇÃO BOTÕES =====
document.querySelectorAll(".btn-primary").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.07)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});


// ===== CONTADOR (OPCIONAL PRA ESCASSEZ) =====
const countdown = document.getElementById("countdown");

if (countdown) {
  let time = 600; // 10 minutos

  const updateCountdown = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdown.innerText =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (time > 0) time--;
  };

  setInterval(updateCountdown, 1000);
}


// ===== PRELOAD SUAVE =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
