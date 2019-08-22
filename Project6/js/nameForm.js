const submit = document.querySelector("#submit");
const warn = document.querySelector("#warning");
const p1Name = document.querySelector("#p1-name-val");
const p2Name = document.querySelector("#p2-name-val");

p1Name.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkAndSubmit();
  } else {
    checkNames();
  }
});

p2Name.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkAndSubmit();
  } else {
    checkNames();
  }
});

function checkNames() {
  if (p1Name.value.trim() !== "" && p2Name.value.trim() !== "") {
    warn.style.display = "none";
    submit.classList.remove("uk-disabled");
    submit.classList.remove("uk-margin-top");
  } else {
    warn.style.display = "";
    submit.classList.add("uk-disabled");
    submit.classList.add("uk-margin-top");
  }
}

function checkAndSubmit() {
  if (!submit.classList.contains("uk-disabled")) {
    game.setNames();
  }
}

submit.addEventListener("click", function() {
  game.setNames();
});
