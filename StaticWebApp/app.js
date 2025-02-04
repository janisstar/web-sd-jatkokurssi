
document.querySelectorAll('.scroll-to').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetSelector = this.getAttribute('data-target');
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
