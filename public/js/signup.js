// Add event listener to the submit event of the form with class 'signup-form'
document
 .querySelector('.signup-form')
 .addEventListener('submit', signupFormHandler);

// Define the async function signupFormHandler to handle the form submission
const signupFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form fields
  const user_name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if all the required fields have values
  if (user_name && email && password) {
    // Send a POST request to the '/api/users' endpoint with the form data
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the request is successful, redirect the user to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // If the request fails, show an alert and log the error message
      alert('Failed to sign up');
      console.error('Failed to sign up:', response.statusText);
    }
  }
};