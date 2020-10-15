import { createProject } from "./project";
import { taskManager, createTask } from "./task";
import { getIconElement } from "./domHelper";

let tasksTitle = document.getElementById("tasks-title");
let tasksList = document.getElementById("content");

// Clear Task View, leaving only the add task bar
const clearTaskView = () => {
	while (tasksList.firstChild != document.getElementById("create-task")) {
		tasksList.removeChild(tasksList.firstChild);
	}
};

// Render each task block
const renderTask = (project, task) => {
	let taskDiv = document.createElement("div");
	taskDiv.classList.add("task", "d-flex", "flex-row", "m-1");
	taskDiv.dataset.dateCreated = project.getTaskInfo(task, "dateCreated");
	// Task Checkbox
	let taskCheckbox = document.createElement("input");
	taskCheckbox.classList.add("form-check-input", "align-self-center");
	taskCheckbox.setAttribute("type", "checkbox");
	taskCheckbox.setAttribute("value", "");
	taskCheckbox.setAttribute("value", "");
	// Task Title
	let taskTitle = document.createElement("p");
	taskTitle.classList.add("taskTitle", "align-self-center");
	taskTitle.innerText = project.getTaskInfo(task, "title");
	// Add Task Icons
	let taskDateIcon = renderTaskIcon("faCalendarAlt");
	let taskNoteIcon = renderTaskIcon("faStickyNote");
	let taskPriorityIcon = renderTaskIcon("faExclamationCircle");
	let taskDeleteIcon = renderTaskIcon("faTrash");
	taskDeleteIcon.classList.add("ml-auto");
	taskDiv.appendChild(taskCheckbox);
	taskDiv.appendChild(taskTitle);
	taskDiv.appendChild(taskDateIcon);
	taskDiv.appendChild(taskNoteIcon);
	taskDiv.appendChild(taskPriorityIcon);
	taskDiv.appendChild(taskDeleteIcon);
	// Append elements
	tasksList.insertBefore(taskDiv, document.getElementById("create-task"));
	return taskDiv;
};

//Create a FontAwesome icon for tasks given the name of the element
const renderTaskIcon = (iconName) => {
	// Create Outer Span
	let icon = document.createElement("span");
	icon.classList.add("m-1", "align-self-center");
	//Create Inner i FontAwesome element
	let iElement = getIconElement(iconName);
	icon.appendChild(iElement);
	return icon;
};

console.log(getIconElement("faTrash"));

let test1Project = createProject("test1");
console.log(test1Project);
let task1 = createTask("Task1");
let task2 = createTask("Task2");
let task3 = createTask("Task3");
test1Project.addTask(task1);
test1Project.addTask(task2);
test1Project.addTask(task3);
renderTask(test1Project, task2);
renderTask(test1Project, task3);

export { clearTaskView, renderTask };
