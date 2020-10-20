import { createProject } from "./project";
import { addProject } from "./projectView";
import { taskManager, createTask } from "./task";
import {
	addProjectLink,
    addProjectHeader,
    removeProjectLink,
    editProjectLink,
} from "./projectView";

let tasksTitle = document.getElementById("tasks-title");
let taskList = document.getElementById("content");
let projectNameInput = document.getElementById("new-project-input");
let buttonAddProject = document.getElementById("btn-add-project");
let formProjectName = document.getElementById("form-project-name");
let projectList = document.getElementById("project-list");
let taskCategories = document.getElementById("task-categories");
let projectHeader = document.getElementById("project-header");

const taskController = () => {
	// Event delegation from taskList
	taskList.addEventListener("click", (event) => {
		if (event.target.closest(".fa-trash")) {
			// If you select the delete button
			console.log(event.target.closest(".task").dataset.dateCreated);
		}
		if (event.target.closest(".fa-sticky-note")) {
			// If you select the note
			console.log("noteButton");
		}
		if (event.target.closest(".fa-calendar-day")) {
			// If you select the calendar
			console.log("calendarAlt");
		}
	});
};

const projectController = () => {
	// Make the input submit on ENTER
	projectNameInput.addEventListener("keydown", (event) => {
		var key = event.key || event.keyCode;
		// Number 13 is the "Enter" key on the keyboard
		if (key === "Enter" || key === 13) {
			formProjectName.submit();
		}
	});
	// Submit input default behaviour
	formProjectName.addEventListener("submit", (event) => {
		event.preventDefault();
		addProjectToDOM(projectNameInput.value);
		formProjectName.reset();
	});
	// Task Categories Sidebar functionality
	taskCategories.addEventListener("click", (event) => {
		let projectName = event.target.querySelector("span").innerText;
		changeProjectHeader(projectName);
	});
	// Project List Sidebar Functionality
	projectList.addEventListener("click", (event) => {
		let projectName = event.target.querySelector("span").innerText;
		changeProjectHeader(projectName);
	});
};

const addProjectToDOM = (name) => {
	addProjectLink(name);
};

const changeProjectHeader = (name) => {
    addProjectHeader(name);
    // Project Header Settings (Delete and Edit)
    let projectHeader = document.getElementById("project-header");
	projectHeader.addEventListener("click", (event) => {
		if (event.target.id == "delete-project") {
            removeProjectLink(name);
			changeProjectHeader("All Tasks");
		} else if (event.target.id == "edit-project") {
            document.getElementById("project-view-title").focus();
		}
	});
};

taskController();
projectController();

export { taskController };
