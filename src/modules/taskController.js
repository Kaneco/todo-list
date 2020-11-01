import { renderTask, openTaskModal, closeTaskModal } from './taskView';
import { createProject, getProject } from './project';
import { taskManager, createTask } from './task';
import {
	addProjectLink,
	addProjectHeader,
	removeProjectLink,
	editProjectLink,
	swapEditIcon,
} from './projectView';
import bootstrap from 'bootstrap';

let tasksTitle = document.getElementById('tasks-title');
let taskList = document.getElementById('content');
let projectNameInput = document.getElementById('new-project-input');
let buttonAddProject = document.getElementById('btn-add-project');
let formProjectName = document.getElementById('form-project-name');
let projectList = document.getElementById('project-list');
let taskCategories = document.getElementById('task-categories');
let projectHeader = document.getElementById('project-header');
let modalTitle = document.getElementById('modal-task-title');
let modalDateCreated = document.getElementById('modal-date-created');
let modalDateDue = document.getElementById('modal-date-due');
let modalNotes = document.getElementById('modal-task-notes');
let modalPriority = document.getElementById('modal-task-priority');
let modalDone = document.getElementById('modal-task-done');

const taskController = () => {
	// Event delegation from taskList
	let taskModal = document.getElementById('task-modal');
	taskList.addEventListener('click', (event) => {
		if (event.target.closest('.fa-trash')) {
			// If you select the delete button
			console.log(event.target.closest('.task').dataset.dateCreated);
		}
		// if (event.target.closest('.fa-sticky-note')) {
		// 	// If you select the note
		// 	console.log('noteButton');
		// }
		if (event.target.closest('.fa-calendar-day')) {
			// If you select the calendar
			console.log('calendarAlt');
		}
		if (
			// Show task modal if you click the task or taskTitle
			event.target.classList.contains('task') ||
			event.target.classList.contains('taskTitle')
		) {
			// only open if the modal is not already open
			if (!document.body.classList.contains('modal-open')) {
				openTaskModal();
				console.log(event.target.closest('.task').childNodes[1].innerText);
				modalTitle.innerText = event.target.closest(
					'.task'
				).childNodes[1].innerText;
				//modalDateCreated = event.target.closest('.task').dataset.dateCreated;
			}
		}
	}); // Close the Modal if you click outside
	taskModal.addEventListener('click', (event) => {
		if (document.body.classList.contains('modal-open')) {
			if (event.target.id == 'task-modal') {
				closeTaskModal();
			}
		}
	}); // Close Task Modal on Close Button
	document.getElementById('close-modal').addEventListener('click', (event) => {
		closeTaskModal();
	}); // Open Task Modal on extra settings button
	document
		.getElementById('task-extra-settings')
		.addEventListener('click', (event) => {
			openTaskModal();
			modalTitle.innerText = document.getElementById('task-quick-add').value;
		});

	let modalTaskTitle = document.getElementById('modal-task-title');

	//track project name for editing purposes
	let originalTitle = modalTaskTitle.innerText;
	let updatedTitle = '';
	// Project Title Edit - if the content has been changed, enable saving
	modalTaskTitle.addEventListener('keypress', function () {
		if (modalTaskTitle.innerHTML !== originalTitle) {
			// swapEditIcon();
			updatedTitle = modalTaskTitle.innerText;
		}
	});

	// Edit Project Title with Enter key
	modalTaskTitle.addEventListener('keydown', (event) => {
		var key = event.key || event.keyCode;
		// Number 13 is the "Enter" key on the keyboard
		// Prevent Enter key in Project Title edit
		if (key === 'Enter' || key === 13) {
			event.preventDefault();
			modalTaskTitle.blur();
			if (updatedTitle != originalTitle) {
				// Update Task Title
				updatedTitle = modalTaskTitle.innerText;
				originalTitle = updatedTitle;
				//Placeholder
			} else {
				// If title is not updated revert back to original
				modalTaskTitle.innerText = originalTitle;
			}
		}
	});

	// Edit Project Title when focus is removed from element
	modalTaskTitle.addEventListener('focusout', (event) => {
		if (updatedTitle != originalTitle) {
			// Update Task Title
			updatedTitle = modalTaskTitle.innerText;
			originalTitle = updatedTitle;
			//Placeholder
		} else {
			// If title is not updated revert back to original
			modalTaskTitle.innerText = originalTitle;
		}
	});
};

