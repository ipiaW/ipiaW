// Events management system
class EventManager {
    constructor() {
        this.events = [];
        this.init();
    }
    
    init() {
        this.loadEvents();
        this.setupEventHandlers();
    }
    
    loadEvents() {
        // Load from localStorage or API
        const savedEvents = localStorage.getItem('medievalEvents');
        if (savedEvents) {
            this.events = JSON.parse(savedEvents);
        } else {
            this.generateDefaultEvents();
        }
    }
    
    generateDefaultEvents() {
        this.events = [
            {
                id: 1,
                title: 'Tournament King of the Hill',
                date: '2024-06-15',
                time: '14:00 WIB',
                location: 'Castle District',
                description: 'Perlombaan membangun kota terbesar di area khusus!',
                type: 'tournament',
                status: 'upcoming'
            },
            {
                id: 2,
                title: 'Weekly Dungeon Run',
                date: '2024-06-22',
                time: '20:00 WIB',
                location: 'Underground Caves',
                description: 'Masuk ke dungeon khusus mingguan dengan hadiah spesial!',
                type: 'dungeon',
                status: 'upcoming'
            },
            {
                id: 3,
                title: 'Medieval Festival',
                date: '2024-06-30',
                time: '18:00 WIB',
                location: 'Central Plaza',
                description: 'Festival tahunan dengan acara berbagai macam!',
                type: 'festival',
                status: 'upcoming'
            },
            {
                id: 4,
                title: 'Build Competition',
                date: '2024-06-08',
                time: '16:00 WIB',
                location: 'City Center',
                description: 'Kompetisi membangun bangunan terbaik!',
                type: 'competition',
                status: 'completed'
            }
        ];
        
        this.saveEvents();
    }
    
    saveEvents() {
        localStorage.setItem('medievalEvents', JSON.stringify(this.events));
    }
    
    setupEventHandlers() {
        // Event handlers can be added here
        console.log('Event managers initialized');
    }
    
    getUpcomingEvents(limit = 3) {
        return this.events
            .filter(event => event.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, limit);
    }
    
    getActiveEvents() {
        return this.events.filter(event => event.status === 'active');
    }
    
    getCompletedEvents(limit = 3) {
        return this.events
            .filter(event => event.status === 'completed')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
    
    registerForEvent(eventId, playerName) {
        // Registration logic
        console.log(`Player ${playerName} registered for event ${eventId}`);
        return true;
    }
    
    getEventById(id) {
        return this.events.find(event => event.id === id);
    }
}

// Initialize event manager
const eventManager = new EventManager();

// Export for global access
window.eventManager = eventManager;

// Calendar functionality
function initCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Create calendar UI elements
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'calendar';
    calendarContainer.innerHTML = `
        <div class="calendar-header">
            <button class="prev-month"><</button>
            <h3>${getMonthName(month)} ${year}</h3>
            <button class="next-month">></button>
        </div>
        <div class="calendar-grid">
            <div class="weekdays">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div class="days"></div>
        </div>
    `;
    
    // Add to events section
    const eventsSection = document.querySelector('.events');
    if (eventsSection) {
        eventsSection.appendChild(calendarContainer);
    }
}

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}