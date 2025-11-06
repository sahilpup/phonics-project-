// Handle signup
document.getElementById("signup-btn").addEventListener("click", () => {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (username && password) {
    localStorage.setItem("user_" + username, password);
    alert("Signup successful! Please login now.");
    document.getElementById("signup-box").classList.add("hidden");
    document.querySelector(".form-box").classList.remove("hidden");
  } else {
    alert("Please fill in both fields!");
  }
});

// Handle login
document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const storedPassword = localStorage.getItem("user_" + username);

  if (storedPassword === password) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html"; // redirect to home page
  } else {
    alert("Invalid username or password!");
  }
});

// Switch between login and signup forms
document.getElementById("show-signup").addEventListener("click", () => {
  document.querySelector(".form-box").classList.add("hidden");
  document.getElementById("signup-box").classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", () => {
  document.querySelector(".form-box").classList.remove("hidden");
  document.getElementById("signup-box").classList.add("hidden");
});
