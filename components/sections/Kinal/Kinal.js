/* Animación proporcional de números */
function animateStats() {
    const stats = document.querySelectorAll('.stat-item strong');
    
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const currentNum = Math.floor(progress * target);
            stat.innerText = currentNum + "K";

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                stat.innerText = target + "K";
            }
        };
        
        window.requestAnimationFrame(step);
    });
}

document.addEventListener('DOMContentLoaded', animateStats);    