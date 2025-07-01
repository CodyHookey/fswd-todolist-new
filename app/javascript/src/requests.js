import $ from "jquery";

// Index Tasks

$.ajaxSetup({
  headers: {
    "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
  },
});

export var indexTasks = function (successCB, errorCB) {
  var request = {
    type: "GET",
    url: "api/tasks?api_key=1",
    success: successCB,
    error: errorCB,
  };

  $.ajax(request);
};

// Create Tasks

export var postTask = function (content, successCB, errorCB) {
  var request = {
    type: "POST",
    url: "api/tasks?api_key=1",
    data: {
      task: {
        content: content,
      },
    },
    success: successCB,
    error: errorCB,
  };

  $.ajax(request);
};

// Delete Task

export var deleteTask = function (taskId, successCB, errorCB) {
  var request = {
    type: "DELETE",
    url: `api/tasks/${taskId}?api_key=1`,
    success: function (response) {
      if (successCB) {
        successCB(response);
      }
    },
    error: function (request, status, error) {
      if (error) {
        errorCB(request, status, error);
      } else {
        console.error("Delete failed: ", error);
      }
    },
  };

  $.ajax(request);
};

// Mark Task Complete

export var markComplete = function (id, successCB, errorCB) {
  var request = {
    type: "PUT",
    url: `api/tasks/${id}/mark_complete?api_key=1`,
    success: function (response, textStatus) {
      indexTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  };

  $.ajax(request);
};

// Mark Task Active

export var markActive = function (id, successCB, errorCB) {
  var request = {
    type: "PUT",
    url: `api/tasks/${id}/mark_active?api_key=1`,
    success: function (response, textStatus) {
      indexTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  };

  $.ajax(request);
};
