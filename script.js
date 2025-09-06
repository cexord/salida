// script.js
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const messageContainer = document.querySelector('.message-container');
    const message = document.querySelector('.message');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Animación de explosión de partículas
            createParticles(button);
            
            // Mostrar mensaje
            messageContainer.style.opacity = '1';
            messageContainer.style.visibility = 'visible';
            message.style.transform = 'scale(1.1)';
            
            // Ocultar mensaje después de 3 segundos
            setTimeout(() => {
                messageContainer.style.opacity = '0';
                messageContainer.style.visibility = 'hidden';
                message.style.transform = 'scale(0.8)';
            }, 3000);
        });
    });

    function createParticles(button) {
        const particles = 30;
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                width: 10px;
                height: 10px;
                background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00);
                border-radius: 50%;
                pointer-events: none;
                z-index: 2;
            `;
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * 100 * speed}px, ${Math.sin(angle) * 100 * speed}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
});