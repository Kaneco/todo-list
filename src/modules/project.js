import { taskManager, createTask } from "./task";
import * as localStorage from "./localStorage";

// Project factory
const createProject = (name) => {
	let tasks = [];

	const getTasks = () => tasks;

	const addTask = (task) => {
		tasks.push(task);
	};

	const removeTask = (task) => {};

	const editTask = (newValue, property, task) => {
		//find the index of object from array that you want to update
		let taskId = findTaskIndex(task);
		// tasks[taskId][property] = newValue;
		// // make new object of updated object.
		const updatedTask = { ...tasks[taskId], [property]: newValue };
		// // make final new array of objects by combining updated object.
		const updatedTaskList = [
			...tasks.slice(0, taskId),
			updatedTask,
			...tasks.slice(taskId + 1),
		];
		return updatedTaskList;
	};

	// Find Task Index by comparing the DateCreated value
	// DateCreated is a Date() object which should serve as a unique identifier for each task
	const findTaskIndex = (task) => {
		tasks = getTasks();
		const foundTaskIndex = tasks.findIndex((x) => {
			taskManager.getDateCreated(x).getTime() ===
				taskManager.getDateCreated(task).getTime() &&
				taskManager.getTitle(x) === taskManager.getTitle(task)
		});
		return foundTaskIndex;
	};

	const getTaskInfo = (property, task) => {
		let taskId = findTaskIndex(task);
		return tasks[taskId][property];
	};

	return { name, tasks, getTasks, addTask, removeTask, editTask, getTaskInfo };
};

// Get TaskList from a Project from storage and convert it into a project object again
const getProject = (name) => {
	let projectTaskList = localStorage.getTaskList(name);
	return createProject(name, projectTaskList);
};

let test1Project = createProject("test1");
let task1 = createTask("Task1");
let task2 = createTask("Task2");
let task3 = createTask("Task3");
test1Project.addTask(task1);
test1Project.addTask(task2);
test1Project.addTask(task3);
console.log(test1Project);
console.log(test1Project.getTasks());
console.log(test1Project.findTaskIndex(task2));

//localStorage.addProject(test1Project.name, test1Project.getTasks());

export { createProject, getProject };
