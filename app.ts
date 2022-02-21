//selecting various elements
var btns = document.querySelectorAll(".btn");
var number = document.querySelectorAll(".number");
var operator = document.querySelectorAll(".operator");
var equal = document.querySelector("#equal");
var calcScreen = document.querySelector(".calc-screen") as HTMLElement;
var backspace = document.querySelector("#backspace");
var del = document.querySelector("#clear") as HTMLElement;
var deg = document.querySelector("#deg") as HTMLElement;
var functionButton = document.querySelector(".function-btn") as HTMLElement;
var trigoButton = document.querySelector(
  ".trigonometry-function"
) as HTMLElement;
var second = document.querySelector("#second") as HTMLElement;

//initialization of screen value
var degreeFlag: boolean = false;
var memory: String[] = [],
  i: number = 0;
// var result: string;
function eventList(e: Event): string {
  let ch = e.target as HTMLElement;
  let chId = ch.id;
  switch (chId) {
    case "equal":
      if (calcScreen.innerHTML.includes("^")) {
        let result = nthroot(calcScreen.innerHTML);
        calcScreen.innerHTML = String(result);
      } else {
        // let result = ;
        calcScreen.innerHTML = String(evaluate(calcScreen.innerHTML));
      }
      break;
    case "sin":
      if (degreeFlag) {
        calcScreen.innerHTML = Math.sin(
          (parseInt(calcScreen.innerHTML) * Math.PI) / 180
        ).toPrecision(2);
      } else {
        calcScreen.innerHTML = Math.sin(
          parseInt(calcScreen.innerHTML)
        ).toPrecision(10);
      }
      break;
    case "cos":
      if (degreeFlag) {
        calcScreen.innerHTML = Math.cos(
          (parseInt(calcScreen.innerHTML) * Math.PI) / 180
        ).toPrecision(2);
      } else {
        calcScreen.innerHTML = Math.cos(
          parseInt(calcScreen.innerHTML)
        ).toPrecision(10);
      }
      break;
    case "tan":
      if (degreeFlag) {
        calcScreen.innerHTML = Math.tan(
          (parseInt(calcScreen.innerHTML) * Math.PI) / 180
        ).toPrecision(2);
      } else {
        calcScreen.innerHTML = Math.tan(
          parseInt(calcScreen.innerHTML)
        ).toPrecision(10);
      }
      break;
    case "round":
      calcScreen.innerHTML = String(Math.round(parseInt(calcScreen.innerHTML)));
      break;
    case "floor":
      calcScreen.innerHTML = String(Math.floor(parseInt(calcScreen.innerHTML)));
      break;
    case "ceil":
      calcScreen.innerHTML = String(Math.ceil(parseInt(calcScreen.innerHTML)));
      break;
    case "f-e":
      calcScreen.innerHTML = String(
        Math.pow(10, parseInt(calcScreen.innerHTML))
      );
      break;
    case "backspace":
      calcScreen.innerHTML = backSpace(calcScreen.innerHTML);
      break;
    case "clear":
      //delete operator
      calcScreen.innerHTML = "";
      break;
    case "pi":
      if (calcScreen.innerHTML === "") {
        calcScreen.innerHTML = "3.14";
      } else {
        calcScreen.innerHTML = String(Math.PI);
      }
      break;
    case "positive-negitive":
      if (calcScreen.innerHTML === "") {
        alert("Please enter the number");
      } else {
        calcScreen.innerHTML = String(signChange(calcScreen.innerHTML));
      }
      break;
    case "exponential":
      if (calcScreen.innerHTML === "") {
        calcScreen.innerHTML = "2.718";
      } else {
        calcScreen.innerHTML = String(Math.E);
      } //not always they will need as multiplication
      break;
    case "power2":
      calcScreen.innerHTML = String(
        Math.pow(parseInt(calcScreen.innerHTML), 2)
      );
      break;
    case "denom":
      calcScreen.innerHTML = String(1 / parseInt(calcScreen.innerHTML));
      break;
    case "absolute":
      calcScreen.innerHTML = String(Math.abs(parseInt(calcScreen.innerHTML)));
      break;
    case "expo":
      calcScreen.innerHTML = String(Math.exp(parseInt(calcScreen.innerHTML)));
      break;
    case "mod":
      calcScreen.innerHTML = String(Math.abs(parseInt(calcScreen.innerHTML)));
      break;
    case "root":
      calcScreen.innerHTML = String(Math.sqrt(parseInt(calcScreen.innerHTML)));
      break;
    case "open-parenthesis":
      calcScreen.innerHTML += "(";
      break;
    case "close-parenthesis":
      calcScreen.innerHTML += ")";
      break;
    case "power":
      calcScreen.innerHTML += "^";
      break;
    case "base10":
      calcScreen.innerHTML = String(
        Math.pow(10, parseInt(calcScreen.innerHTML))
      );
      break;
    case "log":
      if (calcScreen.innerHTML === "") {
        alert("Please enter the number.");
      } else {
        calcScreen.innerHTML = String(Math.log(parseInt(calcScreen.innerHTML)));
      }
      break;
    case "ln":
      if (calcScreen.innerHTML === "") {
        alert("Please enter the number.");
      } else {
        calcScreen.innerHTML = String(
          Math.log10(parseInt(calcScreen.innerHTML))
        );
      }
      break;
    case "factorial":
      calcScreen.innerHTML = String(factorialFunc(calcScreen.innerHTML));
      break;
    case "memory-clear":
      memoryClear();
      break;
    case "memory-plus":
      memoryPlus(calcScreen.innerHTML);
      break;
    case "memory-minus":
      memoryMinus();
      break;
    // case "memory-stored":
    //   calcScreen.innerHTML = memoryStored();
    //   break;
    case "memory-recall":
      calcScreen.innerHTML = memoryRecall();
      break;
    case "power3":
      if (calcScreen.innerHTML.includes("-")) {
        calcScreen.innerHTML = String(
          -1 * Math.pow(-1 * parseInt(calcScreen.innerHTML), 3)
        );
      } else {
        calcScreen.innerHTML = Math.pow(
          parseInt(calcScreen.innerHTML),
          3
        ).toString();
      }
      break;
    case "cube-root":
      if (calcScreen.innerHTML.includes("-")) {
        calcScreen.innerHTML = String(
          -1 * Math.pow(-1 * parseInt(calcScreen.innerHTML), 1 / 3)
        );
      } else {
        calcScreen.innerHTML = String(
          Math.pow(parseInt(calcScreen.innerHTML), 1 / 3)
        );
      }
      break;
    case "x-root-y":
      calcScreen.innerHTML += "^";
      break;
    case "base2":
      calcScreen.innerHTML = String(
        Math.pow(2, parseInt(calcScreen.innerHTML))
      );
      break;
    case "log2":
      calcScreen.innerHTML = String(Math.log2(parseInt(calcScreen.innerHTML)));
      break;
    case "base-e":
      calcScreen.innerHTML = String(
        Math.pow(Math.E, parseInt(calcScreen.innerHTML))
      );
      break;
  }
  return calcScreen.innerHTML;
}
function backSpace(value: string) {
  return value.substr(0, value.length - 1);
}
//root function
function nthroot(num: string) {
  let a: number;
  let b: number;
  let operand1 = num.slice(0, num.indexOf("^"));
  a = parseInt(operand1);
  let operand2 = num.slice(num.indexOf("^") + 1);
  b = parseInt(operand2);
  return Math.pow(a, b);
}
//deg and rad function
deg.addEventListener("click", function () {
  if (!deg.classList.contains("show")) {
    deg.classList.add("show");
    deg.classList.add("color");
    deg.innerHTML = "RAD";
    degreeFlag = false;
  } else {
    deg.classList.remove("show");
    deg.classList.remove("color");
    deg.innerHTML = "DEG";
    degreeFlag = true;
  }
});
//memory functions
function memoryPlus(num: string) {
  if (memory.length === 0) {
    memory.push(num);
    calcScreen.innerHTML = "";
  } else {
    memory.push(num);
    let memory1 = memory.reduce((acc, index) => +acc + +index, 0);
    memory.pop();
    memory.push(memory1.toString());
    calcScreen.innerHTML = "";
    return memory1;
  }
}
function memoryMinus() {
  if (memory.length === 0) {
    alert("Nothing is in the memeory");
  } else {
    memory.pop();
  }
  return memory;
}
function memoryStored() {
  if (memory.length === 0) {
    alert("nothing is stored");
  } else {
    calcScreen.innerHTML = memory[i].toString();
    i++;
    if (i === memory.length) {
      i = 0;
    }
  }
  return memory;
}
function memoryClear() {
  for (let i = 0; i <= memory.length; i++) {
    memory.pop();
  }
  return memory;
}
function memoryRecall() {
  return memory.pop().toString();
}

