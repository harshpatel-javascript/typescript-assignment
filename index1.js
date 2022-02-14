//selecting various elements
const btns = document.querySelectorAll(".btn");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const screen = document.querySelector(".calc-screen");
const backspace = document.querySelector("#backspace");
const del = document.querySelector("#clear");
const deg = document.querySelector("#deg");
const functionButton = document.querySelector(".function-btn");
const trigoButton = document.querySelector(".trigonometry-function");
const second = document.querySelector("#second");

//initialization of screen value
screen.innerHTML= "";
let degreeFlag = false;
let memory = [],i = 0;

function eventList(e){
  let ch = e.target.id;
  switch(ch){
    case "equal":
      if(screen.innerHTML.includes("^")){
        screen.innerHTML = nthroot(screen.innerHTML);
      } 
      else{
        screen.innerHTML = evaluate(screen.innerHTML);
      }
      break;
    case "sin":
      if (degreeFlag) {
        screen.innerHTML= Math.sin((screen.innerHTML* Math.PI) / 180).toPrecision(2);
      } else {
        screen.innerHTML= Math.sin(screen.innerHTML).toPrecision(10);
      }
      break;
    case "cos":
      if (degreeFlag) {
        screen.innerHTML= Math.cos((screen.innerHTML* Math.PI) / 180).toPrecision(2);
      } else {
        screen.innerHTML= Math.cos(screen.innerHTML).toPrecision(10);
      }
      break;
    case "tan":
      if (degreeFlag) {
        screen.innerHTML= Math.tan((screen.innerHTML* Math.PI) / 180).toPrecision(2);
      } else {
        screen.innerHTML= Math.tan(screen.innerHTML).toPrecision(10);
      }
      break;
    case "round":
      screen.innerHTML= Math.round(screen.innerHTML);
      break;
    case "floor":
      screen.innerHTML= Math.floor(screen.innerHTML);
      break;
    case "ceil":
      screen.innerHTML= Math.ceil(screen.innerHTML);
      break;  
    case "f-e":
      screen.innerHTML= Math.pow(10,screen.innerHTML);
      break;
    case "backspace":
      screen.innerHTML = backSpace(screen.innerHTML);
      break;
    case "clear":
      //delete operator
      screen.innerHTML= "";
      break;
    case "pi":
      if(screen.innerHTML === ""){
        screen.innerHTML = 3.14;
      }
      else{
        screen.innerHTML*= 3.14; 
      }
      break;
    case "positive-negitive":
      if(screen.innerHTML === ""){
        alert("Please enter the number");
      }
      else{
      screen.innerHTML= signChange(screen.innerHTML);
      }
      break;
    case "exponential":
      if(screen.innerHTML=== ""){
        screen.innerHTML = 2.718;
        console.log(screen.innerHTML);
      }
      else{
        screen.innerHTML *= 2.718;
      } //not always they will need as multiplication
      break;
    case "power2":
      screen.innerHTML= Math.pow(screen.innerHTML,2);
      break;
    case "denom":
      screen.innerHTML= 1 / screen.innerHTML;
      break;
    case "absolute":
      screen.innerHTML= Math.abs(screen.innerHTML);
      break;
    case "expo":
      screen.innerHTML= Math.exp(screen.innerHTML);
      break;
    case "mod":
      screen.innerHTML= Math.abs(screen.innerHTML);
      break;
    case "root":
      screen.innerHTML= Math.sqrt(screen.innerHTML);
      break;
    case "open-parenthesis":
      screen.innerHTML+= "(";
      break;
    case "close-parenthesis":
      screen.innerHTML+= ")";
      break;
    case "power":
      screen.innerHTML+= "^";
      break;
    case "base10":
      screen.innerHTML = Math.pow(10,screen.innerHTML);
      break;
    case "log":
      if(screen.innerHTML === ""){
        alert("Please enter the number.");
      }
      else{
        screen.innerHTML= Math.log(screen.innerHTML);
      }
      break;
    case "ln":
      if(screen.innerHTML === ""){
        alert("Please enter the number.");
      }else {
        screen.innerHTML= Math.log10(screen.innerHTML);
      }
      break;
    case "factorial":
      screen.innerHTML= factorialFunc(screen.innerHTML);
      break;
    case "memory-clear":
      memoryClear();
      break;
    case "memory-plus":
      memoryPlus(screen.innerHTML);
      break;
    case "memory-minus":
      memoryMinus();
      break;
    case "memory-stored":
      screen.innerHTML= memoryStored();
      break;
    case "memory-recall":
      screen.innerHTML = memoryRecall();
      break;
    case "power3":
      if(screen.innerHTML.includes("-")){
        screen.innerHTML = (-1) * Math.pow((-1) * screen.innerHTML ,3);
      }
      else{
        screen.innerHTML = Math.pow(screen.innerHTML ,3);
      }
      break;
    case "qube-root": 
      if(screen.innerHTML.includes("-")){
        screen.innerHTML = (-1) * Math.pow((-1) * screen.innerHTML , 1/3);
      }
      else{
        screen.innerHTML = Math.pow(screen.innerHTML , 1/3);
      }
      break;
    case "x-root-y":
      screen.innerHTML += "^";
      break;
    case "base2":
      screen.innerHTML = Math.pow(2,screen.innerHTML);
      break;
    case "log2":
      screen.innerHTML = Math.log2(screen.innerHTML);
      break;
    case "base-e":
      screen.innerHTML = Math.pow(Math.E, screen.innerHTML);
      break;
  }
}
function backSpace(value){
  return value.substr(0, value.length-1);
}
//root function
function nthroot(num){
  let a,b;
  a = num.slice(0,num.indexOf("^"));
  b = num.slice(num.indexOf("^") + 1);
  return Math.pow(a,b);
}
//deg and rad function
deg.addEventListener("click", function(){
  if(!deg.classList.contains("show")) {
    deg.classList.add("show");
    deg.classList.add("color");
    deg.innerHTML = "RAD";
    degreeFlag = false;
  }
  else {
    deg.classList.remove("show");
    deg.classList.remove("color");
    deg.innerHTML = "DEG";
    degreeFlag = true;
  }
})
//memory functions
function memoryPlus(num){
  if(memory.length === 0) {
    memory.push(num);
    console.log(memory);
    screen.innerHTML = "";
  }
  else {
    memory.push(num);
    let memory1 = memory.reduce((acc,index) => 
      (+acc) + (+index)
    ,0);
    memory.pop();
    memory.push(memory1.toString());
    screen.innerHTML= "";
    console.log(memory);
    return memory1;
  }
}
function memoryMinus(){
  if(memory.length === 0) {
    alert("Nothing is in the memeory");
  }
  else {
    memory.pop();
  }
  return memory;
}
function memoryStored(){
  if(memory.length === 0 ) {
    alert("nothing is stored");
  }
  else {
    screen.innerHTML= memory[i];
    i++;
    if(i === memory.length){
      i = 0;
    }
  }
  return memory;
}
function memoryClear(){
  for(let i = 0 ; i <= memory.length ; i++){
    memory.pop();
  }
  console.log( memory);
  return memory;
}
function memoryRecall(){
  return memory.pop().toString();
}
//taking btn click events for all the buttons
btns.forEach(btn => {
  btn.addEventListener("click", eventList);
})
//power function
function power(num){
  let a,b;
  a = num.slice(0,num.indexOf("^"));
  b = num.slice(num.indexOf("^") + 1);
  return Math.pow(a,b);
}
//factorial function
function factorialFunc(n){
  for(let i = 1 ; i <= n ; i++){
    if(n === 1 || n === 0){
      return 1;
    }
    else{
      return n * factorialFunc(n-1);
    }
  }
}
//adding to the screen
number.forEach((number) => {
  number.addEventListener("click", function () {
    screen.innerHTML+= number.innerHTML;
  });
});
//operator adding to the screen
operator.forEach((operator) => {
  operator.addEventListener("click", function () {
    screen.innerHTML+= operator.innerHTML;
  });
});
//dropdown menu toggling functions 
function toggle(e){
  if(!e.target.nextElementSibling.classList.contains("show")){
    e.target.nextElementSibling.classList.add("show");
  }
  else{
    e.target.nextElementSibling.classList.remove("show");
  }
}
trigoButton.addEventListener("click", toggle);
functionButton.addEventListener("click", toggle);

