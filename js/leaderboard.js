// Leaderboard functionality
class LeaderboardManager {
    constructor() {
        this.leaderboardData = [];
        this.init();
    }
    
    init() {
        this.loadLeaderboard();
        this.setupEventListeners();
    }
    
    loadLeaderboard() {
        // Load from local storage or API
        const saved = localStorage.getItem('medievalLeaderboard');
        if (saved) {
            this.leaderboardData = JSON.parse(saved);
        } else {
            this.generateDefaultLeaderboard();
        }
    }
    
    generateDefaultLeaderboard() {
        this.leaderboardData = [
            { rank: 1, name: 'DragonSlayer', score: 12500, achievements: 32, avatar: '⚔️' },
            { rank: 2, name: 'KnightOfTheNorth', score: 11200, achievements: 28, avatar: '🛡️' },
            { rank: 3, name: 'BuilderMaster', score: 9800, achievements: 25, avatar: '🏰' },
            { rank: 4, name: 'ShadowHunter', score: 8500, achievements: 22, avatar: '🌙' },
            { rank: 5, name: 'AlchemistKing', score: 7200, achievements: 19, avatar: '🧪' },
            { rank: 6, name: 'ForestGuardian', score: 6800, achievements: 18, avatar: '🌲' },
            { rank: 7, name: 'BlackSmith', score: 6200, achievements: 16, avatar: '🔨' },
            { rank: 8, name: 'MerchantLord', score: 5800, achievements: 15, avatar: '💰' },
            { rank: 9, name: 'WizardMaster', score: 5400, achievements: 14, avatar: '🔮' },
            { rank: 10, name: 'FarmOwner', score: 5000, achievements: 13, avatar: '🌾' }
        ];
        
        this.saveLeaderboard();
    }
    
    saveLeaderboard() {
        localStorage.setItem('medievalLeaderboard', JSON.stringify(this.leaderboardData));
    }
    
    setupEventListeners() {
        // Add any interactive events here
        document.querySelectorAll('.leaderboard-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    updatePlayerScore(playerName, newScore) {
        const playerIndex = this.leaderboardData.findIndex(p => p.name === playerName);
        if (playerIndex !== -1) {
            this.leaderboardData[playerIndex].score = newScore;
            this.sortLeaderboard();
            this.saveLeaderboard();
            this.renderLeaderboard();
        }
    }
    
    sortLeaderboard() {
        this.leaderboardData.sort((a, b) => b.score - a.score);
        this.leaderboardData.forEach((player, index) => {
            player.rank = index + 1;
        });
    }
    
    renderLeaderboard() {
        const container = document.querySelector('.leaderboard-body');
        if (!container) return;
        
        container.innerHTML = this.leaderboardData.map(player => `
            <div class="leaderboard-item ${player.rank <= 3 ? ['first-place', 'second-place', 'third-place'][player.rank-1] : ''}">
                <div class="rank">${player.rank}</div>
                <div class="player">
                    <span>${player.avatar}</span> ${player.name}
                </div>
                <div class="score">${player.score.toLocaleString()}</div>
                <div class="stats">${player.achievements} Achievements</div>
            </div>
        `).join('');
    }
    
    addPlayer(name, score) {
        const newPlayer = {
            rank: this.leaderboardData.length + 1,
            name: name,
            score: score,
            achievements: 0,
            avatar: '👤'
        };
        
        this.leaderboardData.push(newPlayer);
        this.sortLeaderboard();
        this.saveLeaderboard();
        this.renderLeaderboard();
    }
}

// Initialize leaderboard manager
const leaderboardManager = new LeaderboardManager();

// Export for global access
window.leaderboardManager = leaderboardManager;