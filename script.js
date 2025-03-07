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

function countdownTimer() {
    const now = new Date();

    // 🔹 ნიუ-იორკის დროის (EST/EDT) აღება
    const options = { timeZone: "America/New_York", hour12: false };
    const currentNYTime = new Date(
        now.toLocaleString("en-US", options)
    );

    let target = new Date(currentNYTime);
    target.setHours(10, 0, 0, 0); // ნიუ-იორკის დროით 10:00 AM

    // თუ უკვე 10-ს გადაცდა, გადავდივართ მეორე დღეზე
    if (currentNYTime.getHours() >= 10) {
        target.setDate(target.getDate() + 1);
    }

    let diff = target - currentNYTime;
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    // 🔹 გამოტანა ფორმატით 00:00:00
    document.getElementById("timer").innerText =
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;
}

// ⏳ განახლება ყოველ წამში
setInterval(countdownTimer, 1000);
countdownTimer(); // პირველი გაშვება




// Sample winners data
let winners = [
    { name: "John Doe", date: "March 7, 2025", prize: "$100", proof: "100lari.png", video: "https://youtu.be/example1" },
    { name: "Jane Smith", date: "March 8, 2025", prize: "$200", proof: "100lari.png", video: "https://youtu.be/example2" }
];

// Pagination variables
let currentPage = 1;
const winnersPerPage = 30;

// Function to display winners on the page
function displayWinners() {
    const winnersBody = document.getElementById("winnersBody");
    winnersBody.innerHTML = "";

    const startIndex = (currentPage - 1) * winnersPerPage;
    const endIndex = startIndex + winnersPerPage;
    const paginatedWinners = winners.slice(startIndex, endIndex);

    paginatedWinners.forEach(winner => {
        let row = `
            <tr>
                <td>${winner.name}</td>
                <td>${winner.date}</td>
                <td>${winner.prize}</td>
                <td><img src="images/${winner.proof}" alt="Proof" class="proof-img" onclick="openFullScreen(this)"></td>
        <td><a href="${winner.video}" target="_blank" class="video-btn">🎥 Watch</a></td>
            </tr>
        `;
        winnersBody.innerHTML += row;
    });

    document.getElementById("page-number").innerText = `Page ${currentPage}`;
}

// Function to add a new winner
function addWinner(name, date, prize, proof, video) {
    winners.push({ name, date, prize, proof, video });
    displayWinners();
}

// Function to navigate pages
function nextPage() {
    if (currentPage * winnersPerPage < winners.length) {
        currentPage++;
        displayWinners();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayWinners();
    }
}
// Function to search winners
function searchWinners() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let winnersBody = document.getElementById("winnersBody");
    
    // If search is empty, reset the table
    if (input === "") {
        displayWinners();
        return;
    }

    let filteredWinners = winners.filter(winner => winner.name.toLowerCase().includes(input));

    // Clear table
    winnersBody.innerHTML = "";

    // If no results, show message
    if (filteredWinners.length === 0) {
        winnersBody.innerHTML = `<tr><td colspan="5">❌ No winners found</td></tr>`;
        return;
    }

    // Populate filtered winners
    filteredWinners.forEach((winner, index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${winner.name}</td>
                <td>${winner.date}</td>
                <td>${winner.prize}</td>
                <td><img src="images/${winner.proof}" alt="Proof" class="proof-img"></td>
                <td><a href="${winner.video}" target="_blank" class="video-btn">🎥 Watch</a></td>
            </tr>
        `;
        winnersBody.innerHTML += row;
    });
}


// Initialize winners on page load
document.addEventListener("DOMContentLoaded", displayWinners);

// Function to open image in full screen
function openFullScreen(img) {
    const fullScreenDiv = document.getElementById("fullScreenImage");
    const fullScreenImg = document.getElementById("fullScreenImg");

    fullScreenImg.src = img.src;
    fullScreenDiv.style.display = "flex";
}

// Function to close full screen image
function closeFullScreen() {
    document.getElementById("fullScreenImage").style.display = "none";
}


// წესები

document.addEventListener("DOMContentLoaded", () => {
    const rules = document.querySelectorAll(".rule-item");

    rules.forEach((rule, index) => {
        setTimeout(() => {
            rule.style.animation = "fadeIn 1s ease-in-out";
        }, index * 300);
    });
});


// ჩვენს შესახებ

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("prizeChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Month 1", "Month 2", "Month 3"],
            datasets: [{
                label: "Daily Prize Amount ($)",
                data: [10, 20, 30],
                backgroundColor: ["#ffcc00", "#ff6600", "#ff0000"],
                borderColor: "#fff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#fff",
                        font: { size: 14 }
                    }
                },
                x: {
                    ticks: {
                        color: "#fff",
                        font: { size: 14 }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#fff",
                        font: { size: 16 }
                    }
                }
            }
        }
    });
});


// სათაურის ცვლა
const amounts = [
    "🔥 $10 Every Day! 🔥",
    "🚀 $20 Every Day! 🚀",
    "💰 $30 Every Day! 💰"
];

let currentIndex = 0;
const amountElement = document.getElementById("amountText");

function updatePrizeText() {
    amountElement.innerHTML = `<span class="highlight">${amounts[currentIndex]}</span>`;
    currentIndex = (currentIndex + 4) % amounts.length; // ციკლურად გადადის შემდეგზე
}

setInterval(updatePrizeText, 6000); // ყოველ 6 წამში იცვლება
updatePrizeText(); // რომ პირველივე ჩატვირთვისას გამოჩნდეს
