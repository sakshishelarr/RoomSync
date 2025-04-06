let images = [];
let index = 0;

// Ensure the modal is fully hidden on page load (forcefully hide it using 'display: none')
document.getElementById('profile-modal').style.display = "none";  // Modal is hidden on load

// Function to open the profile modal
function openProfile(name, age, city, occupation, sleep, diet, pets, budget, expectation, hobbies, particular, img1, img2, img3, img4) {
    // Show the modal
    document.getElementById('profile-modal').style.display = "flex";  // Modal is shown only when a profile is clicked

    // Set text content properly
    document.getElementById('profile-name').innerText = `Hi, I'm ${name}`;
    document.getElementById('profile-age-city').innerText = `Age: ${age} | City: ${city}`;
    document.getElementById('profile-occupation').innerText = occupation;
    document.getElementById('profile-sleep').innerText = sleep;
    document.getElementById('profile-diet').innerText = diet;
    document.getElementById('profile-pets').innerText = pets;
    document.getElementById('profile-budget').innerText = budget;

    // Load images into carousel
    images = [img1, img2, img3, img4];
    index = 0;

    let imgElement = document.getElementById('profile-img');
    if (imgElement) {
        imgElement.src = images[0]; // Load the first image
        imgElement.classList.add('active');
    } else {
        console.error("Image element not found!");
    }
}

// Function to switch to the previous image
function prevImage() {
    if (images.length > 0) {
        index = (index - 1 + images.length) % images.length;
        document.getElementById('profile-img').src = images[index];
    }
}

// Function to switch to the next image
function nextImage() {
    if (images.length > 0) {
        index = (index + 1) % images.length;
        document.getElementById('profile-img').src = images[index];
    }
}

// Close Modal
function closeProfile() {
    document.getElementById('profile-modal').style.display = "none";  // Close the modal when 'X' is clicked
}

// Skip User (Close the modal without interacting)
function skipUser() {
    document.getElementById('profile-modal').style.display = "none";  // Close the modal when skipping
}

// Like User (Show a message and close the modal)
function likeUser() {
    alert("❤️ You liked this roommate! A request has been sent.");
    document.getElementById('profile-modal').style.display = "none";  // Close the modal after liking
}

// Filter profiles based on selected filters
function filterProfiles() {
    let locationInput = document.getElementById('locationFilter').value.toLowerCase();
    let ageRange = document.getElementById('ageFilter').value;
    let budgetRange = document.getElementById('budgetFilter').value;
    let profiles = document.querySelectorAll('.profile-card');
    let noUsersMessage = document.getElementById('noUsersMessage');
    let found = false;

    profiles.forEach(profile => {
        let city = profile.getAttribute('data-city').toLowerCase();
        let age = parseInt(profile.getAttribute('data-age'));
        let budget = parseInt(profile.getAttribute('data-budget'));

        let matchesLocation = locationInput === "" || city.includes(locationInput);
        let matchesAge = ageRange === "" || checkAgeRange(age, ageRange);
        let matchesBudget = budgetRange === "" || checkBudgetRange(budget, budgetRange);

        if (matchesLocation && matchesAge && matchesBudget) {
            profile.style.display = "block";
            found = true;
        } else {
            profile.style.display = "none";
        }
    });

    // Show message if no profiles found
    noUsersMessage.style.display = found ? "none" : "block";
}

// Helper function to check age range
function checkAgeRange(age, range) {
    let [min, max] = range.split('-').map(Number);
    return max ? (age >= min && age <= max) : (age >= min);
}

// Helper function to check budget range
function checkBudgetRange(budget, range) {
    let [min, max] = range.split('-').map(Number);
    return max ? (budget >= min && budget <= max) : (budget >= min);
}

// Clear all filters and show all profiles
function clearFilters() {
    // Reset the input values
    document.getElementById('locationFilter').value = '';
    document.getElementById('ageFilter').value = '';
    document.getElementById('budgetFilter').value = '';

    // Show all profile cards
    let profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.style.display = "block"; // Show all profiles
    });

    // Hide 'No users found' message
    document.getElementById('noUsersMessage').style.display = "none";
}

// Function to handle the like button click
function likeProfile() {
    // Show alert message when the "Like" button is clicked
    alert("You liked this user! Your request has been sent.");
}

// Adding a Clear Filters button functionality
document.querySelector('.clear-filters-btn').addEventListener('click', clearFilters);
