document.addEventListener("DOMContentLoaded", async () => {
    const projectArea = document.querySelector(".project-area ul");

    // Fetch tasks from the server
    async function fetchTasks() {
        const token = localStorage.getItem("authToken"); // Ensure the user is logged in
        if (!token) {
            alert("You are not logged in!");
            return;
        }

        try {
            const response = await fetch("https://threemtt-capstone-project-c0vy.onrender.com/api/tasks", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                renderTasks(result.tasks.slice(0, 3)); // Render only the first 3 tasks
            } else {
                alert(`Error: ${result.message || "Failed to fetch tasks"}`);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Error: Unable to fetch tasks. Please try again.");
        }
    }

    // Render tasks in the project area
    function renderTasks(tasks) {
        if (!Array.isArray(tasks)) {
            console.error("Expected an array but got:", tasks);
            alert("Failed to load tasks. Please try again.");
            return;
        }

        projectArea.innerHTML = ""; // Clear any existing tasks

        tasks.forEach((task) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="projects">
                    <h5>${new Date(task.deadline).toLocaleDateString()}</h5>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <div class="progress-bar"></div>
                </div>
            `;
            projectArea.appendChild(listItem);
        });
    }

    // Fetch and display tasks on page load
    await fetchTasks();
});

document.getElementById('searchBtn').addEventListener('click', async () => {
    const searchQuery = prompt("Enter your search query:");
    if (searchQuery) {
        const token = localStorage.getItem("authToken"); // Get the auth token
        if (!token) {
            alert("You are not logged in! Please log in and try again.");
            return;
        }

        // Clear previous results and show a loading message
        const resultsContainer = document.getElementById("searchResults");
        resultsContainer.innerHTML = "<p>Loading search results...</p>";

        try {
            const response = await fetch(`https://threemtt-capstone-project-c0vy.onrender.com/api/tasks/x/search?query=${encodeURIComponent(searchQuery)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const { tasks } = await response.json();
            
            if (tasks && tasks.length > 0) {
                renderSearchResults(tasks);
            } else {
                resultsContainer.innerHTML = "<p>No tasks found matching your search query.</p>";
            }
        } catch (error) {
            console.error("Search failed:", error.message);
            resultsContainer.innerHTML = `<p>Search failed: ${error.message}</p>`;
        }
    }
});

// Function to render search results and add a "Clear Results" button
function renderSearchResults(tasks) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Status:</strong> ${task.status}</p>
        `;
        resultsContainer.appendChild(taskItem);
    });

    // Add a "Clear Results" button
    const clearButton = document.createElement("button");
    clearButton.id = "clearResultsBtn";
    clearButton.textContent = "Clear Results";
    clearButton.addEventListener('click', clearSearchResults);
    resultsContainer.appendChild(clearButton);
}

// Function to clear search results
function clearSearchResults() {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear the results from the screen
}

