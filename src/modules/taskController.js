import { createProject } from "./project";
import { addProject } from "./projectView";
import { taskManager, createTask } from "./task";
import {
	createProjectLink,
	addProjectLink,
	createProjectHeader,
	addProjectHeader,
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
		submitProject(projectNameInput.value);
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
    // Project Header Settings (Delete and Edit)
    projectHeader.addEventListener("click", (event) => {
        if (event.target.id == "delete-project") {
            console.log("delete");
        }
        else if (event.target.id == "edit-project") {
            console.log("edit");
        }
	});
};

const submitProject = (name) => {
	let projectDomElement = createProjectLink(name);
	addProjectLink(projectDomElement);
};

const changeProjectHeader = (name) => {
	let projectHeader = createProjectHeader(name);
	addProjectHeader(projectHeader);
};


taskController();
projectController();

export { taskController };
