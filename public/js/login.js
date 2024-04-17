// Add event listener to the login form
document
 .querySelector('.login-form')
 .addEventListener('submit', loginFormHandler);

// Define the loginFormHandler function, which will handle form submissions
const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the email and password values from the form fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // If both email and password are provided, attempt to log in
  if (email && password) {
    // Send a POST request to the /api/users/login endpoint with the email and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful (status in the 200-299 range), redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // If the response is not successful, show an alert and log the error
      alert('Failed to log in');
      console.error('Failed to log in:', response.statusText);
    }
  }
};