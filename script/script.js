// Menu Hamburguer
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Scroll suave
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Partículas melhoradas
const particlesContainer = document.getElementById('particles');
const particleCount = 100;

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

// Iniciar partículas
for (let i = 0; i < particleCount; i++) {
    createParticle();
}