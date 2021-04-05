/////////////             Declaration       ////////////
const log = console.log;
const input = document.querySelector(".word");
const scrhBtn = document.querySelector(".srch");
const error = document.querySelector(".error");
const wrapper = document.createElement("div");

//////////        event listeners       /////////////////
scrhBtn.addEventListener("click", function run(e) {
  e.preventDefault();
  const word = input.value;
  if (word === "") {
    swal("Oops", "Please Enter a Word!", "error");
  } else {
    getData(word);
  }
  // log(word);
  setTimeout(function () {}, 400);
});

////////////      functions             ///////////////
async function getData(word) {
  const url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  //log(wrapper.innerHTML);
  wrapper.innerHTML = "<div></div>";
  log(data);
  if (wrapper.innerHTML === "") log("error");
  if (!data.length || typeof data[0] === "string") {
    swal("Oops", "Please Enter a Correct Word!", "error");
  } else {
    component(data, word);
  }

  // if (wrapper.innerHTML === "") log("error");
}

function component(data, word) {
  //document.querySelector(".bg").style.display = "none";
  if ((data[0].prs = undefined)) log(123);
  const query = document.createElement("h3");
  const grammar = document.createElement("p");
  const pronun = document.createElement("p");
  const meaning = document.createElement("p");
  const div = document.createElement("div");
  console.log(div);
  document.querySelector(".data").appendChild(wrapper);
  wrapper.classList.add("wrapper");
  div.classList.add("playBtn");
  wrapper.appendChild(query);
  query.style.color = "#fff";
  wrapper.appendChild(grammar);
  wrapper.appendChild(pronun);
  wrapper.appendChild(meaning);
  wrapper.appendChild(div);
  query.innerHTML = `${word}`;
  grammar.innerHTML = `${data[0].fl}`;
  meaning.innerHTML = `${data[0].shortdef[0]}`;
  log();
  if (data[0].fl != "abbreviation") {
    const soundName = data[0].hwi.prs[0].sound.audio;
    pronun.innerHTML = `${data[0].hwi.prs[0].ipa}`;
    div.innerHTML = `<i class="fas fa-volume-up"></i>`;
    if (soundName) {
      renderSound(soundName, wrapper, div);
    }
  }
}

function renderSound(soundName, wrapper, div) {
  // https://media.merriam-webster.com/soundc11
  let subfolder = soundName.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${key}`;
  console.log(soundSrc);
  let aud = document.createElement("audio");
  aud.src = soundSrc;
  aud.controls = false;
  div.addEventListener("click", () => {
    // console.log("ofrmr4kjgnf");
    aud.play();
  });
  wrapper.appendChild(aud);
}
input.addEventListener("change", (count) => {
  wrapper.innerHTML = "";
  wrapper.classList.remove("wrapper");
  count = true;
});
