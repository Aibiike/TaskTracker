// let task ={
//     id: 'ytre-43453-ytre-5433-gddsfv',
//     desccription: 'Закончить верстку проекта',
//     isOpen: 'Oткрыто',
//     assignedPerson: 'Самарцев Игорь',
//     status: 'Срочно'
// }

let taskList = document.querySelector('.task-list')
let addForm = document.querySelector('.add-form')
let taskDescription = document.querySelector('.task-description')
let taskPriority = document.querySelector('.task-priority')
let taskAssign = document.querySelector('.task-assign')
let taskForm = document.querySelector('.task-form')


addForm.addEventListener('submit',(e)=>{
    changeTasks(e)
})

function getTasks(){
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function changeTasks(e){
    e.preventDefault()
    let tasks = getTasks()
    let newTask = {
        id: +new Date(),
        description: taskDescription.value,
        isOpen: true,
        assignedPerson: taskAssign.value,
        status: taskPriority.value
    }

    localStorage.setItem('tasks',JSON.stringify([...tasks,newTask]))
    taskForm.reset()
    view()
}


//1-ВАРИАНТ ------------------------------------------------------------------------------------------------------------

function view(){
    // let tasks =[{
    //     id: 'ytre-43453-ytre-5433-gddsfv',
    //     desccription: 'Закончить верстку проекта',
    //     isOpen: 'Oткрыто',
    //     assignedPerson: 'Самарцев Игорь',
    //     status: 'Срочно'
    // }]
    let tasks = getTasks()
    taskList.innerHTML = ''
    tasks.forEach(task =>{
        taskList.innerHTML += `<div class="bg-light p-3 mb-3 ">
                    <h6>Номер задачи: ${task.id}</h6>
                    <span class="badge ${task.isOpen ? 'bg-primary' : 'bg-secondary'}">${task.isOpen ? 'Открыта' : 'Закрыта'}</span>
                    <h3 class="my-4">${task.description}</h3>
                    <div class="status"><i class="far fa-clock"></i>
                        <span class="text-danger">${task.status}</span>
                    </div>
                    <div class="assign mb-3"><i class="far fa-user-circle"></i>
                        <span>${task.assignedPerson}</span>
                    </div>
                    <button type="button" class="btn btn-success"><i class="fas fa-check me-1"></i> ${task.isOpen ? 'Закрыть' : 'Открыть'}</button>
                    <button type="button" class="btn btn-danger delete-btn"><i class="fas fa-times me-2"></i>Удалить</button>
                </div>`
    })
    document.querySelectorAll('.delete-btn').forEach((button,buttonidx)=>{
        button.addEventListener('click',()=>{
            let task = getTasks().filter((el,idx)=>{
                return buttonidx!== idx
            })
            localStorage.setItem('tasks',JSON.stringify(task))
            view()
        })
    })
        document.querySelectorAll('.btn-success').forEach((btn, btnIdx) => {
            let tasks = getTasks()
            btn.addEventListener('click', () => {
                tasks.map((task, taskIdx) => {
                    if(taskIdx === btnIdx){
                        task.isOpen = !task.isOpen
                        localStorage.setItem('tasks', JSON.stringify(tasks))
                        view()
                    }
                })
            })
        })
}
//----------------------------------------------------------------------------------------------------------------------



//2-ВАРИАНТ ------------------------------------------------------------------------------------------------------------
// function view() {
//     let tasks = getTasks()
//     taskList.innerHTML = ''
//     tasks.forEach(task => {
//         taskList.innerHTML += `<div class="bg-light p-3 mb-3 ">
//                     <h6>Номер задачи: ${task.id}</h6>
//                     <span class="badge ${task.isOpen ? 'bg-primary' : 'bg-secondary'}">${task.isOpen ? 'Открыта' : 'Закрыта'}</span>
//                     <h3 class="my-4">${task.description}</h3>
//                     <div class="status"><i class="far fa-clock"></i>
//                         <span class="text-danger">${task.status}</span>
//                     </div>
//                     <div class="assign mb-3"><i class="far fa-user-circle"></i>
//                         <span>${task.assignedPerson}</span>
//                     </div>
//                     <button type="button" class="btn btn-success" onclick="closeTask(${task.id})"><i class="fas fa-check me-1"></i> ${task.isOpen ? 'Открыть' : 'Закрыть'} </button>
//                     <button type="button" class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fas fa-times me-2"></i>Удалить</button>
//                 </div>`
//     })
// }
//
// function closeTask(id){
//     let tasks = getTasks()
//     tasks = tasks.map((el)=> el.id === id ? {...el , isOpen : !el.isOpen} : el)
//     localStorage.setItem('tasks',JSON.stringify(tasks))
//     view()
// }
//
// function deleteTask(id){
//     let tasks = getTasks()
//     tasks = tasks.filter(el=> el.id !== id )
//     localStorage.setItem('tasks',JSON.stringify(tasks))
//     view()
// }
//
//
// view()
//----------------------------------------------------------------------------------------------------------------------
