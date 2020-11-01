// Singleton Object for managing task operations (getters/setters)
class taskOperations {
	getTitle(task) {
		return task.title;
	}
	setTitle(task, title) {
		task.title = title;
	}
	getDateCreated(task) {
		return new Date(task.dateCreated); //convert back to date format
	}
	setDateDue(task, dateDue) {
		task.dateDue = dateDue;
	}
	getDateDue(task) {
		return task.dateDue;
	}
	setPriority(task, priority) {
		task.priority = priority;
	}
	getPriority(task) {
		return task.priority;
	}
	setNote(task, note) {
		task.note = note;
	}
	getNote(task) {
		return task.note;
	}
}

// Task factory
const createTask = (title) => {
	const task = {};
	task.title = title;
	task.dateCreated = new Date().toJSON(); // convert to a format that isn't distorted by json stringify
	task.dateDue = '';
	task.priority = false;
	task.note = '';
	task.done = false;
	return task;
};

//Create Singleton
const taskManager = new taskOperations();
Object.freeze(taskManager);

export { taskManager, createTask };
