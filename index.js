/* ================================
   INIT
   ================================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeClickCounter();
});

/* ================================
   THEME TOGGLE (LOCAL STORAGE)
   ================================ */
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

/* ================================
   CLICK COUNTER
   ================================ */
function initializeClickCounter() {
    const buttons = document.querySelectorAll('.btn');
    const counter = document.getElementById('counter');

    let totalClicks = parseInt(localStorage.getItem('totalClicks') || '0');

    updateCounter(counter, totalClicks);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            totalClicks++;

            localStorage.setItem('totalClicks', totalClicks);
            updateCounter(counter, totalClicks);

            trackClick(button.innerText.trim());
        });
    });
}

function updateCounter(counter, value) {
    counter.textContent = `Total clicks: ${value}`;
}

/* ================================
   ANALYTICS (LOCAL STORAGE)
   ================================ */
function trackClick(platform) {
    const stats = JSON.parse(localStorage.getItem('clickStats') || '{}');

    stats[platform] = (stats[platform] || 0) + 1;

    localStorage.setItem('clickStats', JSON.stringify(stats));

    console.log(`Clicked: ${platform}`, stats);
}