//positive-negative sign change
function signChange(num){
  num = (-1) * num;
  return num;
}
// 2nd button 
second.addEventListener("click", function(){
  if(!second.classList.contains("color")){
    second.classList.add("color");
  }
  else{
    second.classList.remove("color");
  }
  let rowSwitch = document.querySelectorAll(".switch");
  for(let i = 0 ; i<rowSwitch.length;i++){
    let firstChild = rowSwitch[i].firstElementChild;
    let secondChild = firstChild.nextElementSibling;
    if(secondChild.classList.contains("hide")){
      secondChild.classList.remove("hide");
      firstChild.classList.add("hide");
    }
    else{
      firstChild.classList.remove("hide");
      secondChild.classList.add("hide");
    }
  }
})
//equal operator
function evaluate(str){
  function splitString(str) {
    let index = 0;
    let splitArray = str.split("").reduce((arr, operand, i) => {
      if (isNaN(parseInt(operand))) {
        arr.push(str.slice(index, i));
        arr.push(operand);
        index = i + 1;
      }
      return arr;
    }, []);
    splitArray.push(str.slice(index));
    return splitArray;
  }  
  function findMultIndex(arr) {
    return arr.findIndex(i => i == "*");
  }

  function findDivIndex(arr) {
    return arr.findIndex(i => i == "/");
  }

  function findAddIndex(arr) {
    return arr.findIndex(i => i == "+");
  }

  function findSubIndex(arr) {
    return arr.findIndex(i => i == "-");
  }

  function multiply(arr) {
    let  index = findMultIndex(arr);
    arr[index] = parseInt(arr[index - 1]) * parseInt(arr[index + 1]);
    //c is the value of result and both operands
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function divide(arr) {
    let index = findDivIndex(arr);
    arr[index] = parseInt(arr[index - 1]) / parseInt(arr[index + 1]);
     //c is the value of result and both operands
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function add(arr) {
    let index = findAddIndex(arr);
    arr[index] = parseInt(arr[index - 1]) + parseInt(arr[index + 1]);
     //c is the value of result and both operands
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function subtract(arr) {
    let index = findSubIndex(arr);
    arr[index] = parseInt(arr[index - 1]) - parseInt(arr[index + 1]);
     //c is the value of result and both operands
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function containsMultOrDiv(arr) {
    return arr.some(i => i === "*" || i === "/");
  }
  function containsAddOrSub(arr) {
    return arr.some(i => i === "+" || i === "-");
  }

  function simplify(arr) {
    while (containsMultOrDiv(arr)) {
      if (arr.includes("*")) {
        if (arr.includes("/")) {
          if (findDivIndex(arr) < findMultIndex(arr)) {
            arr = divide(arr);
          } 
          else {
            arr = multiply(arr);
          }
        } 
        else {
          arr = multiply(arr);
        }
      } 
      else {
        arr = divide(arr);
      }
    }
    while (containsAddOrSub(arr)) {
      if (arr.includes("+")) {
        if (arr.includes("-")) {
          if (findSubIndex(arr) < findAddIndex(arr)) {
            arr = subtract(arr);
          } 
          else {
            arr = add(arr);
          }
        } 
        else {
          arr = add(arr);
        }
      } 
      else {
        arr = subtract(arr);
      }
    }
    return arr;
  }
  var arithmeticArray = splitString(str);
  return simplify(arithmeticArray);
}
//keuboard events
document.onkeydown = function(event){
  let ch = event.code;  
  switch(ch) {
    case "Digit0":
    case "Numpad0":
      screen.innerHTML+=0;
      break;
    case "Digit1":
    case "Numpad1":
      screen.innerHTML+= 1;
      break;
    case "Digit2":
    case "Numpad2":
      screen.innerHTML+= 2;
      break;
    case "Digit3":
    case "Numpad3":
      screen.innerHTML+= 3;
      break;
    case "Digit4":
    case "Numpad4":
      screen.innerHTML+= 4;
      break;
    case "Digit5":
    case "Numpad5":
      screen.innerHTML+= 5;
      break;
    case "Digit6":
    case "Numpad6":
      if(!event.shiftKey){
        screen.innerHTML+= 6;
      }
      else{
        screen.innerHTML+= "^";
      }
      break;
    case "Digit7":
    case "Numpad7":
      screen.innerHTML+= 7;
      break;
    case "Digit8":
    case "Numpad8":
      screen.innerHTML+= 8;
      break;
    case "Digit9":
    case "Numpad9":
      screen.innerHTML+= 9;
      break;
    case "Minus":
    case "NumpadSubtract":
      screen.innerHTML+= "-";
      break;
    case "NumpadAdd":
      screen.innerHTML += "+";
      break;
    case "NumpadMultiply":
      screen.innerHTML += "*";
      break;
    case "NumpadDivide":
    case "slash":
      screen.innerHTML += "/";
      break;
    case "Enter":
    case "Equal":
    case "NumpadEnter":
      screen.innerHTML= eval(screen.innerHTML);
      break;
  }
} 