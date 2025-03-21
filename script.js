document.addEventListener("DOMContentLoaded", function () {
    // Select the About link
    var aboutLink = document.querySelector('.about-link');
    
    // Select the "Why use RoomSync?" section
    var targetSection = document.querySelector('#why-use-roomsync');

    // Ensure both elements exist before adding event listener
    if (aboutLink && targetSection) {
        aboutLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default jump behavior
            
            // Scroll smoothly to the target section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // FAQ Toggle Logic
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            // Toggle active class
            item.classList.toggle("active");

            // Close other open items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });
        });
    });
});
