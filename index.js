"use strict";
(function () {
    const addbtn = document.getElementById("add-task");
    const ToDo = document.getElementById("ToDo");
    const InProgress = document.getElementById("InProgress");
    const Completed = document.getElementById("Completed");
    const TaskCard = document.getElementById('TaskCard');
    const MainBody = document.getElementById("MainBody");
    const Crud = document.getElementById("Crud");
    const Close = document.getElementById("Close");
    const AddTask = document.getElementById("AddTask");
    const Cancle = document.getElementById("Cancle");
    let TaskTitle = document.getElementById("taskTitle");
    let Priority = document.getElementById("Priority");
    let date = document.getElementById("Date");
    let Description = document.getElementById("Description");
    let tasklist = [];
    const savedData = localStorage.getItem("tasklist");
    const updatecard = document.querySelectorAll(".update");
    let currentindex;
    const todocounter = document.getElementById('todocounter');
    const progresscounter = document.getElementById('progresscounter');
    const completedcounter = document.getElementById('completedcounter');
    let todocount = 0;
    let progresscount = 0;
    let competedcount = 0;
    window.displaytaskmadewhen = function (index) {
        if (Math.floor((Date.now() - tasklist[index].createdwhen) / 1000 / 60) < 1) {
            return "Just Now";
        }
        else if (Math.floor((Date.now() - tasklist[index].createdwhen) / 1000 / 60) < 60) {
            return "Few menutes ago";
        }
        else if (Math.floor((Date.now() - tasklist[index].createdwhen) / 1000 / 60 / 60) <
            24) {
            return "Today";
        }
        else {
            return `${Math.floor((Date.now() - tasklist[index].createdwhen) / 1000 / 60 / 60 / 24)} day/days ago`;
        }
    };
    if (savedData !== null) {
        tasklist = JSON.parse(savedData);
        displaytasks();
    }
    addbtn.addEventListener("click", function () {
        MainBody.classList.toggle("hidden");
        Crud.classList.toggle("hidden");
    });
    Close.addEventListener("click", function () {
        MainBody.classList.toggle("hidden");
        Crud.classList.toggle("hidden");
    });
    Cancle.addEventListener("click", function () {
        MainBody.classList.toggle("hidden");
        Crud.classList.toggle("hidden");
    });
    AddTask.addEventListener("click", function create_updatetask() {
        MainBody.classList.toggle("hidden");
        Crud.classList.toggle("hidden");
        if (TaskTitle.value.trim() === "") {
            alert("Plsease Enter a Title");
            return;
        }
        if (date.value === "") {
            alert("Please Enter a Due Date");
            return;
        }
        let selectedDate = new Date(date.value);
        selectedDate.setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            alert("You Cant pick a date in the past");
            return;
        }
        let task = {
            TaskTitle: TaskTitle.value,
            Priority: Priority.value,
            date: date.value,
            Description: Description.value,
            todo: true,
            onprogress: false,
            finished: false,
            createdwhen: Date.now(),
        };
        if ((addbtn.innerText = "Update Task")) {
            tasklist.splice(currentindex, 1, task);
            console.log(tasklist[currentindex]);
        }
        else {
            tasklist.push(task);
        }
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        displaytasks();
    });
    window.editTask = function (index) {
        currentindex = index;
        MainBody.classList.add("hidden");
        Crud.classList.remove("hidden");
        TaskTitle.value = tasklist[index].TaskTitle;
        Priority.value = tasklist[index].Priority;
        date.value = tasklist[index].date;
        Description.value = tasklist[index].Description;
        addbtn.innerText = "Update Task";
    };
    function displaytasks() {
        ToDo.innerHTML = '';
        InProgress.innerHTML = '';
        Completed.innerHTML = "";
        todocount = 0;
        progresscount = 0;
        competedcount = 0;
        for (let i = 0; i < tasklist.length; i++) {
            if (tasklist[i].todo === true) {
                todocount++;
                todocounter.innerText = `${todocount} task/s`;
            }
            else if (tasklist[i].onprogress === true) {
                progresscount++;
            }
            else if (tasklist[i].finished === true) {
                competedcount++;
            }
            todocounter.innerText = `${todocount} task/s`;
            progresscounter.innerText = `${progresscount} task/s`;
            completedcounter.innerText = `${competedcount} task/s`;
        }
        for (let i = 0; i < tasklist.length; i++) {
            if (tasklist[i].todo === true) {
                ToDo.innerHTML += `
            <div id="TaskCard" class="w-full min-h-62 bg-white rounded-lg p-5 flex flex-col justify-between shadow-lg">
                        <div class="flex justify-between items-center">
                            <div class="flex flex-row items-center gap-2">
                                <div class="w-1.5 h-1.5 rounded-lg bg-[#90a1b9]"></div>
                                <p class="text-xs text-[#90a1b9]">#${i + 1}</p>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <button onclick="editTask(${i})"
                                    class="update hover:bg-[#EEF2FF] rounded-sm w-5.5 h-5.5 flex justify-center items-center transition duration-300"><i
                                        class="fa-solid fa-pen text-xs " style="color: #90a1b9;"></i>
                                </button>
                                <button onclick="deletetask(${i})"
                                    class="deletbtn hover:bg-[#EEF2FF] rounded-sm w-5.5 h-5.5 flex justify-center items-center transition duration-300"><i
                                        class="fa-solid fa-trash text-xs " style="color: #90a1b9;"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2.5 border-b border-b-gray-200 pb-3">
                            <p class="text-[#1d293d] text-lg font-bold">${tasklist[i].TaskTitle}</p>
                            <p class="text-[#62748e] text-md font-light">${tasklist[i].Description}</p>
                            <div>
                            ${tasklist[i].Priority == "High"
                    ? `
                                                                <span
                                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-red-700"></div> High Priority
                                </span>
                                `
                    : ``}

                                ${tasklist[i].Priority == "Medium"
                    ? `
                                                                    <span
                                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-green-700"></div>Medium Priority
                                </span>
                                    `
                    : ``}

                                ${tasklist[i].Priority == "Low"
                    ? `
                                                                    <span
                                    class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-[#FE9A00]"></div>Low Priority
                                </span>
                                    `
                    : ``}

                            </div>
                            <div class="flex flex-row items-center gap-4">
                                <p class="text-xs text-[#90a1b9]"><i class="fa-regular fa-calendar text-xs "
                                        style="color: #90a1b9;"></i>
                                    ${tasklist[i].date}</p>
                                <p class="text-xs text-[#90a1b9]"><i class="fa-regular fa-clock text-xs " style="color: #90a1b9;"></i>
                                    ${window.displaytaskmadewhen(i)}</p>
                            </div>
                        </div>
                
                        <div class="flex justify-start items-center gap-2 w-full">
                            <button onclick="startprogress(${i})"
                                class="w-30 h-8 rounded-md bg-[#FEF3C6] hover:bg-[#FEE685] cursor-pointer text-xs font-medium text-[#b55200]">
                                <i class="fa-solid fa-play" style="color: #b55200;"></i> Start</button>
                            <button onclick="completeprogress(${i})"
                                class="w-30 h-8 bg-[#D0FAE5] hover:bg-emerald-200 rounded-md cursor-pointer text-xs font-medium text-[#007a55]"><i
                                    class="fa-solid fa-check" style="color: #007a55;"></i> Complete</button>
                        </div>
                
                    </div>
            `;
            }
            else if (tasklist[i].onprogress === true) {
                InProgress.innerHTML += `
            <div id="TaskCard" class="w-full min-h-62 bg-white rounded-lg p-5 flex flex-col justify-between shadow-lg">
                        <div class="flex justify-between items-center">
                            <div class="flex flex-row items-center gap-2">
                                <div class="w-1.5 h-1.5 rounded-lg bg-[#90a1b9]"></div>
                                <p class="text-xs text-[#90a1b9]">#${i + 1}</p>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <button
                                    class=" update hover:bg-[#EEF2FF] rounded-sm w-5.5 h-5.5 flex justify-center items-center transition duration-300"><i
                                        class="fa-solid fa-pen text-xs " style="color: #90a1b9;"></i>
                                </button>
                                <button onclick="deletetask(${i})"
                                    class="deletbtn hover:bg-[#EEF2FF] rounded-sm w-5.5 h-5.5 flex justify-center items-center transition duration-300"><i
                                        class="fa-solid fa-trash text-xs " style="color: #90a1b9;"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2.5 border-b border-b-gray-200 pb-3">
                            <p class="text-[#1d293d] text-lg font-bold">${tasklist[i].TaskTitle}</p>
                            <p class="text-[#62748e] text-md font-light">${tasklist[i].Description}</p>
                            <div>
                                ${tasklist[i].Priority == "High"
                    ? `
                                                                <span
                                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-red-700"></div> High Priority
                                </span>
                                `
                    : ``}

                                ${tasklist[i].Priority == "Medium"
                    ? `
                                                                    <span
                                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-green-700"></div>Medium Priority
                                </span>
                                    `
                    : ``}

                                ${tasklist[i].Priority == "Low"
                    ? `
                                                                    <span
                                    class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-[#FE9A00]"></div>Low Priority
                                </span>
                                    `
                    : ``}
                            </div>
                            <div class="flex flex-row items-center gap-4">
                                <p class="text-xs text-[#90a1b9]"><i class="fa-regular fa-calendar text-xs "
                                        style="color: #90a1b9;"></i>
                                    ${tasklist[i].date}</p>
                                <p class="text-xs text-[#90a1b9]"><i class="fa-regular fa-clock text-xs " style="color: #90a1b9;"></i>
                                    ${window.displaytaskmadewhen(i)}</p>
                            </div>
                        </div>
                
                        <div class="flex justify-start items-center gap-2 w-full">
                            <button onclick="redoprogress(${i})"
                                class="w-30 h-8 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-md cursor-pointer text-xs font-medium text-[#45556C]"><i
                                    class="fa-solid fa-arrow-rotate-left pointer-events-none" style="color: #45556C;"></i> Re do</button>
                            <button onclick="completeprogress(${i})"
                                class="w-30 h-8 bg-[#D0FAE5] hover:bg-emerald-200 rounded-md cursor-pointer text-xs font-medium text-[#007a55]"><i
                                    class="fa-solid fa-check" style="color: #007a55;"></i> Complete</button>
                        </div>
                
                    </div>
            `;
            }
            else if (tasklist[i].finished === true) {
                Completed.innerHTML += `
            <div id="TaskCard" class="w-full min-h-62 bg-white rounded-lg p-5 flex flex-col justify-between shadow-lg">
                        <div class="flex justify-between items-center">
                            <div class="flex flex-row items-center gap-2">
                                <div class="w-1.5 h-1.5 rounded-lg bg-[#90a1b9]"></div>
                                <p class="text-xs text-[#90a1b9]">#${i + 1}</p>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <button
                                    class="update hover:bg-[#EEF2FF] rounded-sm w-5.5 h-5.5 flex justify-center items-center transition duration-300"><i
                                        class="fa-solid fa-pen text-xs " style="color: #90a1b9;"></i>
                                </button>
                                <button onclick="deletetask(${i})"
                                    class=" deletbtn hover:bg-[#EEF2FF] rounded-sm w-5.5 h-5.5 flex justify-center items-center transition duration-300"><i
                                        class="fa-solid fa-trash text-xs " style="color: #90a1b9;"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2.5 border-b border-b-gray-200 pb-3">
                            <p class="text-[#1d293d] text-lg font-bold">${tasklist[i].TaskTitle}</p>
                            <p class="text-[#62748e] text-md font-light">${tasklist[i].Description}</p>
                            <div>
                                ${tasklist[i].Priority == "High"
                    ? `
                                                                <span
                                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-red-700"></div> High Priority
                                </span>
                                `
                    : ``}

                                ${tasklist[i].Priority == "Medium"
                    ? `
                                                                    <span
                                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-green-700"></div>Medium Priority
                                </span>
                                    `
                    : ``}

                                ${tasklist[i].Priority == "Low"
                    ? `
                                                                    <span
                                    class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 gap-2">
                                    <div class="w-1.5 h-1.5 rounded-lg bg-[#FE9A00]"></div>Low Priority
                                </span>
                                    `
                    : ``}
                            </div>
                            <div class="flex flex-row items-center gap-4">
                                <p class="text-xs text-[#90a1b9]"><i class="fa-regular fa-calendar text-xs "
                                        style="color: #90a1b9;"></i>
                                    ${tasklist[i].date}</p>
                                <p class="text-xs text-[#90a1b9]"><i class="fa-regular fa-clock text-xs " style="color: #90a1b9;"></i>
                                    ${window.displaytaskmadewhen(i)}</p>
                            </div>
                        </div>
                
                        <div class="flex justify-start items-center gap-2 w-full">
                            <button onclick="startprogress(${i})"
                                class="w-30 h-8 rounded-md bg-[#FEF3C6] hover:bg-[#FEE685] cursor-pointer text-xs font-medium text-[#b55200]">
                                <i class="fa-solid fa-play" style="color: #b55200;"></i> Start</button>
                            <button onclick="redoprogress(${i})"
                                class="w-30 h-8 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-md cursor-pointer text-xs font-medium text-[#45556C]"><i
                                    class="fa-solid fa-arrow-rotate-left pointer-events-none" style="color: #45556C;"></i> Re do</button>
                        </div>
                
                    </div>
            `;
            }
        }
        clearform();
    }
    displaytasks();
    window.deletetask = function (index) {
        tasklist.splice(index, 1);
        console.log("delete", tasklist);
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        displaytasks();
    };
    function clearform() {
        TaskTitle.value = ``;
        Priority.value = `Chose a Priority`;
        date.value = ``;
        Description.value = ``;
    }
    window.startprogress = function (index) {
        tasklist[index].todo = false;
        tasklist[index].onprogress = true;
        tasklist[index].finished = false;
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        displaytasks();
    };
    window.completeprogress = function (index) {
        tasklist[index].todo = false;
        tasklist[index].onprogress = false;
        tasklist[index].finished = true;
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        displaytasks();
    };
    window.redoprogress = function (index) {
        tasklist[index].todo = true;
        tasklist[index].onprogress = false;
        tasklist[index].finished = false;
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        displaytasks();
    };
    setInterval(displaytasks, 60000);
})();
