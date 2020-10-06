// LocalStorage Operations for storing and getting data

function addProject(name, taskList) {
	window.localStorage.setItem(name, JSON.stringify(taskList));
}

function getTaskList(project) {
	return JSON.parse(window.localStorage.getItem(project));
}

function delProject(project) {
	window.localStorage.removeItem(project);
}

export { addProject, getTaskList, delProject };
