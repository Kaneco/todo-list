import {createProject} from "./project";
import { taskManager, createTask } from "./task";

let tasksTitle = document.getElementById("tasks-title");
let tasksList = document.getElementById("content");

const clearTaskView = () => {
	while (tasksList.firstChild) {
		tasksList.removeChild(tasksList.lastChild);
	}
};

const renderTask = (project, task) => {
	let taskDiv = document.createElement("div");
	taskDiv.classList.add("task", "d-flex", "flex-row", "m-1");
	let taskCheckbox = document.createElement("input");
	taskCheckbox.outerHTML = `<input class="form-check-input align-self-center" type="checkbox" value=""
    aria-label="Checkbox for following text input">`;
	let taskTitle = document.createElement("p");
	taskTitle.classList.add("taskTitle", "align-self-center");
	taskTitle.innerText = test1Project.getTaskInfo(task, "title");
	let taskDateIcon = document.createElement("span");
	let taskNoteIcon = document.createElement("span");
	let taskPriorityIcon = document.createElement("span");
	let taskDeleteIcon = document.createElement("span");
	taskDateIcon.outerHTML = `<span class="m-1 align-self-center "><i class="far fa-calendar-alt"></i></span>`;
	taskNoteIcon.outerHTML = `<span class="m-1 align-self-center"><i class="fas fa-sticky-note"></i></span>`;
	taskPriorityIcon.outerHTML = `<span class="m-1 align-self-center"><i class="fas fa-exclamation-circle"></i></span>`;
	taskDeleteIcon.outerHTML = `<span class="ml-auto m-1 align-self-center"><i class="fas fa-trash"></i></span>`;
	taskDiv.appendChild(taskCheckbox);
	taskDiv.appendChild(taskTitle);
	taskDiv.appendChild(taskDateIcon);
	taskDiv.appendChild(taskNoteIcon);
	taskDiv.appendChild(taskPriorityIcon);
    taskDiv.appendChild(taskDeleteIcon);
    tasksList.appendChild(taskDiv);
	return taskDiv;
};

let test1Project = createProject("test1");
console.log(test1Project);
let task1 = createTask("Task1");
let task2 = createTask("Task2");
let task3 = createTask("Task3");
test1Project.addTask(task1);
test1Project.addTask(task2);
test1Project.addTask(task3);


renderTask(test1Project, task2);

export {clearTaskView, renderTask}