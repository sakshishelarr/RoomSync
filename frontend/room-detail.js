// Function to get the query parameter by name
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get the room name, price, and city from the query string
const roomName = getQueryParam('room');
const roomPrice = getQueryParam('price');
const city = getQueryParam('city'); // Add city parameter

// Update the room title, price, city, and other references with the room name, price, and city
if (roomName) {
  // Replace the room name in the title
  document.getElementById("room-title").textContent = `${roomName}'s place in ${city}`;
  // Dynamically change the posted-by name (optional)
  const postedByElement = document.querySelector('.posted-by-box p');
  if (postedByElement) {
      postedByElement.innerHTML = `<strong>Posted by:</strong> ${roomName}`;
  }
}

// Update the price if the price is available
if (roomPrice) {
  // Update the price in the room details
  const roomPriceElement = document.querySelector('.room-price');
  if (roomPriceElement) {
      roomPriceElement.textContent = `$${roomPrice} / mo`; // Dynamically set the price
  }
}

// Update the city name dynamically in all necessary places
if (city) {
  // Update the city name in the room title
  const cityElements = document.querySelectorAll('.city-name');
  cityElements.forEach(element => {
      element.textContent = city;
  });
}
