import { taskManager, createTask } from './task';
import * as localStorage from './localStorage';

// Project factory
const createProject = (name, taskList) => {
	let tasks = [];

	// Create Project with existing tasklist (used when retrieving from localStorage)
	if (Array.isArray(taskList)){
		tasks = taskList;
	}

	const getTasks = () => tasks;

	const addTask = (task) => {
		tasks.push(task);
	};

	// Remove task and return updated taskList
	const removeTask = (task) => {
		let taskId = findTaskIndex(task);
		tasks.splice(taskId, 1);
		return tasks;
	};

	const editTask = (task, property, newValue) => {
		let taskId = findTaskIndex(task);
		// //Change task attribute according to property using the delegation function taskAction()
		const updatedTask = taskAction(task, property, newValue);
		// // make final array of objects by combining updated object.
		tasks = [
			...tasks.slice(0, taskId),
			updatedTask,
			...tasks.slice(taskId + 1),
		];
		return tasks;
	};

	// Main function to delegate task operations to respective getters and setters
	// Delegates from editTask() and getTaskInfo() to the Task Module TaskManager
	const taskAction = (task, property, value) => {
		if (value === undefined) {
			switch (property) {
				case 'title':
					return taskManager.getTitle(task);
				case 'dateCreated':
					return taskManager.getDateCreated(task);
				case 'dateDue':
					return taskManager.getDateDue(task);
				case 'priority':
					return taskManager.getPriority(task);
				case 'note':
					return taskManager.getNote(task);
				default:
					console.error(
						'Error accessing Getter for task - Property Name not valid'
					);
					break;
			}
		} else {
			switch (property) {
				case 'title':
					taskManager.setTitle(task, value);
					return task;
				case 'dateDue':
					taskManager.setDateDue(task, value);
					return task;
				case 'priority':
					taskManager.setPriority(task, value);
					return task;
				case 'note':
					taskManager.setNote(task, value);
					return task;
				default:
					console.error(
						'Error accessing Setter for task - Property Name not valid'
					);
					break;
			}
		}
	};

	const getTaskObject = (index) => {
		return tasks[index];
	};

	// Find Task Index
	// DateCreated is a Date() object which should serve as a unique identifier for each task
	const findTaskIndex = (task, ...args) => {
		tasks = getTasks();
		// Unique identifiers
		let dateCreated;
		let title;
		if (task === 0) {
			console.log(args);
			title = args[1];
			dateCreated = args[1];
		} else {
			title = taskManager.getTitle(task);
			dateCreated = taskManager.getDateCreated(task).getTime();
		}
		// compare both DateCreated and Name to get a unique identifier
		const foundTaskIndex = tasks.findIndex(
			(x) =>
				taskManager.getDateCreated(x).getTime() === dateCreated &&
				taskManager.getTitle(x) === title
		);
		return foundTaskIndex;
	};

	const getTaskInfo = (task, property) => {
		let taskId = findTaskIndex(task);
		return taskAction(task, property);
	};

	const update = () => {
		localStorage.addProject(name, tasks);
	};

	return {
		name,
		tasks,
		getTasks,
		addTask,
		removeTask,
		editTask,
		getTaskInfo,
		update,
	};
};

// Get TaskList from a Project from storage and convert it into a project object again
const getProject = (name) => {
	let projectTaskList = localStorage.getTaskList(name);
	console.log("getproject");
	console.log(projectTaskList);
	return createProject(name, projectTaskList);
};

// let test1Project = createProject("test1");
// let task1 = createTask("Task1");
// let task2 = createTask("Task2");
// let task3 = createTask("Task3");
// test1Project.addTask(task1);
// test1Project.addTask(task2);
// test1Project.addTask(task3);
// console.log(test1Project);
// console.log(test1Project.getTaskInfo(task3, "note"));
// console.log(getProject("test1").getTaskInfo(task3, "note"));

export { createProject, getProject };
