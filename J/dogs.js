window.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.dog-card');
    cards.forEach((card, i) => {
        card.style.animationDelay = (i * 0.3) + 's';
    });
});
