import { taskOperations, createTask } from "./task";
import * as localStorage from "./localStorage";

// Project factory
const createProject = (name) => {
	let tasks = [];

	//Get task list from a project
	const getTasks = () => tasks;

	const addTask = (task) => {
		// Add task with the correct ID
		if ((getTasks().length = 0)) {
			// If task list is empty simply add task (because default ID is 0), otherwise calculate ID
			tasks.push(task);
		} else {
			task.setId(calculateTaskId());
			tasks.push(task);
		}
	};

	// Remove task from project
	const removeTask = (task) => {
		let tasks = tasks.filter((elem) => {
			elem.name != task.name && elem.dateCreated != task.dateCreated;
		});
	};

	const calculateTaskId = () => {
		tasks = getTasks();
		return tasks[tasks.length - 1].id;
	};

	const editTask = (newValue, property, task) => {
    tasks = getTasks();
		//find the index of object from array that you want to update
		const foundTaskIndex = tasks.findIndex((x) => {x.id === task.id});
    tasks[objIndex][property] = newValue;
		// // make new object of updated object.
		// const updatedObj = { ...tasks[foundTaskIndex], [property]: newValue };

		// // make final new array of objects by combining updated object.
		// const updatedProjects = [
		// 	...projects.slice(0, objIndex),
		// 	updatedObj,
		// 	...projects.slice(objIndex + 1),
    // ];
    return tasks;
	};

	const getTaskInfo = (value, task) => {
		tasks = getTasks();
	};

	return { name, tasks, getTasks, addTask, removeTask, calculateTaskIndex };
};

// Get TaskList from a Project from storage and convert it into a project object again
const getProject = (name) => {
	let projectTaskList = localStorage.getTaskList(name);
	return createProject(name, projectTaskList);
};

let test1 = createProject("test1");
localStorage.addProject(test1.name, test1.getTasks());

console.log(getProject("test1"));
console.log(getProject("test1").calculateTaskIndex());

export { createProject, getProject };
