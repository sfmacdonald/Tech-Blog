// This is an asynchronous function that logs out the user by making a POST request to the '/api/users/logout' endpoint.
const logout = async () => {
  // Fetch is used to make a request to the server, with the method set to 'POST' and the headers set to 'Content-Type': 'application/json'.
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // If the response is successful (response.ok is true), the user is redirected to the login page.
  if (response.ok) {
    document.location.replace('/login');
  } 
  // If the response is not successful, an alert is displayed with the response's status text.
  else {
    alert(response.statusText);
  }
};

// The 'logout' function is added as an event listener to the element with the id 'logout'.
document.querySelector('#logout').addEventListener('click', logout);