// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeClickCounter();
});

// Theme Toggle with Local Storage
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const isDark = document.body.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';
    
    localStorage.setItem('theme', theme);
    
    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

// Click Counter with Local Storage
function initializeClickCounter() {
    const buttons = document.querySelectorAll('.btn');
    const counter = document.getElementById('counter');
    let totalClicks = localStorage.getItem('totalClicks') || 0;
    totalClicks = parseInt(totalClicks);
    
    updateCounterDisplay(counter, totalClicks);
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            totalClicks++;
            localStorage.setItem('totalClicks', totalClicks);
            updateCounterDisplay(counter, totalClicks);
            trackClick(button.textContent.trim());
        });
    });
}

function updateCounterDisplay(counter, clicks) {
    counter.textContent = `Total clicks: ${clicks}`;
}

// Analytics Tracking
function trackClick(platform) {
    const stats = JSON.parse(localStorage.getItem('clickStats') || '{}');
    stats[platform] = (stats[platform] || 0) + 1;
    localStorage.setItem('clickStats', JSON.stringify(stats));
    console.log(`Clicked: ${platform}`);
}
