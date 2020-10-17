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
    let defaultProjects = !((title == "All Tasks") || (title == "Today") || (title == "Due This Week") || (title == "Urgent"));
    if (defaultProjects) {
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


export {
	createProjectLink,
	addProjectLink,
	createProjectHeader,
	addProjectHeader,
};
