document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault(); 

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const agreeTerm = document.getElementById("agree-term").checked;

  // Validate input
  if (!agreeTerm) {
    alert("You must agree to the terms and conditions.");
    return;
  }

  if (!name || !username || !email || !password) {
    alert("All fields are required.");
    return;
  }

  // Disable the submit button
  const submitButton = document.querySelector("#signup");
  submitButton.setAttribute("disabled", "disabled");
  submitButton.value = "Loading...";

  // Create the user data object
  const userData = {
    name,
    username,
    email,
    password,
  };

  try {
    // Send POST request
    const response = await fetch("https://threemtt-capstone-project-c0vy.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    // Handle the response
    if (response.ok) {
      alert("Registration successful!");
      event.target.reset(); // Reset the form
      window.location.href = "/login.html"; // Redirect to login page
    } else {
      alert(`Error: ${result.message || "Something went wrong!"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  } finally {
    // Re-enable the submit button
    submitButton.removeAttribute("disabled");
    submitButton.value = "Register";
  }
});