//taking btn click events for all the buttons
btns.forEach((btn) => {
  btn.addEventListener("click", eventList);
});

//factorial function
function factorialFunc(n: string | number): number {
  let result: number;
  for (let i = 1; i <= n; i++) {
    if (n === 1 || n === 0) {
      result = 1;
    } else {
      result = +n * factorialFunc(+n - 1);
    }
  }
  return result;
}
//adding to the screen
number.forEach((number) => {
  number.addEventListener("click", function () {
    calcScreen.innerHTML += number.innerHTML;
  });
});
//operator adding to the screen
operator.forEach((operator) => {
  operator.addEventListener("click", function () {
    calcScreen.innerHTML += operator.innerHTML;
  });
});
//dropdown menu toggling functions
function toggle(e: Event) {
  let target = e.target as HTMLElement;
  if (!target.nextElementSibling.classList.contains("show")) {
    target.nextElementSibling.classList.add("show");
  } else {
    target.nextElementSibling.classList.remove("show");
  }
}

trigoButton.addEventListener("click", toggle);
functionButton.addEventListener("click", toggle);

//positive-negative sign change
function signChange(num: string | number): number {
  num = -1 * +num;
  return num;
}
// 2nd button
second.addEventListener("click", function () {
  if (!second.classList.contains("color")) {
    second.classList.add("color");
  } else {
    second.classList.remove("color");
  }
  let rowSwitch = document.querySelectorAll(".switch");
  for (let i = 0; i < rowSwitch.length; i++) {
    let firstChild: Element | null = rowSwitch[i].firstElementChild;
    let secondChild: Element | null = firstChild.nextElementSibling;
    if (secondChild.classList.contains("hide")) {
      secondChild.classList.remove("hide");
      firstChild.classList.add("hide");
    } else {
      firstChild.classList.remove("hide");
      secondChild.classList.add("hide");
    }
  }
});

