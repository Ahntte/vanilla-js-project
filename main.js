/* 
로직순서
1. 유저가 값을 입력한다.
2. 유저가 +버튼을 클릭하면 할일이 추가된다
3. delete버튼을 클릭하면 할일이 삭제된다
4. check버튼을 클릭하면 할일이 종료되며, 텍스트 가운데로 밑줄이 들어간다
 check버튼을 클릭하면 isComplete값이 true로 바뀌고 아이템에 밑줄이들어간다
5. 탭 이동시 언더바가 따라다닌다
6. 전체탭은 전체 아이템 보여주고, 끝냄 탭을 누르면 종료된 아이템만 보여주고, 진행중탭
탭을 누르면 진행중인 아이템만 보여준다
*/
let addButton = document.getElementById("add-button");
let taskInput = document.getElementById("task-input");
let allDeleteButton = document.getElementById("all-delete");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];

taskInput.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    addButton.click();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].style.cursor = "pointer";
  tabs[i].addEventListener("click", (e) => {
    itemFilter(e);
  });
}

addButton.addEventListener("click", addTask);
allDeleteButton.addEventListener("click", allRemoveItem);

function addTask() {
  let task = {
    taskContent: taskInput.value,
    isComplete: false,
    id: randomIDGenerate(),
  };

  for (let i = 0; i < taskInput.value.length; i++) {
    if (i < 2) {
      if (taskInput.value[i] === " ") {
        console.log("의도적으로 띄어쓰기만 입력할수없습니다");
        return;
      }
    }
  }

  if (task.taskContent === "") {
    return alert("할일을 등록해!");
  } else {
    taskList.push(task);
  }

  taskInput.value = "";
  taskInput.focus();
  console.log(task.id);
  render();
}
function render() {
  let list = [];
  //하나의 할일은 곧 하나의 객체로 다루어짐
  //1. 내가 선택한 탭에 따라서
  //2. 리스트의 아이템을 달리 보여준다
  if (mode === "all") {
    list = taskList;
  } else if (mode === "doing") {
    list = filterList;
  } else if (mode === "finish") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += ` 
      <div class="task">
          <div class="task-done fill size" >${list[i].taskContent}</div>
          <div>
          <i class="fa-solid fa-rotate-left" id="check" onclick="toggleComplete('${list[i].id}')"></i>
          <i class="fa-solid fa-trash" onclick="deleteTask('${list[i].id}')"></i>
          </div>
      </div>`;
    } else {
      resultHTML += ` 
      <div class="task">
          <div class="size">${list[i].taskContent}</div>
          <div>
            <i class="fa-solid fa-check" id="check" onclick="toggleComplete('${list[i].id}')"></i>
            <i class="fa-solid fa-trash" id="delete" onclick="deleteTask('${list[i].id}')"></i>
          </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(itemID) {
  for (let i = 0; i < taskList.length; i++) {
    if (itemID === taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(itemID) {
  //filterList에서 삭제가된거지 taskList에서 삭제된게 아님
  //그래서 all탭을 누르면 여전히 taskList에는 삭제한 아이템이 그래도 남아있어서 지웠던 아이템이 다시 살아남
  //탭모드에 따라서 filterList에서 삭제된 아이템은 taskList에서도 삭제가 되어야함
  let deletePick = null;
  if (mode === "all") {
    list = taskList;
    for (let i = 0; i < list.length; i++) {
      if (itemID === list[i].id) {
        list.splice(i, 1);
        console.log(list);
        break;
      }
    }
  } else if (mode === "doing") {
    list = filterList;
    for (let i = 0; i < list.length; i++) {
      if (itemID === list[i].id) {
        deletePick = list[i].id;
        list.splice(i, 1);
        console.log(list);
        break;
      }
    }

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == deletePick) {
        taskList.splice(i, 1);
      }
    }
  } else if (mode === "finish") {
    list = filterList;
    for (let i = 0; i < list.length; i++) {
      if (itemID === list[i].id) {
        deletePick = list[i].id;
        list.splice(i, 1);
        console.log(list);
        break;
      }
    }

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == deletePick) {
        taskList.splice(i, 1);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function allRemoveItem() {
  if (taskList.length == 0) {
    alert("등록된 할일이 없습니다.");
    return;
  }
  filterList.length = 0;
  taskList.length = 0;
  render();
}

function itemFilter(e) {
  mode = e.target.id;
  filterList.length = 0;
  if (mode === "all") {
    render();
    //전체 아이템을 출력한다
  } else if (mode === "doing") {
    //진행중인 아이템을 출력한다
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
        render();
      }
    }
  } else if (mode === "finish") {
    //끝난 아이템을 출력한다
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
        render();
      }
    }
  }
}
