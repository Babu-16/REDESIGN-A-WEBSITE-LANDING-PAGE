document.addEventListener("DOMContentLoaded", () => {
    // Login Button Functionality
    document.getElementById("login").addEventListener("click", () => {
        alert("Login feature coming soon!");
    });

    // CTA Button Functionality
    document.querySelector(".cta").addEventListener("click", () => {
        alert("Enjoy unlimited music with Spotify!");
    });

    // Feature Cards Cursor Interaction
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.innerHTML = card.dataset.message;
        });
        card.addEventListener("mouseleave", () => {
            card.innerHTML = card.innerText.split("\n")[0]; // Reverts back to icon
        });
    });

    // Canvas Animation
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const mouse = {
        x: null,
        y: null
    };

    class Particle {
        constructor(x, y, size, color, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;

            if (this.x <= 0 || this.x >= canvas.width) this.velocityX *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.velocityY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function createParticles() {
        particlesArray = [];
        for (let i = 0; i < 120; i++) {
            let size = Math.random() * 4 + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let color = "rgba(30, 215, 96, " + (Math.random() * 0.8 + 0.2) + ")";
            let velocityX = (Math.random() - 0.5) * 1.5;
            let velocityY = (Math.random() - 0.5) * 1.5;
            particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    canvas.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        for (let i = 0; i < 5; i++) {
            let size = Math.random() * 3 + 1;
            let color = "rgba(30, 215, 96, " + (Math.random() * 0.8 + 0.2) + ")";
            let velocityX = (Math.random() - 0.5) * 2;
            let velocityY = (Math.random() - 0.5) * 2;
            particlesArray.push(new Particle(mouse.x, mouse.y, size, color, velocityX, velocityY));
        }
    });

    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    });
});
