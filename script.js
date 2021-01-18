class TaskList {
    constructor() {
        // set element in property
        this.inputTask = document.querySelector("#task_input");
        this.unorderList = document.querySelector("#task_parent ul");
        this.searchIcon = document.querySelector(".search-icon");
        this.searchInput = document.querySelector("#search_box input");
        this.closeSearchIcon = document.querySelector("#search_box svg");
        this.removeAllTask = document.querySelector(".removeAllTask");
        this.emptyMSG = document.querySelector(".task-empty");
        // set event action
        this.inputTask.focus();
        this.inputTask.addEventListener("keyup", (e) => {
            let inputVal = e.target.value;
            if (e.keyCode === 13 && inputVal.trim() !== "") {
                //   call method create task item
                this.unorderList.append(this.render(inputVal));
                // call method add task to localStorage
                this.addTaskToLocalStorage(inputVal);
                // reset and focus input task
                this.inputTask.value = "";
                this.inputTask.focus();
                // show removeAllTask and searchIcon button
                this.removeAllTask.classList.remove("tr-0");
                this.emptyMSG.classList.add("hide");
                this.searchIcon.classList.remove("tr-0");
            }
        });
        this.searchIcon.addEventListener("click", this.showSearchBox);
        this.searchInput.addEventListener("keyup", this.searchTask);
        this.closeSearchIcon.addEventListener("click", this.closeSearch);
        this.removeAllTask.addEventListener("click", this.deleteAllTasks);
        this.loadPreviousTasks();
        this.checkEmpty();		
    }
    render(value) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        li.innerText = value;
        li.classList.add("o0");
        setTimeout(() => {
            li.classList.remove("o0");
        }, 10);
        btn.innerHTML = "&times;";
        // call remove task in HTML and remove form localStorage methods
        btn.addEventListener("click", this.removeTask);
        btn.addEventListener("click", this.removeTaskFromLocalStorage);
        // btn.addEventListener("click", this.checkEmptyTask);
        li.append(btn);
        return li;
    }
    removeTask = e => {
        const currentTask = e.target.parentElement;
        currentTask.classList.add("o0");
        setTimeout(() => {
            currentTask.remove();
            this.checkEmpty();
        }, 350);
    }
    deleteAllTasks() {
        const tasks = document.querySelectorAll("#task_parent ul li");
        const emptyMSG = document.querySelector(".task-empty");
        const si = document.querySelector(".search-icon");
        tasks.forEach((a) => {
            a.classList.add("o0");
            setTimeout(() => {
                a.remove();
                emptyMSG.classList.remove("hide");
                this.classList.add("tr-0");
                si.classList.add("tr-0");
            }, 200);
        });
        // alse remove all task in localStorage
        localStorage.removeItem('task');
    }
    showSearchBox() {
        const sb = document.querySelector("#search_box");
        const si = document.querySelector("#search_box input");
        this.classList.add("o0");
        sb.classList.remove("hide");
        setTimeout(() => {
            this.classList.add("hide");
            sb.classList.remove("o0");
            si.focus();
        }, 200);
    }
    searchTask(e) {
        const Tasks = Array.from(document.querySelectorAll("#task_parent ul li"));
        Tasks.forEach((a) => a.classList.remove("hide"));
        const value = e.target.value;
        if (value.trim() !== "")
            Tasks.forEach((a) => {
                const resultSearch = a.innerText.indexOf(value);
                if (resultSearch === -1 || resultSearch !== 0) a.classList.add("hide");
            });
    }
    checkEmpty() {
        const removeAllTask = document.querySelector(".removeAllTask");
        const si = document.querySelector(".search-icon");
        const emptyMSG = document.querySelector(".task-empty");
        const countList = document.querySelectorAll("#task_parent ul li").length;
        if (countList === 0) {
            removeAllTask.classList.add("tr-0");
            emptyMSG.classList.remove("hide");
            si.classList.add("tr-0");
        }
        else if (countList > 0) {
            removeAllTask.classList.remove("tr-0");
            emptyMSG.classList.add("hide");
            si.classList.remove("tr-0");
        }
    }
    closeSearch() {
        const sb = document.querySelector("#search_box");
        const si = document.querySelector("#search_box input");
        const sc = document.querySelector(".search-icon");
        const task = document.querySelectorAll("#task_parent ul li");
        sb.classList.add("o0");
        si.value = "";
        sc.classList.remove("hide");
        task.forEach((a) => a.classList.remove("hide"));
        setTimeout(() => {
            sb.classList.add("hide");
            sc.classList.remove("o0");
        }, 200);
    }
    //   localStorage methods
    getTaskLocalStorage() {
        const getLsValue = localStorage.getItem("task");
        return getLsValue == null ? [] : JSON.parse(getLsValue);
    }
    addTaskToLocalStorage(itemValue) {
        //   get localStorage value and add new task to that
        const newTask = this.getTaskLocalStorage();
        newTask.push(itemValue);
        // convert new Task and add to localstorage
        localStorage.setItem("task", JSON.stringify(newTask));
    }
    removeTaskFromLocalStorage = e => {
        // get parent this removeBtn clicked and remove X from textContent
        let taskValue = e.target.parentElement.textContent;
        taskValue = taskValue.substr(taskValue, taskValue.length - 1);
        // get localStorage items without remove item clicked
        const newTask = this.getTaskLocalStorage()
            .filter(items => items != taskValue);
        console.log(newTask);
        //set locslStorage item with newTask
        localStorage.setItem('task', JSON.stringify(newTask));
    }
    loadPreviousTasks() {
        this.getTaskLocalStorage().forEach(item => {
            // call create item task method and append the unorderList
            this.unorderList.append(this.render(item));
        })
    }
}
new TaskList();
