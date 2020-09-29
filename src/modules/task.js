let taskList = [];

const taskOperations = {
	getTitle() {
		return this.title;
	},
	setTitle(title) {
		this.title = title;
	},
	getDateCreated() {
		return this.dateCreated;
	},
	setDateDue(dateDue) {
		this.dateDue = dateDue;
	},
	getDateDue() {
		return this.dateDue;
	},
	setPriority(priority) {
		this.priority = priority;
	},
	getPriority() {
		return this.priority;
	},
};

// Task factory
const createTask = (title) => {
    let task = Object.create(taskOperations);
    task.title= title;
    task.dateCreated= new Date();
    task.dateDue= "";
    task.priority= false;
    task.note= "";
    task.done= false;
    task.projectID= 0;
	return task
};

task1 = createTask("task1Title");
taskList.push(task1);
task2 = createTask("task22222Title");
taskList.push(task2);


// task1 = createTask("task1Title");
// console.log(task1);
// task1.setDateDue("222222");
// console.log(task1);

// for (let key in task1) {
//   console.log(key, task1[key]);
// }

export { taskOperations, createTask }