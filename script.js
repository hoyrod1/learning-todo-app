// console.log(`Sanity Check For script.js File`);
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
// const testObj = CATEGORIES.find((cat) => cat.name === "science");
// console.log(testObj.color);
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
ulList.innerHTML = "";
// ulList.insertAdjacentHTML();
//====================== CACHE THE UL ELEMENT ======================//
const ulCatList = document.querySelector(".category-list");
// console.dir(ulCatList);
ulCatList.innerHTML = "";
//==================================================================//

//==================================================================//
// CREATE DOM ELEMENTS AND RENDER FACTS IN THE LI ELEMENT
//------------------------------------------------------------------//
// FETCH FACTS DATA FROM THE Superbase API
async function loadApiFacts() {
  const res = await fetch(
    "https://wdmryufnequrkcumvggg.supabase.co/rest/v1/technolgy-todo",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbXJ5dWZuZXF1cmtjdW12Z2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0ODI1NzgsImV4cCI6MjA0NTA1ODU3OH0.3P-wZ1jCSsyZQ-ycxbfjaq49JuGX1jo6H2D9Q_vM_Dg",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbXJ5dWZuZXF1cmtjdW12Z2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0ODI1NzgsImV4cCI6MjA0NTA1ODU3OH0.3P-wZ1jCSsyZQ-ycxbfjaq49JuGX1jo6H2D9Q_vM_Dg",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  //------------------------------------------------------------------//
  // CALLING THE FUNCTION TO RENDER THE FACTS DATA IN THE LI ELEMENT
  creatFactsList(data);
}
//------------------------------------------------------------------//
loadApiFacts();
//------------------------------------------------------------------//
//======================================================================//

//======================================================================//
// CREATE A REUSABLE FUNCTION COMPONENT THAT REPRESENT THE LI ELEMENT
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
                  <span class="tag" style="background-color: ${
                    CATEGORIES.find((cat) => cat.name === fact.category).color
                  }"
                    >${fact.category}</span
                  >
                  <div class="vote-buttons">
                    <button>👍🏾 ${fact.votesInteresting}</button>
                    <button>🤯 ${fact.votesMindBlowing}</button>
                    <button>⛔️ ${fact.votesFalse}</button>
                  </div>
               </li>`
  );
  //------------------------------------------------------------------//
  const htmlLiEl = htmlLiArray.join("");
  //------------------------------------------------------------------//
  // APPEND THE MAPPED LI ELEMENT TO THE UL ELEMENT FOR FACTS
  ulList.insertAdjacentHTML("afterbegin", htmlLiEl);
  //------------------------------------------------------------------//
}
//======================================================================//

//======================================================================//
// CREATE A REUSABLE FUNCTION COMPONENT THAT REPRESENT THE LI ELEMENT
function creatCategoryList(arrayOfCategories) {
  const htmlLiArray = arrayOfCategories.map(
    (category) => `<li class="category">
                      <button
                        class="btn btn-category"
                        style="background-color: ${category.color}"
                      >
                        ${category.name}
                      </button>
                   </li>`
  );
  //------------------------------------------------------------------//
  const htmlLiEl = htmlLiArray.join("");
  //------------------------------------------------------------------//
  // APPEND THE MAPPED LI ELEMENT TO THE UL ELEMENT FOR CATEGORIES
  ulCatList.insertAdjacentHTML("afterbegin", htmlLiEl);
  //------------------------------------------------------------------//
}
creatCategoryList(CATEGORIES);
//======================================================================//

//======================================================================//
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
//======================================================================//

//== SET THE VOTING VARIABLES ==//
let votesInteresting = 0;
let votesMindblowing = 0;
let votesFalse = 0;
