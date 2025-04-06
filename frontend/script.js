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

    // Check authentication and redirect if not authenticated for Rooms and Roommates links
    const roomLink = document.querySelector('a[href="./roomlisting.html"]');
    const roommateLink = document.querySelector('a[href="./roommate_profiles.html"]');

    // Add event listeners to both links
    if (roomLink) {
        roomLink.addEventListener('click', function (event) {
            event.preventDefault();
            checkAuthAndRedirect('roomlisting.html');  // Redirect after checking auth
        });
    }

    if (roommateLink) {
        roommateLink.addEventListener('click', function (event) {
            event.preventDefault();
            checkAuthAndRedirect('roommate_profiles.html');  // Redirect after checking auth
        });
    }
});

// Check authentication and redirect to login if not authenticated
function checkAuthAndRedirect(targetPage) {
    // Check if the user is authenticated (check for token in localStorage)
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If not authenticated, redirect to login/signup page
        window.location.href = './login.html';
    } else {
        // If authenticated, redirect to the target page (rooms or roommates)
        window.location.href = targetPage;
    }
}
