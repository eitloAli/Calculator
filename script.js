





let BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");
const msg = document.querySelector(".msg");

amountInput.addEventListener("keypress", (event) => {
  const keyCode = event.code;

  // Allow numeric keys (0-9) from both the main keyboard and the numeric keypad, and certain control keys
  const allowedKeys = [
    "Digit0",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "NumpadDecimal",
    "Period",
  ];

  // Array of characters to block
  const blockedCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

  // Check if the pressed key is allowed
  if (
    !allowedKeys.includes(keyCode) ||
    (blockedCharacters.includes(event.key) && event.shiftKey)
  ) {
    event.preventDefault();
  }
});

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (element) => {
    updateFlag(element.target);
  });
}



const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // if (amtVal === "" || amtVal < 1) {
  //   amtVal = 1;
  //   amount.value = "1";
  // }
  let to_curr = document.querySelector("#to-curr");
  let from_curr = document.querySelector("#from-curr")

  const URL = `${BASE_URL}/${from_curr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[from_curr.value.toLowerCase()];
  let finalRate = rate[to_curr.value.toLowerCase()] * amtVal;
  finalRate = Math.floor(finalRate)

  msg.textContent = `${amtVal} ${from_curr.value} = ${finalRate} ${to_curr.value}`
}




const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

let debounceTimer;
amountInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        updateExchangeRate();
    }, 300)
});
