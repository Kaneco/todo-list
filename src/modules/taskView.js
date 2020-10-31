import { createProject } from './project';
import { taskManager, createTask } from './task';
import { getIconElement } from './domHelper';
import datepicker from 'js-datepicker';

let tasksTitle = document.getElementById('tasks-title');
let tasksList = document.getElementById('content'); // 	// Show task modal if you click task
var taskModal = document.getElementById('task-modal');

// Clear Task View, leaving only the add task bar
const clearTaskView = () => {
	while (tasksList.firstChild != document.getElementById('create-task')) {
		tasksList.removeChild(tasksList.firstChild);
	}
};

// Render each task block
const renderTask = (project, task) => {
	let taskDiv = document.createElement('div');
	taskDiv.classList.add('task', 'd-flex', 'flex-row', 'm-1');
	taskDiv.dataset.dateCreated = project.getTaskInfo(task, 'dateCreated');
	// Task Checkbox
	let taskCheckbox = document.createElement('input');
	taskCheckbox.classList.add('form-check-input', 'align-self-center');
	taskCheckbox.setAttribute('type', 'checkbox');
	taskCheckbox.setAttribute('value', '');
	taskCheckbox.setAttribute('value', '');
	// Task Title
	let taskTitle = document.createElement('p');
	taskTitle.classList.add('taskTitle', 'align-self-center');
	taskTitle.innerText = project.getTaskInfo(task, 'title');
	// Add Task Icons
	let taskDateIcon = renderTaskIcon('faCalendarAlt');
	let taskNoteIcon = renderTaskIcon('faStickyNote');
	let taskPriorityIcon = renderTaskIcon('faExclamationCircle');
	let taskDeleteIcon = renderTaskIcon('faTrash');
	taskDeleteIcon.classList.add('ml-auto');
	taskDiv.appendChild(taskCheckbox);
	taskDiv.appendChild(taskTitle);
	taskDiv.appendChild(taskDateIcon);
	taskDiv.appendChild(taskNoteIcon);
	taskDiv.appendChild(taskPriorityIcon);
	taskDiv.appendChild(taskDeleteIcon);
	// Append elements
	tasksList.insertBefore(taskDiv, document.getElementById('create-task'));
	return taskDiv;
};

//Create a FontAwesome icon for tasks given the name of the element
const renderTaskIcon = (iconName) => {
	// Create Outer Span
	let icon = document.createElement('span');
	icon.classList.add('m-1', 'align-self-center');
	//Create Inner i FontAwesome element
	let iElement = getIconElement(iconName);
	icon.appendChild(iElement);
	return icon;
};

// Open task modal
const openTaskModal = () => {
	let backdrop = document.createElement('div');
	backdrop.classList.add('modal-backdrop', 'fade', 'show');
	backdrop.id = 'modalbackdrop';
	document.body.appendChild(backdrop);
	document.body.classList.add('modal-open');
	taskModal.classList.add('show');
	taskModal.style.display = 'block';
	taskModal.style.zIndex = 1050;
	taskModal.style.opacity = 1;
	taskModal.setAttribute('aria-modal', true);
	taskModal.removeAttribute('aria-hidden', true);
};

// Close task modal
const closeTaskModal = () => {
	document.getElementById('modalbackdrop').remove();
	document.body.classList.remove('modal-open');
	taskModal.classList.remove('show');
	taskModal.style.display = 'none';
	taskModal.style.zIndex = -1;
	taskModal.style.opacity = 0;
	taskModal.removeAttribute('aria-modal', true);
	taskModal.setAttribute('aria-hidden', true);
};


export { clearTaskView, renderTask, openTaskModal, closeTaskModal };
