document.addEventListener("DOMContentLoaded", function() {
  // This ensures the code inside this block runs after the DOM is fully loaded

  const logoutLink = document.querySelector("#logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the default anchor action

      logout();
    });
  } else {
    console.log("#logout-link not found");
  }
});

function logout() {
  fetch("/api/user/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" }
  })
    .then(function() {
      document.location.replace("/");
    })
    .catch(err => console.log(err));
}
