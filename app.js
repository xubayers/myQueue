// security check
let lockScreen = document.getElementById("lock-screen");
let enter = lockScreen.querySelector("button");
let passkeys = ["460101", "myqueue"];

function security() {
  let pin = lockScreen.querySelector("input").value;

  if (passkeys.includes(pin)) {
    alert("Welcome back");
    lockScreen.classList.add("hidden");
  } else {
    alert("wrong pin");
    return;
  }
}
// Add event listener for button click
enter.addEventListener("click", security);

// Add event listener for 'Enter' key press
let passInput = lockScreen.querySelector("input");
passInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    security(); // Trigger the same function when Enter is pressed
  }
});

const addGoalButton = document.getElementById("addGoal");
const learningGoalInput = document.getElementById("learningGoal");
const learningQueue = document.getElementById("learningQueue");
const completedQueue = document.getElementById("completedQueue");

// Function to load stored data from Local Storage
function loadQueue() {
  const storedQueue = JSON.parse(localStorage.getItem("learningQueue")) || [];
  const storedCompletedQueue =
    JSON.parse(localStorage.getItem("completedQueue")) || [];

  storedQueue.forEach((goal) => addGoalToList(goal));
  storedCompletedQueue.forEach((goal) => addCompletedTask(goal));
}

// Function to save data to Local Storage
function saveQueue() {
  const goals = [];
  document.querySelectorAll("#learningQueue li span").forEach((span) => {
    goals.push(span.textContent);
  });
  localStorage.setItem("learningQueue", JSON.stringify(goals));

  const completedGoals = [];
  document.querySelectorAll("#completedQueue li span").forEach((span) => {
    completedGoals.push(span.textContent);
  });
  localStorage.setItem("completedQueue", JSON.stringify(completedGoals));
}

// Function to add a goal to the list
function addGoalToList(goalText) {
  const listItem = document.createElement("li");
  listItem.className =
    "flex items-end justify-between p-4 bg-gray-50 border rounded-lg";

  const goalSpan = document.createElement("span");
  goalSpan.className = "text-lg";
  goalSpan.textContent = goalText;

  const doneButton = document.createElement("button");
  doneButton.className =
    "bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600";
  doneButton.textContent = "Done";

  doneButton.addEventListener("click", function () {
    let isDone = prompt("enter you pin");
    if (passkeys.includes(isDone)) {
      moveToCompleted(goalText, listItem);
    } else {
      alert("you may wrongs");
      return;
    }
  });

  listItem.appendChild(goalSpan);
  listItem.appendChild(doneButton);
  learningQueue.appendChild(listItem);
}

// Function to move a task to completed list
function moveToCompleted(goalText, listItem) {
  listItem.remove(); // Remove the task from the current queue
  addCompletedTask(goalText); // Add to completed tasks
  saveQueue(); // Save the updated state
}

// Function to add a task to the completed list
function addCompletedTask(goalText) {
  const listItem = document.createElement("li");
  listItem.className =
    "flex items-end justify-between p-4 bg-gray-50 border rounded-lg";

  const goalSpan = document.createElement("span");
  goalSpan.className = "text-lg";
  goalSpan.textContent = goalText;

  const removeButton = document.createElement("button");
  removeButton.className =
    "bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600";
  removeButton.textContent = "rm";

  removeButton.addEventListener("click", function () {
    let isRm = prompt("enter you pin");
    if (passkeys.includes(isRm)) {
      listItem.remove(); // Remove the task from the completed list
      saveQueue(); // Save the updated state
    } else {
      alert("you may wrongs");
      return;
    }
  });

  listItem.appendChild(goalSpan);
  listItem.appendChild(removeButton);
  completedQueue.appendChild(listItem);
}

// Event listener for adding goals
addGoalButton.addEventListener("click", function () {
  const goalText = learningGoalInput.value.trim();

  if (goalText) {
    addGoalToList(goalText);
    saveQueue(); // Save the new state after adding
    learningGoalInput.value = ""; // Clear input field
  }
});

// Load the queue from Local Storage on page load
window.addEventListener("DOMContentLoaded", loadQueue);
