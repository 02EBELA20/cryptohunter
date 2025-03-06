document.addEventListener("DOMContentLoaded", () => {
  const moneyContainer = document.createElement("div");
  moneyContainer.classList.add("money-rain-container");
  document.body.appendChild(moneyContainer);

  function createMoney() {
    const money = document.createElement("img");
    money.src = "images/100lari.png"; // ჩასვი კუპიურის სურათი
    money.classList.add("money");

    let startPosX = Math.random() * window.innerWidth;
    let duration = Math.random() * 5 + 3; // კუპიურის ვარდნის დრო

    money.style.left = `${startPosX}px`;
    money.style.animationDuration = `${duration}s`;

    moneyContainer.appendChild(money);

    setTimeout(() => {
      money.remove();
    }, duration * 1000);
  }

  setInterval(createMoney, 400); // 200 მილიწამში ერთხელ ემატება ახალი კუპიურა
});

document.addEventListener("DOMContentLoaded", function () {
  const connectButton = document.getElementById("connectMetaMask");

  connectButton.addEventListener("click", async () => {
      if (typeof window.ethereum !== "undefined") {
          try {
              // MetaMask-ის მოთხოვნა ანგარიშზე მიერთებისთვის
              const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
              alert("MetaMask Connected! Address: " + accounts[0]);
          } catch (error) {
              console.error("Connection failed:", error);
              alert("MetaMask Connection Failed!");
          }
      } else {
          alert("MetaMask is not installed. Please install it from https://metamask.io/");
      }
  });
});




const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.x,
                y: this.y,
                speed: Math.random() * 3 + 1,
                angle: Math.random() * 2 * Math.PI,
                alpha: 1
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.02;
        });

        this.particles = this.particles.filter(p => p.alpha > 0);
    }

    draw() {
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

let fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6; 
    const colors = ["#ff0000", "#ecff33", "#ffeb00", "#00ff00", "#ecff33", "#9900ff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    fireworks.push(new Firework(x, y, color));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(f => {
        f.update();
        f.draw();
    });

    fireworks = fireworks.filter(f => f.particles.length > 0);
    requestAnimationFrame(animate);
}

setInterval(createFirework, 1000);
animate();

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const videos = document.querySelectorAll(".carousel iframe");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const videoWidth = videos[0].clientWidth;

  function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
  }

  nextBtn.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % videos.length;
      updateCarousel();
  });

  prevBtn.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + videos.length) % videos.length;
      updateCarousel();
  });
});
