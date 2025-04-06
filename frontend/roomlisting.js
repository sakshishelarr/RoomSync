// Filtering Functionality
function filterRooms() {
  let locationInput = document.getElementById('locationFilter').value.toLowerCase();
  let budgetRange = document.getElementById('budgetFilter').value;
  let typeRange = document.getElementById('typeFilter').value;

  // Get all room cards and the message for no rooms found
  let roomCards = document.querySelectorAll('.room-card');
  let noRoomsMessage = document.getElementById('noRoomsMessage');
  let found = false;

  // Loop through each room card and apply filters
  roomCards.forEach(card => {
      let city = card.getAttribute('data-city').toLowerCase();
      let budget = parseInt(card.getAttribute('data-budget')); // Room price as an integer
      let type = card.getAttribute('data-type').toLowerCase(); // Room type

      // Check if each filter matches
      let matchesLocation = locationInput === "" || city.includes(locationInput);
      let matchesBudget = budgetRange === "" || checkBudgetRange(budget, budgetRange);
      let matchesType = typeRange === "" || type.includes(typeRange.toLowerCase());

      // Display the card if all filters match
      if (matchesLocation && matchesBudget && matchesType) {
          card.style.display = "block"; // Show matching room
          found = true;
      } else {
          card.style.display = "none"; // Hide non-matching room
      }
  });

  // Show the 'No rooms found' message if no room cards match the filters
  noRoomsMessage.style.display = found ? "none" : "block";
}

// Helper function to check if a room's budget matches the selected budget range
function checkBudgetRange(budget, range) {
  let [min, max] = range.split('-').map(Number);

  // If the range has a max (like "0-2000"), compare it with budget
  if (max) {
    return budget >= min && budget <= max;
  } else {
    // If no max value, just check the minimum value (e.g., "$6,000+")
    return budget >= min;
  }
}

// Clear all filters and show all rooms
function clearFilters() {
  // Reset the input values
  document.getElementById('locationFilter').value = '';
  document.getElementById('budgetFilter').value = '';
  document.getElementById('typeFilter').value = '';

  // Show all room cards
  let roomCards = document.querySelectorAll('.room-card');
  roomCards.forEach(card => {
      card.style.display = "block"; // Show all rooms
  });

  // Hide 'No rooms found' message
  document.getElementById('noRoomsMessage').style.display = "none";
}

// Adding a Clear Filters button functionality
document.querySelector('.clear-filters-btn').addEventListener('click', clearFilters);
