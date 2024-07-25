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

addButton.addEventListener("click", add);

function add() {
  //리스트를 추가하는 함수
  let userWorkList = [];
  userWorkList = createListItem();
  let addDiv = createDiv();
  let currentUserListItem = userWorkList[0];

  // console.log("유저의 현재 리스트(객체)" + userWorkList[0]);

  currentUserListItem.appendChild(addDiv);
  // console.log(userWorkList);
  toDoMemo.appendChild(currentUserListItem);
  listItems.push(userWorkList);
  let deletButton = document.getElementsByClassName("fa-trash");
  console.log("삭제버튼 호출됨" + deletButton);
  for (let i = 0; i < deletButton.length; i++) {
    deletButton[i].addEventListener(
      "click",
      (event) => delet(userWorkList, event)
      //화살표함수의 매개변수event로 이벤트객체가 들어가기 때문에 데이터가 담긴 event를 그대로 사용하여
      //호출한 함수의 인자값으로 넣어줘야 호출한 함수가 올바르게 데이터를 받겠지
    );
  }
  console.log(listItems);
  console.log("------------------------------------------");
}
function createListItem() {
  //함수 호출시 새로운 객체li가 개별로 빌드됨(지역으로 세팅되었기때문)
  const li = {
    //li를 나타내는 모든 정보들을 객체{} 안에 담아서 데이터를 일반화시킴
    id: listItems.length + 1,
    text: `${daliyWork.value}`,
    status: "all", //nd: 해야할 일, d: 완료된 일, all: 모두다
  };
  let dailyItem = document.createElement("li"); // <li>
  dailyItem.textContent = li.text;
  if (li.id > 1) dailyItem.style.borderTop = 0;
  console.log("리스트 아이디 : " + li.id);
  console.log("리스트 상태 : " + li.status);
  console.log(dailyItem.textContent);

  return [dailyItem, li.id, li.status];
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
function delet(element, event) {
  //아이템을 삭제하는 함수
  //element: 배열에 담긴 리스트 데이터, event: 현재 바인딩된 요소
  let currentLi = element[0];
  let currentListId = element[1];
  let currentLiStatus = element[2];
  if (event.currentTarget) {
    console.log("현재 바인딩된 요소입니다");
    currentLi.remove();
    //현재 아이디를 포함하는 배열도 리스트에서 삭제
  }
  console.log(element);
  //리스트의 아이디값을 사용하여 특정 리스트를 갖고와서 그 li를 삭제한다
  console.log("리스트 삭제하는 함수 호출됨");
  console.log("----------------------------------------");
}
