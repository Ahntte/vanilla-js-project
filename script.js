// 할일 앱
/* 
할일 앱의 로직 분석
유저는 할일을 추가할 수 있다.
각 할일에 삭제와 체크버튼이 있다.
삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
모바일 버전에서도 확인할 수 있는 반응형 웹이다

정적값:
All, NotDone, Done (탭메뉴 종류) 
동적값:
일의내용, 체크버튼, 삭제버튼, 리사이클버튼
한 줄의 list가 곧 하나의 객체임
한 줄안에 포함될 데이터 - 문자열,체크버튼,삭제버튼,리사이클버튼

동적생성: 
유저가 추가버튼을 누르면 하나의 객체{}가 생성
그 객체를 담는 컬렉션 배열을 사용 []
객체 안에 담길 아이템은?

하나의 li를 나타내는 정보
{
userMemo(유저가 입력한 값),
checkbutton 하나,
delet버튼 하나
}

동적으로 제어할 스타일
두번째 아이템을 생성할때마다 
border-top을 0세팅
*/

// 할일을 입력받아 생성 버튼을 누르면 리스트에 아이템이 추가

let daliyWork = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let toDoMemo = document.getElementById("to-do-memo"); // <ul>
let listItems = [];
let completItem = [];

addButton.addEventListener("click", add);

function add() {
  //리스트를 추가하는 함수
  let userWorkList = createListItem();
  let addDiv = createDiv();
  console.log(addDiv);
  let currentUserItem = null;
  let currentUserItemInfo = null;
  for (let i = 0; i < userWorkList.length; i++) {
    if (i === 0) {
      currentUserItem = userWorkList[i];
    } else {
      currentUserItemInfo = userWorkList[i];
    }
  }
  console.log(
    "현재유저아이템 :" +
      currentUserItem +
      "현재유저아이템정보 :" +
      currentUserItemInfo
  );
  currentUserItem.appendChild(addDiv);
  toDoMemo.appendChild(currentUserItem);
  listItems.push(currentUserItemInfo);
  let deleteButton = addDiv.querySelector(".fa-trash");
  let checkButton = addDiv.querySelector(".fa-check");

  console.log("체크버튼 호출됨" + checkButton);
  console.log("삭제버튼 호출됨" + deleteButton);
  deleteButton.addEventListener("click", (event) =>
    delet(currentUserItem, currentUserItemInfo, event)
  );
  checkButton.addEventListener("click", (event) =>
    check(currentUserItem, currentUserItemInfo, event)
  );

  updateListBorderTop();
  console.log(listItems);
  console.log("------------------------------------------");
}
function createListInfo() {
  //li에대한 정보를 저장하는 함수
  const li = {
    //li를 나타내는 모든 정보들을 객체{} 안에 담아서 데이터를 일반화시킴
    id: listItems.length + 1,
    text: `${daliyWork.value}`,
    status: "all", //nd: 해야할 일, d: 완료된 일, all: 모두다
  };
  return li;
}
function createListItem() {
  //함수 호출시 새로운 객체(li)가 개별로 빌드됨(지역으로 세팅되었기때문)
  let userLiInfo = createListInfo();
  let dailyItem = document.createElement("li"); // <li>
  dailyItem.textContent = userLiInfo.text;
  dailyItem.setAttribute("data-id", userLiInfo.id);
  dailyItem.setAttribute("data-status", userLiInfo.status);
  if (userLiInfo.id > 1) dailyItem.style.borderTop = 0;
  console.log("리스트 아이디 : " + userLiInfo.id);
  console.log("리스트 상태 : " + userLiInfo.status);
  console.log(dailyItem.textContent);
  console.log(dailyItem);

  return [dailyItem, userLiInfo];
}
function createDiv() {
  const div = {
    class: "my-daily-controll",
  };
  let elementDiv = document.createElement("div");
  elementDiv.setAttribute("class", `${div.class}`);
  const [firstI, secondI] = createEtcTag();
  for (let eleItag of [firstI, secondI]) {
    elementDiv.appendChild(eleItag);
  }
  console.log(elementDiv);
  return elementDiv;
}
function createEtcTag() {
  //나머지 요소에 해당하는 i태그를 생성하는 함수
  let firstElementI = null;
  let secondElementI = null;
  const commonClassName = "fa fa-";
  for (let i = 0; i < 1; i++) {
    firstElementI = document.createElement("i");
    secondElementI = document.createElement("i");
  }
  //i요소의 속성을 동적으로 세팅해주기
  firstElementI.setAttribute("class", `${commonClassName + "check"}`);
  secondElementI.setAttribute("class", `${commonClassName + "trash"}`);

  console.log(firstElementI, secondElementI);
  return [firstElementI, secondElementI];
}
function delet(currentLi, currentLiInfo, event) {
  //아이템을 삭제하는 함수
  //element: 배열에 담긴 리스트 데이터, event: 현재 바인딩된 요소
  let li = currentLi;
  let liInfo = currentLiInfo;
  if (event.currentTarget) {
    console.log("현재 바인딩된 요소입니다");
    li.remove();
    let index = listItems.findIndex((obj) => obj.id === liInfo.id);
    //현재 아이디를 포함하는 배열도 리스트에서 삭제
    if (index != -1) {
      //조건에 충족한 요소가 있으면
      listItems.splice(index, 1);
    }
  }
  updateListBorderTop();
  //리스트의 아이디값을 사용하여 특정 리스트를 갖고와서 그 li를 삭제한다
  console.log("리스트 삭제하는 함수 호출됨");
  console.log(listItems);
  console.log("----------------------------------------");
}

// 첫번째 li 아이템은 반드시 보더 탑이 1이어야함
// 리스트가 추가 삭제 될때마다 보더 탑을 업데이트 해주는 함수

function updateListBorderTop() {
  let liElement = toDoMemo.querySelectorAll("li");
  console.log(liElement);
  liElement.forEach((li, index) => {
    if (index === 0) {
      li.style.borderTop = "1px solid #000";
    } else {
      li.style.borderTop = 0;
    }
  });
}

//체크버튼을 누르면 해당 아이템에 밑줄이 그어지고, 리프레쉬 버튼으로 바뀜
//상태값을 업데이트 그리고 해당 아이템이랑 상태값을 묶어서 배열에 저장

function check(currentLi, currentLiInfo, event) {
  //할일에 체크버튼을 클릭하면 해당 아이템의 텍스트에 밑줄이 그어짐
  console.log("체크함수 호출함");
  let li = currentLi;
  let liInfo = currentLiInfo;
  if (event.currentTarget) {
    console.log("현재 바인딩된 요소입니다");
    li.style.textDecoration = "line-through";
    let transCheck = li.querySelector(".fa-check");
    transCheck.setAttribute("class", "fa fa-refresh");
    liInfo.status = "d"; //완료된 일
    console.log(liInfo.status);
    completItem.push([li, liInfo]);
    console.log(completItem);
    // completItem
    // let index = listItems.findIndex((obj) => obj.id === liInfo.id);
    // //현재 아이디를 포함하는 배열도 리스트에서 삭제
    // if (index != -1) {
    //   //조건에 충족한 요소가 있으면
    //   listItems.splice(index, 1);
    // }
  }
  let refreshButton = addDiv.querySelector(".fa-refresh");
  console.log(refreshButton);
  refreshButton.addEventListener("click", refresh);
}

function refresh() {
  console.log("리프레쉬 함수 호출됨");
}
