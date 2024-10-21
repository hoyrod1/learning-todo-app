console.log(`Sanity Check For script.js File`);
// CACHE THE FORM ELEMENT
const form = document.getElementById("fact-form-id");
// CACHE THE SHARE FACT BUTTON ELEMENT
const formBtn = document.getElementById("btn-open");

// CREATE AN EVENT LISTENER FOR THE SHARE FACT BUTTON ELEMENT
formBtn.addEventListener("click", function (e) {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    formBtn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    formBtn.textContent = "Share a fact";
  }
});
