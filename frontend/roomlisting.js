// Redirect to the room detail page when clicking on a room card
function openRoomDetails(roomId) {
  // Redirect to another page with room ID as a query parameter
  window.location.href = `room-detail.html?room=${roomId}`;
}

// Filtering Functionality
function filterRooms() {
  let locationInput = document.getElementById('locationFilter').value.toLowerCase();
  let budgetRange = document.getElementById('budgetFilter').value;
  let typeRange = document.getElementById('typeFilter').value;
  let roomCards = document.querySelectorAll('.room-card');
  let noRoomsMessage = document.getElementById('noRoomsMessage');
  let found = false;

  roomCards.forEach(card => {
    let city = card.getAttribute('data-city').toLowerCase();
    let budget = parseInt(card.getAttribute('data-budget'));
    let type = card.getAttribute('data-type').toLowerCase();

    let matchesLocation = locationInput === "" || city.includes(locationInput);
    let matchesBudget = budgetRange === "" || checkBudgetRange(budget, budgetRange);
    let matchesType = typeRange === "" || type.includes(typeRange);

    if (matchesLocation && matchesBudget && matchesType) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show message if no rooms found
  noRoomsMessage.style.display = found ? "none" : "block";
}

// Helper function to check budget range
function checkBudgetRange(budget, range) {
  let [min, max] = range.split('-').map(Number);
  return max ? (budget >= min && budget <= max) : (budget >= min);
}

// Function to fetch room listings from the backend (if you need dynamic data from API)
async function fetchRoomListings() {
  try {
    const response = await fetch('http://localhost:5000/api/rooms');
    const rooms = await response.json();
    
    if (response.status === 200 && rooms.length > 0) {
      displayRooms(rooms);
    } else {
      document.getElementById('noRoomsMessage').style.display = "block";
    }
  } catch (error) {
    console.error('Error fetching room listings:', error);
    alert('Failed to load room listings. Please try again later.');
  }
}

// Function to display rooms dynamically
function displayRooms(rooms) {
  const roomContainer = document.querySelector('.room-listings-grid');
  roomContainer.innerHTML = '';  // Clear previous listings
  
  rooms.forEach(room => {
    const roomCard = document.createElement('div');
    roomCard.classList.add('room-card');
    roomCard.setAttribute('data-city', room.location);
    roomCard.setAttribute('data-budget', room.price);
    roomCard.setAttribute('data-type', room.roommatesPreferred);
    roomCard.onclick = () => openRoomDetails(room._id);

    roomCard.innerHTML = `
      <div class="room-name">${room.title}</div>
      <div class="room-image-container">
        <img src="images/placeholder-room.jpg" alt="${room.title} Room">
      </div>
      <div class="room-details">
        <p class="price">$${room.price} / mo</p>
        <p class="type">${room.roommatesPreferred} · 6 Bedrooms · Apartment</p>
        <p class="location">Location: ${room.location}</p>
      </div>
    `;

    roomContainer.appendChild(roomCard);
  });
}

// Fetch room listings when the page loads
document.addEventListener('DOMContentLoaded', fetchRoomListings);

