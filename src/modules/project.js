import { taskManager, createTask } from "./task";
import * as localStorage from "./localStorage";

// Project factory
const createProject = (name) => {
	let tasks = [];

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
				case "title":
					return taskManager.getTitle(task);
				case "dateCreated":
					return taskManager.getDateCreated(task);
				case "dateDue":
					return taskManager.getDateDue(task);
				case "priority":
					return taskManager.getPriority(task);
				case "note":
					return taskManager.getNote(task);
				default:
					console.error(
						"Error accessing Getter for task - Property Name not valid"
					);
					break;
			}
		} else {
			switch (property) {
				case "title":
					taskManager.setTitle(task, value);
					return task;
				case "dateDue":
					taskManager.setDateDue(task, value);
					return task;
				case "priority":
					taskManager.setPriority(task, value);
					return task;
				case "note":
					taskManager.setNote(task, value);
					return task;
				default:
					console.error(
						"Error accessing Setter for task - Property Name not valid"
					);
					break;
			}
		}
	};

	// Find Task Index
	// DateCreated is a Date() object which should serve as a unique identifier for each task
	const findTaskIndex = (task) => {
		tasks = getTasks();
		// compare both DateCreated and Name to get a unique identifier
		const foundTaskIndex = tasks.findIndex(
			(x) =>
				taskManager.getDateCreated(x).getTime() ===
					taskManager.getDateCreated(task).getTime() &&
				taskManager.getTitle(x) === taskManager.getTitle(task)
		);
		return foundTaskIndex;
	};

	const getTaskInfo = (task, property) => {
		let taskId = findTaskIndex(task);
		return taskAction(task, property);
	};

	return {
		name,
		tasks,
		getTasks,
		addTask,
		removeTask,
		editTask,
		getTaskInfo,
	};
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
console.log(test1Project.editTask(task3, "note", "testntttte"));

export { createProject, getProject };
