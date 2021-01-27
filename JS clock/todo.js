const toDoform = document.querySelector(".js-toDoForm"),
    toDoinput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


    const TODOS_LS = 'toDos';

    function filterFn(toDo){

    }

    
    let toDos = [];

    function deleteToDo(event){
        const btn = event.target;
        const li = btn.parentNode;
        toDoList.removeChild(li);

        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });

        toDos = cleanToDos;
        saveToDos();
    }

    function saveToDos(){
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    }

    function paintToDo(text){
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        const span = document.createElement("span");
        const newID = toDos.length + 1;

        delBtn.innerText = "❌";        
        span.innerText = text;
        delBtn.addEventListener("click", deleteToDo);

        li.appendChild(delBtn);
        li.appendChild(span);
        li.id = newID;
        
        toDoList.appendChild(li);

        const toDoObj = {
            text: text,
            id: newID
        };

        toDos.push(toDoObj);
        saveToDos(toDoObj);
    }


    function handleSubmit(event){
        event.preventDefault();
        const currentValue = toDoinput.value;
        paintToDo(currentValue);
        saveName(currentValue);
        toDoinput.value = "";
    }

    function loadtoDos(){
        const loadedToDos = localStorage.getItem(TODOS_LS);
        if(loadedToDos !== null){
            const parsedToDos = JSON.parse(loadedToDos);
            parsedToDos.forEach(function(toDo){
                paintToDo(toDo.text);
            })
        }
    }



    function init(){
        loadtoDos();
        toDoform.addEventListener("submit", handleSubmit);
    }

    init();