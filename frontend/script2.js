// Event listener for form submission
document.querySelector('form').addEventListener('submit', async function (event) {
  event.preventDefault();  // Prevent the default form submission

  // Grab the input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password-login').value;

  // Simple validation checks
  if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return; // Prevent submission if fields are empty
  }

  // Regex pattern for validating email format
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return; // Prevent submission if email is not valid
  }

  // Send login request to the backend
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", result.token);  // Store token in localStorage
      window.location.href = "/RoomSync/frontend/roomlisting.html";  // Redirect to room listings
    } else {
      alert(result.message); // Show error message from backend
    }
  } catch (error) {
    alert("An error occurred during login. Please try again later.");
    console.error("Login error:", error);
  }
});

// Optional: Handle Google Sign-In (Placeholder)
document.querySelector('.google-signup-btn').addEventListener('click', function () {
  // This is a placeholder for Google Sign-In logic
  // You would need to integrate Google Sign-In API for actual functionality
  alert("Google Sign-In not implemented yet.");
});
