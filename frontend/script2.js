// Handle Login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();  // Prevent form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password-login').value;

  // Simple validation checks
  if (!email || !password) {
      alert("Please fill in all fields.");
      return;
  }

  const loginData = { email, password };

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    const result = await response.json();
    if (response.status === 200) {
        localStorage.setItem('token', result.token); // Store token in localStorage
        window.location.href = 'roomlisting.html';  // Redirect to room listing
    } else {
        alert(result.message);  // Show error message from backend
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  }
});


// Dummy function to simulate checking login credentials
function checkLoginCredentials(email, password) {
  // In a real-world scenario, this would be an API call to verify credentials
  // For now, we'll use hardcoded credentials for demo purposes
  const validEmail = "test@example.com";
  const validPassword = "password123";

  if (email === validEmail && password === validPassword) {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
      alert("Invalid email or password.");
  }
}

// Optional: Handle Google Sign-In
document.querySelector('.google-signup-btn').addEventListener('click', function () {
  // This is a placeholder for Google Sign-In logic
  // You would need to integrate Google Sign-In API for actual functionality
  alert("Google Sign-In not implemented yet.");
});
