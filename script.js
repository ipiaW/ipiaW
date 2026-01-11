// ===== STARRY MAGIC =====
// Generate random stars
const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.background = '#ffd700';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.opacity = Math.random();
    star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite`;
    starsContainer.appendChild(star);
}

// Avatar magic on click
document.querySelector('.stellar-avatar').addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
        this.style.animation = 'avatarSparkle 0.5s ease-out';
    }, 10);
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes avatarSparkle {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Smooth hover for constellation
document.querySelectorAll('.stellar-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 215, 0, 0.1)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.background = 'var(--glass-dark)';
    });
});
