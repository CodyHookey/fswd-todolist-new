import $ from "jquery";

import {
  indexTasks,
  postTask,
  deleteTask,
  markComplete,
  markActive,
} from "./requests";

let currentFilter = "all";

// Render Tasks Function

function renderTasks(response) {
  $("#tasks").empty();

  response.tasks.map(function (task) {
    const isCompleted = task.completed;
    const shouldRender =
      currentFilter === "all" ||
      (currentFilter === "complete" && isCompleted) ||
      (currentFilter === "active" && !isCompleted);

    if (!shouldRender) return;

    const taskDiv =
      "<div class='col-12 mb-3 p-2 border rounded task " +
      (isCompleted ? "complete" : "incomplete") +
      " d-flex justify-content-between' data-id='" +
      task.id +
      "'>" +
      "<span>" +
      task.content +
      "</span>" +
      "<div>" +
      "<button class='btn btn-danger btn-sm delete-task me-2' data-task-id='" +
      task.id +
      "'>Remove</button>" +
      "<input type='checkbox' name='myCheckbox' class='mark-complete' " +
      (isCompleted ? "checked" : "") +
      ">" +
      "</div>" +
      "</div>";

    $("#tasks").append(taskDiv);
  });
}

// Create Task

$(document).on("click", "#create-task-btn", function (e) {
  e.preventDefault();
  console.log("clicked");

  if (!$("#new-task-content").val()) {
    alert("Task Content must be filled!");
    return;
  }

  postTask($("#new-task-content").val(), function (response) {
    $("#new-task-content").val("");
    indexTasks(renderTasks);
  });
});

// Mark Complete and Active

$(document).on("change", ".mark-complete", function () {
  const $taskId = $(this).closest(".task").data("id");

  if (this.checked) {
    markComplete($taskId);
  } else {
    markActive($taskId);
  }
});

// Delete Task

$(document).on("click", ".delete-task", function () {
  const taskId = $(this).closest(".task").data("id");
  deleteTask(taskId, () => {
    indexTasks(renderTasks);
  });
});

// Task Filter

$(document).on("click", ".allTasks", function () {
  currentFilter = "all";
  indexTasks(renderTasks);
});

$(document).on("click", ".activeTasks", function () {
  currentFilter = "active";
  indexTasks(renderTasks);
});

$(document).on("click", ".completeTasks", function () {
  currentFilter = "complete";
  indexTasks(renderTasks);
});

// Index Tasks

indexTasks(renderTasks);
