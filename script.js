// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX - 15 + 'px';
        follower.style.top = e.clientY - 15 + 'px';
    }, 100);
});

// ===== TYPEWRITER EFFECT =====
const typewriterText = document.querySelector('.typewriter');
const text = typewriterText.textContent;
typewriterText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();

// ===== ANIMATE STATS =====
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-target');
        const finalValue = parseFloat(target);
        const isDecimal = target.includes('.');
        let current = 0;
        const increment = finalValue / 50;
        
        const updateStat = () => {
            current += increment;
            if (current < finalValue) {
                stat.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + (target.includes('K') ? 'K' : '%');
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + (target.includes('K') ? 'K' : '%');
            }
        };
        updateStat();
    });
};

setTimeout(animateStats, 2000);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== MORPH BUTTON SOUND (SIMULATED) =====
document.querySelectorAll('.morph-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.animation = 'pulse 0.5s';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.animation = '';
    });
});
