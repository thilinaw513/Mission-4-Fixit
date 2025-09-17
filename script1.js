// --------------------
// LOGIN FORM SCRIPT
// --------------------

const loginForm = document.querySelector(".login-form");
const emailInput = loginForm.querySelector('input[placeholder="Email"]');
const passwordInput = loginForm.querySelector('input[placeholder="Password"]');
const signupBtn = document.querySelector(".signup-btn");

// Live validation for green border
function liveValidate(input) {
  if (input.value.trim() === "") {
    input.classList.remove("valid");
  } else {
    if (input === emailInput) {
      if (validateEmail(input.value)) input.classList.add("valid");
      else input.classList.remove("valid");
    } else if (input === passwordInput) {
      if (input.value.length >= 8) input.classList.add("valid");
      else input.classList.remove("valid");
    }
  }
}

function validateEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email);
}

// Event listeners for live validation
emailInput.addEventListener("input", () => liveValidate(emailInput));
passwordInput.addEventListener("input", () => liveValidate(passwordInput));

// Submit button validation + MockAPI login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let hasError = false;

  const emailError = emailInput.nextElementSibling;
  emailInput.classList.remove("error");
  emailError.classList.remove("active");

  const passwordError = passwordInput.nextElementSibling;
  passwordInput.classList.remove("error");
  passwordError.classList.remove("active");

  // Email validation
  if (emailInput.value.trim() === "" || !validateEmail(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.textContent = emailInput.value.trim() === "" ?
      "Please enter your email" :
      "Enter a valid email address";
    emailError.classList.add("active");
    hasError = true;
  }

  // Password validation
  if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
    passwordInput.classList.add("error");
    passwordError.textContent = passwordInput.value.trim() === "" ?
      "Please enter your password" :
      "Password must be at least 8 characters";
    passwordError.classList.add("active");
    hasError = true;
  }

  // Fetch MockAPI users and check credentials
  if (!hasError) {
    try {
      const res = await fetch("https://68ca9796430c4476c34a1c61.mockapi.io/api/fixitapp/users");
      const users = await res.json();

      const user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);

      if (user) {
        localStorage.setItem("token", "loggedIn");
        window.location.href = "progress-report-page.html";
      } else {
        alert("Invalid email or password!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again later.");
    }
  }
});

// Skip button
signupBtn.addEventListener("click", () => {
  window.location.href = "signup.html"; // adjust as needed
});