type stringOrNumber = string | number;
function convertToString(val: stringOrNumber) {
  return val.toString();
}
//equal operator
function evaluate(str: string): stringOrNumber[] {
  function splitString(str: string): stringOrNumber[] {
    let index = 0;
    let splitArray = str
      .split("")
      .reduce((arr: string[], operand: string, i: number) => {
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

  function findMultIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "*");
  }

  function findDivIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "/");
  }

  function findAddIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "+");
  }

  function findSubIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "-");
  }

  function multiply(arr: stringOrNumber[]) {
    let index: stringOrNumber = findMultIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) *
      parseInt(convertToString(arr[index + 1]));
    //c is the value of result and both operands
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }

  function divide(arr: stringOrNumber[]) {
    let index: stringOrNumber = findDivIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) /
      parseInt(convertToString(arr[index + 1]));
    //c is the value of result and both operands
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }

  function add(arr: stringOrNumber[]) {
    let index: stringOrNumber = findAddIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) +
      parseInt(convertToString(arr[index + 1]));
    //c is the value of result and both operands
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }

  function subtract(arr: stringOrNumber[]) {
    let index: stringOrNumber = findSubIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) -
      parseInt(convertToString(arr[index + 1]));
    //c is the value of result and both operands
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }

  function containsMultOrDiv(arr: stringOrNumber[]) {
    return arr.some((i) => i === "*" || i === "/");
  }
  function containsAddOrSub(arr: stringOrNumber[]) {
    return arr.some((i) => i === "+" || i === "-");
  }

  function simplify(arr: stringOrNumber[]): stringOrNumber[] {
    while (containsMultOrDiv(arr)) {
      if (arr.includes("*")) {
        if (arr.includes("/")) {
          if (findDivIndex(arr) < findMultIndex(arr)) {
            arr = divide(arr);
          } else {
            arr = multiply(arr);
          }
        } else {
          arr = multiply(arr);
        }
      } else {
        arr = divide(arr);
      }
    }
    while (containsAddOrSub(arr)) {
      if (arr.includes("+")) {
        if (arr.includes("-")) {
          if (findSubIndex(arr) < findAddIndex(arr)) {
            arr = subtract(arr);
          } else {
            arr = add(arr);
          }
        } else {
          arr = add(arr);
        }
      } else {
        arr = subtract(arr);
      }
    }
    return arr;
  }
  var arithmeticArray = splitString(str);
  return simplify(arithmeticArray);
}
//keuboard events
document.onkeydown = function (event) {
  let ch = event.code;
  switch (ch) {
    case "Digit0":
    case "Numpad0":
      calcScreen.innerHTML += 0;
      break;
    case "Digit1":
    case "Numpad1":
      calcScreen.innerHTML += 1;
      break;
    case "Digit2":
    case "Numpad2":
      calcScreen.innerHTML += 2;
      break;
    case "Digit3":
    case "Numpad3":
      calcScreen.innerHTML += 3;
      break;
    case "Digit4":
    case "Numpad4":
      calcScreen.innerHTML += 4;
      break;
    case "Digit5":
    case "Numpad5":
      calcScreen.innerHTML += 5;
      break;
    case "Digit6":
    case "Numpad6":
      if (!event.shiftKey) {
        calcScreen.innerHTML += 6;
      } else {
        calcScreen.innerHTML += "^";
      }
      break;
    case "Digit7":
    case "Numpad7":
      calcScreen.innerHTML += 7;
      break;
    case "Digit8":
    case "Numpad8":
      calcScreen.innerHTML += 8;
      break;
    case "Digit9":
    case "Numpad9":
      calcScreen.innerHTML += 9;
      break;
    case "Minus":
    case "NumpadSubtract":
      calcScreen.innerHTML += "-";
      break;
    case "NumpadAdd":
      calcScreen.innerHTML += "+";
      break;
    case "NumpadMultiply":
      calcScreen.innerHTML += "*";
      break;
    case "NumpadDivide":
    case "slash":
      calcScreen.innerHTML += "/";
      break;
    case "Enter":
    case "Equal":
    case "NumpadEnter":
      calcScreen.innerHTML = eval(calcScreen.innerHTML);
      break;
  }
};
