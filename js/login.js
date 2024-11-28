


document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form data
  const formData = new FormData(event.target);
  const loginData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    // Send POST request
    const response = await fetch('https://threemtt-capstone-project-c0vy.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();
console.log(result)
    if (response.ok) {
      // Save token and redirect
      localStorage.setItem('authToken', result.token);
      alert('Login successful!');
      window.location.href = '/dashboard.html';
    } else {
      alert(`Error: ${result.message || 'Login failed. Please try again.'}`);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Error: Unable to connect to the server. Please try again later.');
  }
});