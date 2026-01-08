 const particlesContainer = document.getElementById('particles');
        const particleCount = 60;

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const startX = Math.random() * window.innerWidth;
            const drift = (Math.random() - 0.5) * 150;
            const duration = Math.random() * 8 + 12;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.setProperty('--drift', `${drift}px`);
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
                createParticle();
            }, (duration + delay) * 1000);
        }
