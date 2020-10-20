import { getIconElement } from "./domHelper";

let projectListSidebar = document.getElementById("project-list");
let mainWrapperContent = document.getElementById("main-wrapper");

// Create project element that is displayed on the sidebar for each project
const createProjectLink = (title) => {
	let projectElement = document.createElement("a");
	projectElement.classList.add("project-list-sb", "link-dark");
	projectElement.role = "button";
	// Project Arrow Icon
	let projectArrowIcon = getIconElement("faAngleRight");
	projectArrowIcon.classList.add("mr-3");
	// Project Title
	let projectTitle = document.createElement("span");
	projectTitle.classList.add("project-title");
	projectTitle.innerText = title;
	// Add Task Icons
	projectElement.appendChild(projectArrowIcon);
	projectElement.appendChild(projectTitle);
	return projectElement;
};

// Create Project header that includes title and function buttons
const createProjectHeader = (title) => {
	let projectHeader = document.createElement("div");
	projectHeader.id = "project-header";
	// Project Title
	let projectHeaderTitle = document.createElement("h4");
	projectHeaderTitle.id = "project-view-title";
	projectHeaderTitle.innerText = title;
	// Project Title
	let projectTitle = document.createElement("span");
	projectTitle.classList.add("project-title");
	projectTitle.innerText = title;
	// Add elements together
	projectHeader.appendChild(projectHeaderTitle);
	// Add Project settings only for custom projects and not default ones
	if (checkIfDefault(title)) {
		// Project Delete and Edit Buttons
		let iconsDiv = document.createElement("div");
		iconsDiv.id = "project-settings";
		let projectDelete = getIconElement("faTrash");
		let projectEdit = getIconElement("faEdit");
		projectDelete.id = "delete-project";
		projectEdit.id = "edit-project";
		projectHeader.appendChild(iconsDiv);
		iconsDiv.appendChild(projectEdit);
		iconsDiv.appendChild(projectDelete);
	}
	return projectHeader;
};

// Check if a project is default for different behaviours (if it is it shouldn't be editable or removable)
const checkIfDefault = (title) => {
	let projectDefaults =
		(title == "All Tasks" ||
		title == "Today" ||
		title == "Due This Week" ||
		title == "Urgent");
	return !projectDefaults;
};

//Add and remove project Link from the Sidebar menu
const addProjectLink = (name) => {
	let projectDomElement = createProjectLink(name);
	projectListSidebar.append(projectDomElement);
};

// Remove Project from Sidebar menu
const removeProjectLink = (name) => {
    var projectIterable = projectListSidebar.children;
    console.log(projectIterable);
	for (var element of projectIterable) {
		// Compare each elements .project-title to find the match with name provided
		var projectTitle = element.querySelector(".project-title").innerText;
		if (projectTitle == name) {
			element.remove();
			break;
		}
	}
};

// Edit Project Name on Sidebar menu
const editProjectLink = (name, newName) => {
	var projectIterable = projectListSidebar.children;
	for (var element of projectIterable) {
		// Compare each elements .project-title to find the match with name provided
		var projectTitle = element.querySelector(".project-title").innerText;
		if (projectTitle == name) {
			projectTitle.innerText = newName;
			break;
		}
	}
};

const addProjectHeader = (name) => {
	let oldProjectHeader = document.getElementById("project-header");
	oldProjectHeader.remove();
	let newProjectHeader = createProjectHeader(name);
	mainWrapperContent.insertBefore(
		newProjectHeader,
		document.getElementById("content")
	);
	// Make Header Editable if it's not a default project
	if (checkIfDefault(name)) {
		document
			.getElementById("project-view-title")
			.setAttribute("contenteditable", "true");
	}
};

export { addProjectLink, addProjectHeader, removeProjectLink, editProjectLink };
