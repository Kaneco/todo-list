import { createProject } from "./project";
import { addProject } from "./projectView";
import { taskManager, createTask } from "./task";
import {
	addProjectLink,
	addProjectHeader,
	removeProjectLink,
	editProjectLink,
	swapEditIcon,
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
			event.preventDefault();
			addProjectToDOM(projectNameInput.value);
			formProjectName.reset();
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

// Change the project header (name and icons)
const changeProjectHeader = (name) => {
	//add header
	addProjectHeader(name);
	let projectTitle = document.getElementById("project-view-title");

	//track project name for editing purposes
	let originalTitle = projectTitle.innerText;
	let updatedTitle = "";

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

	// Project Title Edit - if the content has been changed, enable saving
	projectTitle.addEventListener("keypress", function () {
		if (projectTitle.innerHTML !== originalTitle) {
            // swapEditIcon();
            updatedTitle = projectTitle.innerText;
		}
	});

	// Edit Project Title with Enter key
	projectTitle.addEventListener("keydown", (event) => {
		var key = event.key || event.keyCode;
        // Number 13 is the "Enter" key on the keyboard
        // Prevent Enter key in Project Title edit
		if (key === "Enter" || key === 13) {
			event.preventDefault();
			projectTitle.blur();
			if (updatedTitle != originalTitle) {
				// Show the undo button in the case that you
				// didn't like what you wrote and you want to
				// go back to square one
				updatedTitle = projectTitle.innerText;
                editProjectLink(originalTitle, updatedTitle);
                originalTitle = updatedTitle;
            } else { // If title is not updated revert back to original
                projectTitle.innerText = originalTitle;
            }
		}
	});

    // Edit Project Title when focus is removed from element
	projectTitle.addEventListener("focusout", (event) => {
		if (updatedTitle != originalTitle) {
			updatedTitle = projectTitle.innerText;
            editProjectLink(originalTitle, updatedTitle);
            originalTitle = updatedTitle;
		}else { // If title is not updated revert back to original
            projectTitle.innerText = originalTitle;
        }
	});
};

taskController();
projectController();

export { taskController };
