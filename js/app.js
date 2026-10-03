function createTaskApp() {
  var counter = 0;

  var input = document.getElementById("taskInput");
  var addBtn = document.getElementById("addTaskBtn");
  var loadBtn = document.getElementById("loadSamplesBtn");
  var list = document.getElementById("taskList");
  var message = document.getElementById("taskMessage");
  var totalEl = document.getElementById("totalCount");
  var pendingEl = document.getElementById("pendingCount");
  var completedEl = document.getElementById("completedCount");

  function makeId() {
    counter += 1;
    return "task-" + counter;
  }

  function createTaskElement(taskText, taskId) {
    var li = document.createElement("li");
    li.className = "task-item";
    li.dataset.taskId = taskId;
    li.dataset.state = "pending";

    var span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    var completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Complete";

    var editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    var removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    return li;
  }

  function addTask(taskText) {
    var clean = taskText.trim();
    if (clean === "") {
      message.textContent = "Task cannot be empty";
      return;
    }

    list.appendChild(createTaskElement(clean, makeId()));
    input.value = "";
    message.textContent = "";
    updateTaskCounts();
  }

  function toggleTaskComplete(taskItem) {
    var done = taskItem.classList.toggle("completed");
    taskItem.dataset.state = done ? "completed" : "pending";
    updateTaskCounts();
  }

  function beginTaskEdit(taskItem) {
    var span = taskItem.querySelector(".task-text");
    var editBtn = taskItem.querySelector(".edit-btn");

    var editField = document.createElement("input");
    editField.className = "edit-input";
    editField.value = span.textContent;

    taskItem.replaceChild(editField, span);
    editBtn.textContent = "Save";
  }

  function saveTaskEdit(taskItem) {
    var editField = taskItem.querySelector(".edit-input");
    var editBtn = taskItem.querySelector(".edit-btn");

    var clean = editField.value.trim();
    if (clean === "") {
      message.textContent = "Task cannot be empty";
      return;
    }

    var span = document.createElement("span");
    span.className = "task-text";
    span.textContent = clean;

    taskItem.replaceChild(span, editField);
    editBtn.textContent = "Edit";
    message.textContent = "";
  }

  function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
  }

  function updateTaskCounts() {
    var items = list.querySelectorAll(".task-item");
    var total = items.length;
    var completed = 0;

    items.forEach(function (item) {
      if (item.dataset.state === "completed") {
        completed += 1;
      }
    });

    totalEl.textContent = total;
    completedEl.textContent = completed;
    pendingEl.textContent = total - completed;
  }

  function handleTaskListClick(event) {
    var button = event.target;
    var taskItem = button.closest(".task-item");
    if (!taskItem) {
      return;
    }

    if (button.matches(".complete-btn")) {
      toggleTaskComplete(taskItem);
    } else if (button.matches(".edit-btn")) {
      if (button.textContent === "Edit") {
        beginTaskEdit(taskItem);
      } else {
        saveTaskEdit(taskItem);
      }
    } else if (button.matches(".remove-btn")) {
      removeTask(taskItem);
    }
  }

  function loadSampleTasks() {
    var samples = ["Review DOM selectors", "Practice createElement", "Study event delegation"];
    var fragment = document.createDocumentFragment();

    samples.forEach(function (text) {
      fragment.appendChild(createTaskElement(text, makeId()));
    });

    list.appendChild(fragment);
    updateTaskCounts();
  }

  addBtn.addEventListener("click", function () {
    addTask(input.value);
  });

  loadBtn.addEventListener("click", loadSampleTasks);
  list.addEventListener("click", handleTaskListClick);

  updateTaskCounts();
}

document.addEventListener("DOMContentLoaded", function () {
  createTaskApp();
});
