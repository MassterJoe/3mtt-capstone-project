// Function to handle user registration
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form refresh
    
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
  
    // Validate "Terms and Conditions" checkbox
    const agreeTerm = document.getElementById('agree-term').checked;
    if (!agreeTerm) {
      alert('You must agree to the terms and conditions.');
      return;
    }
  
    try {
      // Send POST request to the registration endpoint
      const response = await fetch('https://threemtt-capstone-project-c0vy.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Registration successful!');
        event.target.reset(); // Reset form fields
      } else {
        alert(`Error: ${result.error || 'Something went wrong!'}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again later.');
    }
  });



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
  