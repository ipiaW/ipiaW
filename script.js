// Gentle fade in on load
window.addEventListener('load', () => {
    document.querySelector('.beautiful-card').style.opacity = '0';
    document.querySelector('.beautiful-card').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.beautiful-card').style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        document.querySelector('.beautiful-card').style.opacity = '1';
        document.querySelector('.beautiful-card').style.transform = 'translateY(0)';
    }, 200);
});

// Name hover effect
const nameEl = document.querySelector('.beautiful-name');
nameEl.addEventListener('mouseenter', () => {
    nameEl.style.transform = 'scale(1.02)';
    nameEl.style.textShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
});

nameEl.addEventListener('mouseleave', () => {
    nameEl.style.transform = 'scale(1)';
    nameEl.style.textShadow = 'none';
});

// Button click effect
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple at click position
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'rippleExpand 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
