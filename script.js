console.log(`Sanity Check For script.js File`);
//=============================== CACHE THE ARRAY ELEMENTS OF CATEGORIES ===============================//
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];
//================================== CACHE THE ARRAY ELEMENTS OF DATA ==================================//
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];
//=======================================================================================================//

//===================== CACHE THE FORM ELEMENT =====================//
const form = document.getElementById("fact-form-id");
// console.dir(form);
//============== CACHE THE SHARE FACT BUTTON ELEMENT ==============//
const formBtn = document.getElementById("btn-open");
// console.dir(formBtn)
//====================== CACHE THE UL ELEMENT ======================//
const ulList = document.querySelector(".fact-list");
// console.dir(ulList);
//==================================================================//

//==================================================================//
// CREATE DOM ELEMENTS AND RENDER FACTS IN THE LI ELEMENT
//------------------------------------------------------------------//
ulList.innerHTML = "";
// ulList.insertAdjacentHTML();
//------------------------------------------------------------------//
// CALLING THE FUNCTION TO RENDER THE DOM ELEMENTS OF LI's
creatFactsList(initialFacts);
//------------------------------------------------------------------//
// CREATE A REUSABLE FUNCTION COMPONENT THAT REPRESENT THE LI ELEMENT
//------------------------------------------------------------------//
function creatFactsList(arrayOfData) {
  const htmlLiArray = arrayOfData.map(
    (fact) => `<li class="fact"> 
                  <P>${fact.text}
                  <a
                    class="source"
                    href="${fact.source}"
                    target="_blank>"
                    >(source)</a> 
                  </P>
                  <span class="tag" style="background-color: #3b82f6"
                    >${fact.category}</span
                  >
                  <div class="vote-buttons">
                    <button>👍🏾 ${fact.votesInteresting}</button>
                    <button>🤯 ${fact.votesMindblowing}</button>
                    <button>⛔️ ${fact.votesFalse}</button>
                  </div>
               </li>`
  );
  //------------------------------------------------------------------//
  const htmlLiEl = htmlLiArray.join("");
  //------------------------------------------------------------------//
  // APPEND THE MAPPED LI ELEMENT TO THE UL ELEMENT
  ulList.insertAdjacentHTML("afterbegin", htmlLiEl);
  //==================================================================//
}

//==================================================================//
// CREATE AN EVENT LISTENER FOR TO TOGGLE SHARE FACT BUTTON ELEMENT
formBtn.addEventListener("click", function (e) {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    formBtn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    formBtn.textContent = "Share a fact";
  }
});

//== SET THE VOTING VARIABLES ==//
let votesInteresting = 0;
let votesMindblowing = 0;
let votesFalse = 0;
