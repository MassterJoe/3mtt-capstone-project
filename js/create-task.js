document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const submitBtn = document.getElementById("submitBtn");



    async function handleEditTask(event) {
        const taskId = event.target.dataset.id;

        if (!taskId) {
            alert("Invalid task ID. Please refresh and try again.");
            return;
        }

        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`https://threemtt-capstone-project-c0vy.onrender.com/api/tasks/${taskId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                const task = result.task;

                // Populate form fields with task data
                document.getElementById("title").value = task.title || "";
                document.getElementById("description").value = task.description || "";
                document.getElementById("deadline").value = task.deadline
                    ? task.deadline.substring(0, 10)
                    : "";
                document.getElementById("priority").value = task.priority || "medium";
                document.getElementById("status").value = task.status || "pending";

                submitBtn.innerText = "Update Task";
                taskForm.dataset.editingId = taskId; // Save the editing ID
            } else {
                alert(`Error: ${result.message || "Failed to fetch task for editing"}`);
            }
        } catch (error) {
            console.error("Error fetching task for editing:", error);
            alert("Error: Unable to fetch task for editing. Please try again.");
        }
    }

    // Fetch tasks and display them
    async function fetchTasks() {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You are not logged in!");
            return;
        }

        try {
            setLoadingState(submitBtn, true); // Set loading state
            const response = await fetch("https://threemtt-capstone-project-c0vy.onrender.com/api/tasks", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                renderTasks(result.tasks);
            } else {
                alert(`Error: ${result.message || "Failed to fetch tasks"}`);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Error: Unable to fetch tasks. Please try again.");
        } finally {
            setLoadingState(submitBtn, false); // Reset loading state
        }
    }

    // Render tasks with Edit and Delete buttons
    function renderTasks(tasks) {
        if (!Array.isArray(tasks)) {
            console.error("Expected an array but got:", tasks);
            alert("Failed to load tasks. Please try again.");
            return;
        }

        taskList.innerHTML = ""; // Clear existing tasks

        tasks.forEach((task) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${task.title}</strong> - ${task.description} 
                (Priority: ${task.priority}, Status: ${task.status})
                <button class="editBtn" data-id="${task._id}">Edit</button>
                <button class="deleteBtn" data-id="${task._id}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });

        // Attach delete and edit handlers
        document.querySelectorAll(".deleteBtn").forEach((btn) => {
            btn.addEventListener("click", handleDeleteTask);
        });

        document.querySelectorAll(".editBtn").forEach((btn) => {
            btn.addEventListener("click", handleEditTask);
        });
    }

    // Handle task deletion
    async function handleDeleteTask(event) {
        const taskId = event.target.dataset.id;

        if (!taskId) {
            alert("Invalid task ID. Please refresh and try again.");
            return;
        }

        const token = localStorage.getItem("authToken");
        const deleteBtn = event.target;

        try {
            setLoadingState(deleteBtn, true); // Set loading state
            const response = await fetch(`https://threemtt-capstone-project-c0vy.onrender.com/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok) {
                alert("Task deleted successfully!");
                fetchTasks(); // Refresh the task list
            } else {
                alert(`Error: ${result.message || "Failed to delete task"}`);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error: Unable to delete task. Please try again.");
        } finally {
            setLoadingState(deleteBtn, false); // Reset loading state
        }
    }

    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("You are not logged in!");
            return;
        }

        const taskData = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            deadline: document.getElementById("deadline").value,
            priority: document.getElementById("priority").value,
            status: document.getElementById("status").value,
        };

        const isEditing = taskForm.dataset.editingId;
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing 
            ? `https://threemtt-capstone-project-c0vy.onrender.com/api/tasks/${taskForm.dataset.editingId}` 
            : "https://threemtt-capstone-project-c0vy.onrender.com/api/tasks";

        try {
            setLoadingState(submitBtn, true); // Set loading state
            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(isEditing ? "Task updated successfully!" : "Task created successfully!");
                fetchTasks(); // Refresh tasks
                taskForm.reset(); // Reset form fields
                submitBtn.innerText = "Create Task"; // Reset button text
                delete taskForm.dataset.editingId; // Clear editing ID
            } else {
                alert(`Error: ${result.message || "Failed to update task"}`);
            }
        } catch (error) {
            console.error("Error submitting task:", error);
            alert("Error: Unable to submit task. Please try again.");
        } finally {
            setLoadingState(submitBtn, false); // Reset loading state
        }
    });

    // Utility function to set loading state
    function setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerText = "Loading...";
        } else {
            button.disabled = false;
            button.innerText = button.dataset.defaultText || "Submit";
        }
    }

    // Initial call to fetch tasks
    fetchTasks();
});
