import { taskManager } from './task';
import { getIconElement } from './domHelper';
import datepicker from 'js-datepicker';

let tasksList = document.getElementById('content'); // 	// Show task modal if you click task
var taskModal = document.getElementById('task-modal');

// Clear Task View, leaving only the add task bar
const clearTaskView = () => {
	while (tasksList.firstChild != document.getElementById('create-task')) {
		tasksList.removeChild(tasksList.firstChild);
	}
};

// Render each task block
const renderTask = (task) => {
	let taskDiv = document.createElement('div');
	taskDiv.classList.add('task', 'd-flex', 'flex-row', 'm-1');
	taskDiv.dataset.dateCreated = taskManager.getDateCreated(task);
	// Task Checkbox
	let taskCheckbox = document.createElement('input');
	taskCheckbox.classList.add('form-check-input', 'align-self-center');
	taskCheckbox.setAttribute('type', 'checkbox');
	taskCheckbox.setAttribute('value', '');
	taskCheckbox.setAttribute('value', '');
	taskDiv.appendChild(taskCheckbox);
	// Task Title
	let taskTitle = document.createElement('p');
	taskTitle.classList.add('taskTitle', 'align-self-center');
	taskTitle.innerText = taskManager.getTitle(task);
	taskDiv.appendChild(taskTitle);
	// Add Task Icons
	let note = taskManager.getNote(task);
	let priority = taskManager.getPriority(task);
	let dateDue = taskManager.getDateDue(task);

	// Render Date Due icon only if task has date due set
	if (!(dateDue == '')) {
		let taskDateIcon = renderTaskIcon('faCalendarAlt');
		taskDiv.appendChild(taskDateIcon);
	}
	// Render Note Icon only if task has note set
	if (!(note == '')) {
		let taskNoteIcon = renderTaskIcon('faStickyNote');
		taskNoteIcon.dataset.toggle = 'popover';
		taskNoteIcon.setAttribute('title', note);
		//taskNoteIcon.dataset.content = note;
		taskDiv.appendChild(taskNoteIcon);
	}
	// Render Priority Icon only if task has priority set
	if (priority == true) {
		let taskPriorityIcon = renderTaskIcon('faExclamationCircle');
		taskPriorityIcon.dataset.toggle = 'popover';
		taskPriorityIcon.setAttribute('title', 'Priority Task');
		taskDiv.appendChild(taskPriorityIcon);
	}
	let taskDeleteIcon = renderTaskIcon('faTrash');
	taskDeleteIcon.classList.add('ml-auto');
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
