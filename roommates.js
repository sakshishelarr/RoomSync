let images = [];
let index = 0;

function openProfile(name, age, city, occupation, sleep, diet, pets, budget, expectation, hobbies, particular, img1, img2, img3, img4) {
    // Show the modal
    document.getElementById('profile-modal').style.display = "flex";

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
    document.getElementById('profile-modal').style.display = "none";
}

function skipUser() {
    // Close the modal (skip the user)
    document.getElementById('profile-modal').style.display = "none";
}

function likeUser() {
    alert("❤️ You liked this roommate! A request has been sent.");
    document.getElementById('profile-modal').style.display = "none";
}

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
