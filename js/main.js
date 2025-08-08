// DOM Elements
const contactForm = document.getElementById('contactForm');
const scrollTopBtn = document.getElementById('scrollTop');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar ul');

// Server data simulation
const serverData = {
    onlinePlayers: 0,
    maxPlayers: 100,
    totalKills: 0,
    totalBuildings: 0,
    uptime: 0,
    version: "1.19.4",
    status: "online"
};

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Initialize server status
    initServerStatus();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize animations
    initAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Start live updates
    startLiveUpdates();
    
    // Initialize theme
    initTheme();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 2000);
}

// Server status initialization
function initServerStatus() {
    // Simulate live data updates
    setInterval(() => {
        updateServerStats();
    }, 5000);
    
    // Initial update
    updateServerStats();
}

// Update server stats
function updateServerStats() {
    // Simulate random data changes
    serverData.onlinePlayers = Math.floor(Math.random() * 80) + 10;
    serverData.totalKills = Math.floor(Math.random() * 10000) + 5000;
    serverData.totalBuildings = Math.floor(Math.random() * 5000) + 2000;
    serverData.uptime += 0.1;
    
    // Update DOM
    document.getElementById('onlinePlayers').textContent = serverData.onlinePlayers.toLocaleString();
    document.getElementById('totalKills').textContent = serverData.totalKills.toLocaleString();
    document.getElementById('totalBuildings').textContent = serverData.totalBuildings.toLocaleString();
    document.getElementById('serverUptime').textContent = `${Math.floor(serverData.uptime)} hours`;
    
    // Update status indicator
    const statusIndicator = document.getElementById('serverStatus');
    if (serverData.onlinePlayers > 0) {
        statusIndicator.textContent = 'Online';
        statusIndicator.className = 'status-indicator online';
    } else {
        statusIndicator.textContent = 'Offline';
        statusIndicator.className = 'status-indicator offline';
    }
}

// Live updates
function startLiveUpdates() {
    setInterval(() => {
        // Simulate new events
        simulateNewEvents();
    }, 10000);
}

// Simulate new events
function simulateNewEvents() {
    const events = [
        { title: "New Quest Available", time: "Just now" },
        { title: "Boss Spawned", time: "2 minutes ago" },
        { title: "Building Contest", time: "5 minutes ago" }
    ];
    
    // This would normally update based on real API data
    console.log("New events simulated:", events);
}

// Scroll to top button
function initScrollToTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    mobileMenuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// Animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe event cards
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe leaderboard items
    document.querySelectorAll('.leaderboard-item').forEach(item => {
        observer.observe(item);
    });
}

// Contact form handler
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Show success message
            alert('Pesan berhasil dikirim! Kami akan segera merespons.');
            this.reset();
            
            // In a real implementation, you would send this data to your server
            console.log('Contact form data:', data);
        });
    }
}

// Copy IP function
function copyIP() {
    const ip = "play.medieval-survival.net";
    
    navigator.clipboard.writeText(ip).then(() => {
        // Show notification
        const originalText = document.querySelector('.copy-btn').innerHTML;
        document.querySelector('.copy-btn').innerHTML = '<i class="fas fa-check"></i> IP Disalin!';
        
        setTimeout(() => {
            document.querySelector('.copy-btn').innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin IP:', err);
    });
}

// Join server function
function joinServer() {
    alert('Memulai koneksi ke server... Silakan tunggu!');
    // In real implementation, this would redirect to Minecraft launcher
}

// Theme initialization
function initTheme() {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to large screens
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});