// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializePreloader();
    initializeThemeToggle();
    initializeAnimations();
    initializeParticles();
    initializeCursor();
    initializeCards();
    initializeFAB();
});

// ========== PRELOADER ==========
function initializePreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            preloader.classList.add('hide');
        }, 1500);
    });
}

// ========== THEME TOGGLE ==========
function initializeThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Cek localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    toggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate toggle
        gsap.to(toggle, {
            rotation: 360,
            duration: 0.5,
            ease: "power2.inOut"
        });
    });
}

// ========== ANIMATIONS (GSAP) ==========
function initializeAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Split text animation
    Splitting();
    
    // Profile name animation
    gsap.from('.profile-name .char', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5
    });
    
    // Stats animation
    gsap.from('.stat-item', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1
    });
    
    // Link cards stagger
    gsap.from('.link-card', {
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        delay: 1.2,
        scrollTrigger: {
            trigger: '.links-section',
            start: 'top 80%'
        }
    });
}

// ========== PARTICLES ==========
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(0, 242, 254, ${Math.random() * 0.5})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        connect(particles) {
            particles.forEach(particle => {
                const dx = this.x - particle.x;
                const dy = this.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.2 * (1 - distance/120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.stroke();
                }
            });
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
            particle.connect(particles);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========== CUSTOM CURSOR ==========
function initializeCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1;
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0;
    });
}

// ========== CARD INTERACTIONS ==========
function initializeCards() {
    const cards = document.querySelectorAll('.link-card');
    
    cards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        
        // 3D Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(cardInner, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(cardInner, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        // Magnetic Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(card, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });
        
        // Click Ripple
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                
                // Redirect after animation
                const platform = card.dataset.platform;
                const urls = {
                    saweria: 'https://saweria.co/username',
                    youtube: 'https://youtube.com/@username',
                    discord: 'https://discord.gg/invite',
                    tiktok: 'https://tiktok.com/@username'
                };
                
                window.open(urls[platform], '_blank');
            }, 600);
        });
    });
}

// ========== FLOATING ACTION BUTTON ==========
function initializeFAB() {
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.querySelector('.fab-main');
    
    fabMain.addEventListener('click', () => {
        fabContainer.classList.toggle('active');
        
        gsap.to(fabMain, {
            rotation: fabContainer.classList.contains('active') ? 45 : 0,
            duration: 0.3
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target) && fabContainer.classList.contains('active')) {
            fabContainer.classList.remove('active');
            gsap.to(fabMain, {
                rotation: 0,
                duration: 0.3
            });
        }
    });
}

// ========== SMOOTH SCROLL ==========
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce for resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    // Recalculate animations on resize
    ScrollTrigger.refresh();
}, 250));
