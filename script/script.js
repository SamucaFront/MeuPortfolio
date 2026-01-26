// ────────────────────────────────────────────────
// MENU HAMBURGUER + FECHAR NO MOBILE
// ────────────────────────────────────────────────
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) toggleMenu();
    });
});

// ────────────────────────────────────────────────
// SCROLL SUAVE
// ────────────────────────────────────────────────
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
}

// ────────────────────────────────────────────────
// PARTÍCULAS DOM (subindo do fundo) – mantidas normais
// ────────────────────────────────────────────────
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    let currentParticleCount = window.innerWidth < 768 ? 60 : 100;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 5 + 2;
        const startX = Math.random() * window.innerWidth;
        const drift = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.setProperty('--drift', `${drift}px`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    function resetParticles() {
        while (particlesContainer.firstChild) {
            particlesContainer.removeChild(particlesContainer.firstChild);
        }

        currentParticleCount = window.innerWidth < 768 ? 60 : 100;

        for (let i = 0; i < currentParticleCount; i++) {
            createParticle();
        }
    }

    resetParticles();

    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(resetParticles, 300);
    });
}// ────────────────────────────────────────────────
// CANVAS: pontinhos flutuantes conectados – com linhas mais aparentes
// ────────────────────────────────────────────────
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCountCanvas = window.innerWidth < 768 ? 50 : 80; // mantém original

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCountCanvas; i++) {
        particles.push(new Particle());
    }

    let frameCount = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        frameCount++;
        if (frameCount % 2 === 0) {  // a cada 2 frames – bom equilíbrio
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < 140) {  // mais linhas aparecem (era 100–120)
                        // Linhas mais aparentes: opacidade alta + linha mais grossa
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 140)})`;  // até 0.3 de opacidade
                        ctx.lineWidth = 1.4;  // linha mais grossa e visível
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
// ────────────────────────────────────────────────
// MOUSE PARALLAX NOS ORBES – só desktop
// ────────────────────────────────────────────────
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
        document.querySelectorAll('.orb').forEach((orb, index) => {
            const speed = (index + 1) * 0.03;
            const x = (window.innerWidth - e.clientX) * speed;
            const y = (window.innerHeight - e.clientY) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ────────────────────────────────────────────────
// TYPEWRITER "Samuel"
// ────────────────────────────────────────────────
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const text = 'Samuel';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 120);
        }
    }

    setTimeout(() => {
        typewriterElement.textContent = '';
        typeWriter();
    }, 800);
}