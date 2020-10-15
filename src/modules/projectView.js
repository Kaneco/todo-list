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
	// Project Delete and Edit Buttons
	let iconsDiv = document.createElement("div");
	iconsDiv.id = "project-settings";
	let projectDelete = getIconElement("faTrash");
	let projectEdit = getIconElement("faEdit");
	// Project Title
	let projectTitle = document.createElement("span");
	projectTitle.classList.add("project-title");
	projectTitle.innerText = title;
	// Add elements togetheer
	projectHeader.appendChild(projectHeaderTitle);
	projectHeader.appendChild(iconsDiv);
	iconsDiv.appendChild(projectDelete);
	iconsDiv.appendChild(projectEdit);
	return projectHeader;
};

//Add and remove project Link from the Sidebar menu
const addProjectLink = (element) => {
	projectListSidebar.append(element);
};

const removeProjectLink = (name) => {
	console.log(projectListSidebar);
};

const addProjectHeader = (element) => {
	let projectHeader = document.getElementById("project-header");
	projectHeader.remove();
	mainWrapperContent.insertBefore(element, document.getElementById("content"));
};

const removeProjectHeader = (name) => {};

export {
	createProjectLink,
	addProjectLink,
	createProjectHeader,
	addProjectHeader,
};
