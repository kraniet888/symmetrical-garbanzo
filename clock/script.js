// Define time zones with their regions
const timeZones = [
    { name: 'UTC', region: 'Coordinated Universal Time', offset: 'UTC' },
    { name: 'EST', region: 'Eastern Standard Time', offset: 'America/New_York' },
    { name: 'CST', region: 'Central Standard Time', offset: 'America/Chicago' },
    { name: 'MST', region: 'Mountain Standard Time', offset: 'America/Denver' },
    { name: 'PST', region: 'Pacific Standard Time', offset: 'America/Los_Angeles' },
    { name: 'GMT', region: 'Greenwich Mean Time', offset: 'Europe/London' },
    { name: 'CET', region: 'Central European Time', offset: 'Europe/Paris' },
    { name: 'IST', region: 'Indian Standard Time', offset: 'Asia/Kolkata' },
    { name: 'JST', region: 'Japan Standard Time', offset: 'Asia/Tokyo' },
    { name: 'AEST', region: 'Australian Eastern Time', offset: 'Australia/Sydney' },
    { name: 'NZST', region: 'New Zealand Standard Time', offset: 'Pacific/Auckland' },
    { name: 'SGT', region: 'Singapore Time', offset: 'Asia/Singapore' },
];

/**
 * Format time with leading zeros
 */
function padZero(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Get the current time in a specific timezone
 */
function getTimeInZone(timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        const timeParts = formatter.formatToParts(new Date());
        const dateParts = dateFormatter.format(new Date());

        const time = timeParts
            .map(part => part.value)
            .join(':');

        return { time, date: dateParts };
    } catch (error) {
        console.error(`Error formatting timezone ${timezone}:`, error);
        return { time: '--:--:--', date: 'N/A' };
    }
}

/**
 * Create a clock card element
 */
function createClockCard(tzInfo) {
    const { time, date } = getTimeInZone(tzInfo.offset);

    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <div class="timezone-name">${tzInfo.name}</div>
        <div class="timezone-region">${tzInfo.region}</div>
        <div class="digital-time">${time}</div>
        <div class="time-info">
            <div class="time-detail">
                <div class="time-label">Timezone</div>
                <div class="time-value">${tzInfo.offset}</div>
            </div>
        </div>
        <div class="date-display">${date}</div>
    `;

    return card;
}

/**
 * Update all clock displays
 */
function updateClocks() {
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';

    timeZones.forEach(tzInfo => {
        const card = createClockCard(tzInfo);
        clockGrid.appendChild(card);
    });
}

/**
 * Initialize the clock and set up auto-update
 */
function initializeClock() {
    // Initial update
    updateClocks();

    // Update every second
    setInterval(updateClocks, 1000);
}

// Start the clock when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeClock);
