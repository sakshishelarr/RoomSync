// Define state and city mapping
const stateCityMap = {
  "andhra-pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "arunachal-pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
  "assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar"],
  "bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "haryana": ["Chandigarh", "Faridabad", "Gurgaon", "Panipat"],
  "himachal-pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
  "jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "madhya-pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  "meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  "nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
  "punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "sikkim": ["Gangtok", "Namchi", "Mangan", "Rangpo"],
  "tamil-nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirapalli"],
  "telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa"],
  "uttar-pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  "uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Almora"],
  "west-bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"]
};

// Function to update cities dropdown
function updateCities() {
  let stateSelect = document.getElementById("state");
  let citySelect = document.getElementById("city");
  
  let selectedState = stateSelect.value;

  // Clear existing cities
  citySelect.innerHTML = '<option value="">Select City</option>';

  if (selectedState in stateCityMap) {
      stateCityMap[selectedState].forEach(city => {
          let option = document.createElement("option");
          option.value = city.toLowerCase();
          option.textContent = city;
          citySelect.appendChild(option);
      });
  }
}

// Google Sign-In Logic (Placeholder for now)
function googleSignUp() {
  alert("Google Sign-Up functionality coming soon!");
}

// Form validation function
async function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  let fullName = document.getElementById("full-name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let state = document.getElementById("state").value;
  let city = document.getElementById("city").value;

  // Validate empty fields
  if (fullName === "" || email === "" || password === "" || state === "" || city === "") {
      alert("Please fill in all required fields.");
      return false;
  }

  // Validate email format
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
  }

  // Validate password strength
  if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
  }

  // Preparing data for backend request
  const userData = {
    name: fullName,
    email: email,
    password: password,
    state: state,
    city: city
  };

  // Sending data to backend via API call
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (response.status === 200) {
      alert(result.message);
      window.location.href = "/RoomSync/frontend/login.html"; // Redirect to login page after successful registration
    } else {
      alert(result.message); // Show the error message from the backend
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    alert("An error occurred while signing up. Please try again later.");
  }
}

// Event Listeners
document.getElementById("state").addEventListener("change", updateCities);
document.querySelector(".google-signup-btn").addEventListener("click", googleSignUp);
document.querySelector("form").addEventListener("submit", validateForm);
