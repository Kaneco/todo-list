let taskList = [];

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
};

// Task factory
const createTask = (title) => {
	const task = {};
    task.title = title;
    task.dateCreated= new Date().toJSON(); // convert to a format that isn't distorted by json stringify
    task.dateDue= "";
    task.priority= false;
	task.note = "";
	task.done = false;
	return task
};

const taskManager = new taskOperations();
Object.freeze(taskManager);


// task1 = createTask("task1Title");
// console.log(task1);
// task1.setDateDue("222222");
// console.log(task1);

// for (let key in task1) {
//   console.log(key, task1[key]);
// }

export { taskManager, createTask };