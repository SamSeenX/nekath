/**
 * Avurudu Nekath Application
 * Handles the countdown timer, UI updates, and schedule rendering.
 */

// Format Utilities
const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

/**
 * Initialize the schedule list in the sidebar.
 */
function initScheduleList() {
    const list = document.getElementById('schedule-list');
    if (!list) return;

    list.innerHTML = NEKATHS.map((nekath, index) => `
        <div id="card-${nekath.id}" class="relative flex items-start gap-4 p-4 rounded-2xl transition-all duration-300">
            ${index !== NEKATHS.length - 1 ? `<div id="line-${nekath.id}" class="absolute left-9 top-14 bottom-[-24px] w-0.5"></div>` : ''}
            <div id="icon-bg-${nekath.id}" class="p-3 rounded-full shrink-0">
                <i data-lucide="${nekath.icon}" id="icon-active-${nekath.id}" class="w-5 h-5"></i>
                <i data-lucide="check-circle-2" id="icon-done-${nekath.id}" class="w-5 h-5 hidden"></i>
            </div>
            <div class="flex-1 min-w-0 pt-1">
                <div class="flex justify-between items-start mb-1">
                    <h4 id="title-${nekath.id}" class="font-semibold truncate text-white/90">${nekath.title}</h4>
                </div>
                <div class="text-sm text-white/70 font-medium mb-1">
                    ${formatDate(new Date(nekath.time))} • ${formatTime(new Date(nekath.time))}
                </div>
                <div class="text-xs text-white/50 truncate">${nekath.desc}</div>
            </div>
        </div>
    `).join('');
    
    // Initialize lucide icons for static elements
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Main UI Update Loop
 */
function updateUI() {
    const now = new Date();
    
    // Update Header Date/Time
    const dateEl = document.getElementById('current-date');
    const timeEl = document.getElementById('current-time');
    if (dateEl) dateEl.innerText = formatDate(now);
    if (timeEl) timeEl.innerText = formatTime(now);

    // Determine Punya Kaalaya
    const isPunyaKaalayaActive = now >= new Date(NEKATHS[0].time) && now <= new Date(NEKATHS[4].time);
    const punyaBanner = document.getElementById('punya-banner');
    if (punyaBanner) {
        if (isPunyaKaalayaActive) {
            punyaBanner.classList.remove('hidden');
            punyaBanner.classList.add('inline-flex');
        } else {
            punyaBanner.classList.add('hidden');
            punyaBanner.classList.remove('inline-flex');
        }
    }

    // Determine Next Nekath
    const futureNekaths = NEKATHS.filter(n => new Date(n.time) >= now);
    const nextNekath = futureNekaths.length > 0 ? futureNekaths[0] : null;

    // DOM Elements for Hero
    const appContainer = document.getElementById('app-container');
    const heroActive = document.getElementById('hero-active');
    const heroCompleted = document.getElementById('hero-completed');

    if (!appContainer || !heroActive || !heroCompleted) return;

    // Handle Hero Area updates
    if (nextNekath) {
        heroCompleted.classList.add('hidden');
        heroActive.classList.remove('hidden');

        // Update Background Class safely
        appContainer.className = `min-h-screen md:h-screen md:overflow-hidden w-full flex flex-col text-white transition-all duration-1000 ease-in-out bg-gradient-to-br ${nextNekath.bg}`;

        // Update text fields
        document.getElementById('hero-title').innerText = nextNekath.title;
        document.getElementById('hero-desc').innerText = nextNekath.desc;
        document.getElementById('hero-color').innerText = nextNekath.color;
        document.getElementById('hero-direction').innerText = nextNekath.direction;

        // Update Icon dynamically
        const iconWrapper = document.getElementById('hero-icon-wrapper');
        if (iconWrapper && iconWrapper.dataset.currentIcon !== nextNekath.icon) {
            iconWrapper.innerHTML = `<i data-lucide="${nextNekath.icon}" class="w-12 h-12 text-white drop-shadow-md"></i>`;
            if (window.lucide) {
                window.lucide.createIcons({ root: iconWrapper });
            }
            iconWrapper.dataset.currentIcon = nextNekath.icon;
        }

        // Calculate countdown
        const diffMs = new Date(nextNekath.time).getTime() - now.getTime();
        const daysLeft = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diffMs / 1000 / 60) % 60);
        const s = Math.floor((diffMs / 1000) % 60);
        
        const timeLeftStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        document.getElementById('countdown-timer').innerText = timeLeftStr;

        const daysEl = document.getElementById('days-left');
        if (daysEl) {
            if (daysLeft > 0) {
                daysEl.innerText = `+ ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`;
                daysEl.classList.remove('hidden');
            } else {
                daysEl.classList.add('hidden');
            }
        }
    } else {
        // Avurudu Completed State
        heroActive.classList.add('hidden');
        heroCompleted.classList.remove('hidden');
        appContainer.className = `min-h-screen md:h-screen md:overflow-hidden w-full flex flex-col text-white transition-all duration-1000 ease-in-out bg-gradient-to-br from-slate-800 to-slate-900`;
    }

    // Handle Schedule List Styles
    NEKATHS.forEach(nekath => {
        const isPast = new Date(nekath.time) < now;
        const isNext = nextNekath && nekath.id === nextNekath.id;

        const card = document.getElementById(`card-${nekath.id}`);
        const iconBg = document.getElementById(`icon-bg-${nekath.id}`);
        const title = document.getElementById(`title-${nekath.id}`);
        const line = document.getElementById(`line-${nekath.id}`);
        
        const iconActive = document.getElementById(`icon-active-${nekath.id}`);
        const iconDone = document.getElementById(`icon-done-${nekath.id}`);

        if (!card || !iconBg || !title) return;

        if (isNext) {
            card.className = "relative flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 bg-white/20 border border-white/40 shadow-lg scale-[1.02]";
            iconBg.className = "p-3 rounded-full shrink-0 bg-white text-gray-900 shadow-md";
            title.className = "font-semibold truncate text-white";
            
            if (iconActive) iconActive.classList.remove('hidden');
            if (iconDone) iconDone.classList.add('hidden');
        } else if (isPast) {
            card.className = "relative flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 opacity-50 grayscale hover:grayscale-0 hover:opacity-100";
            iconBg.className = "p-3 rounded-full shrink-0 bg-white/10 text-white";
            title.className = "font-semibold truncate text-white/90";
            
            if (iconActive) iconActive.classList.add('hidden');
            if (iconDone) iconDone.classList.remove('hidden');
        } else {
            card.className = "relative flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10";
            iconBg.className = "p-3 rounded-full shrink-0 bg-white/10 text-white";
            title.className = "font-semibold truncate text-white/90";
            
            if (iconActive) iconActive.classList.remove('hidden');
            if (iconDone) iconDone.classList.add('hidden');
        }

        if (line) {
            line.className = `absolute left-9 top-14 bottom-[-24px] w-0.5 ${isPast ? 'bg-white/20' : 'bg-white/10'}`;
        }
    });
}

// Bootstrap App
document.addEventListener('DOMContentLoaded', () => {
    initScheduleList();
    updateUI(); // Run immediately
    setInterval(updateUI, 1000); // Update every second
});
