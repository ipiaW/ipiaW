// Smooth fade-in animation saat load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Hover effect untuk nama (glow)
const nameEl = document.querySelector('.name');
nameEl.addEventListener('mouseenter', () => {
    nameEl.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
});
nameEl.addEventListener('mouseleave', () => {
    nameEl.style.textShadow = 'none';
});

// Subtle parallax effect untuk card
document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.card');
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 30;
    const deltaY = (e.clientY - centerY) / 30;
    
    card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
});

// Klik effect untuk tombol
document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Animasi kecil saat diklik
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});