const projectController = () => {
	// Make the input submit on ENTER
	projectNameInput.addEventListener('keydown', (event) => {
		var key = event.key || event.keyCode;
		// Number 13 is the "Enter" key on the keyboard
		if (key === 'Enter' || key === 13) {
			event.preventDefault();
			addProjectToDOM(projectNameInput.value);
			formProjectName.reset();
		}
	});
	// Submit input default behaviour
	formProjectName.addEventListener('submit', (event) => {
		event.preventDefault();
		addProjectToDOM(projectNameInput.value);
		formProjectName.reset();
	});
	// Task Categories Sidebar functionality
	taskCategories.addEventListener('click', (event) => {
		let projectId = event.target.closest('.menu-tasks').id;
		let title;
		// Convert project title to an acceptable format for changeProjectHeader()
		// Had to do this conversion due to retrieving project titles from the mobile version
		switch (projectId) {
			case 'all-tasks':
				title = 'All Tasks';
				break;
			case 'tasks-due-today':
				title = 'Today';
				break;
			case 'tasks-due-this-week':
				title = 'Due This Week';
				break;
			case 'urgent-tasks':
				title = 'Urgent';
				break;
			default:
				title = 'All Tasks';
				break;
		}
		changeProjectHeader(title);
	});
	// Project List Sidebar Functionality
	projectList.addEventListener('click', (event) => {
		let projectName = event.target.querySelector('span').innerText;
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
	let projectTitle = document.getElementById('project-view-title');

	//track project name for editing purposes
	let originalTitle = projectTitle.innerText;
	let updatedTitle = '';

	// Project Header Settings (Delete and Edit)
	let projectHeader = document.getElementById('project-header');
	projectHeader.addEventListener('click', (event) => {
		if (event.target.id == 'delete-project') {
			removeProjectLink(name);
			changeProjectHeader('All Tasks');
		} else if (event.target.id == 'edit-project') {
			document.getElementById('project-view-title').focus();
		}
	});

	// Project Title Edit - if the content has been changed, enable saving
	projectTitle.addEventListener('keypress', function () {
		if (projectTitle.innerHTML !== originalTitle) {
			// swapEditIcon();
			updatedTitle = projectTitle.innerText;
		}
	});

	// Edit Project Title with Enter key
	projectTitle.addEventListener('keydown', (event) => {
		var key = event.key || event.keyCode;
		// Number 13 is the "Enter" key on the keyboard
		// Prevent Enter key in Project Title edit
		if (key === 'Enter' || key === 13) {
			event.preventDefault();
			projectTitle.blur();
			if (updatedTitle != originalTitle) {
				// Show the undo button in the case that you
				// didn't like what you wrote and you want to
				// go back to square one
				updatedTitle = projectTitle.innerText;
				editProjectLink(originalTitle, updatedTitle);
				originalTitle = updatedTitle;
			} else {
				// If title is not updated revert back to original
				projectTitle.innerText = originalTitle;
			}
		}
	});

	// Edit Project Title when focus is removed from element
	projectTitle.addEventListener('focusout', (event) => {
		if (updatedTitle != originalTitle) {
			updatedTitle = projectTitle.innerText;
			editProjectLink(originalTitle, updatedTitle);
			originalTitle = updatedTitle;
		} else {
			// If title is not updated revert back to original
			modalTaskTitle.innerText = originalTitle;
		}
	});
};

// Get info from project model to taskView
const getInfo = (project, task, property ) => {
	return project.getTaskInfo(task, property);
}


// Change the project header (name and icons)
const initProject = (projectName) => {
	let project = getProject('All Tasks');
	console.log(project);
	for (const task of project.getTasks()) {
		renderTask(task);
	}
};


taskController();
projectController();
let defaultProject = createProject('All Tasks');
let task1 = createTask('Task1');
let task2 = createTask('Task2');
let task3 = createTask('Task3');
taskManager.setNote(task1, "Test Note");
taskManager.setPriority(task3, true);
defaultProject.addTask(task1);
defaultProject.addTask(task2);
defaultProject.addTask(task3);
defaultProject.update();

initProject('All Tasks');



export { taskController, initProject, getInfo };
