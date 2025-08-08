// DOM Elements
const contactForm = document.getElementById('contactForm');
const copyBtn = document.querySelector('.copy-btn');

// Simulasi data server (untuk demo)
const serverData = {
    onlinePlayers: 0,
    maxPlayers: 100,
    version: "1.19.4"
};

// Update server stats
function updateServerStats() {
    // Simulasi update jumlah player online
    const randomPlayers = Math.floor(Math.random() * 80) + 10;
    document.getElementById('onlinePlayers').textContent = randomPlayers;
    
    // Update setiap 30 detik
    setTimeout(updateServerStats, 30000);
}

// Copy IP function
function copyIP() {
    const ipElement = document.querySelector('.server-ip');
    const ipText = ipElement.textContent;
    
    navigator.clipboard.writeText(ipText).then(() => {
        // Tampilkan notifikasi
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'IP Disalin!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin IP:', err);
    });
}

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Simulasi pengiriman form
    alert('Pesan berhasil dikirim! Kami akan segera merespons.');
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animation
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Add class to header when scrolling
    const header = document.querySelector('.header');
    if (scrollPosition > 50) {
        header.style.background = 'rgba(44, 24, 16, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c1810 0%, #4a2c18 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateServerStats();
    
    // Animasi fade-in saat halaman dimuat
    const elements = document.querySelectorAll('.rule-card, .feature-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 * index);
    });
});

// Navbar active link
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
