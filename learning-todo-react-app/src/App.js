import { useState } from "react";
import "./style.css";
//=========================== CACHE THE ARRAY ELEMENTS OF CATEGORIES ===========================//
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
//==============================================================================================//
//============================== CACHE THE ARRAY ELEMENTS OF DATA ==============================//
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
//==================================================================================================//
//=========================== APPLICATION ===========================//
function App() {
  const [facts, setFacts] = useState(initialFacts);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <Categories />
        <FactList facts={facts} />
      </main>
      <Footer />
    </>
  );
}
//===================================================================//

//========================= HEADER COMPONENT ========================//
function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned a Fact!!!";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        id="btn-open"
        className="btn btn-large"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share A Fact"}
      </button>
    </header>
  );
}
//===================================================================//

//====================== NEW FACT FORM COMPONENT ====================//
function NewFactForm({ setFacts, setShowForm }) {
  const categories = CATEGORIES;
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function submitForm(e) {
    // PREVENT BROWSER FROM RELOADING//
    e.preventDefault();
    console.log(text, source, category);
    // PERFORM FORM VALIDATION
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // CREATE A NEW FACT OBJECT
      const newFact = {
        id: Math.round(Math.random() * 10000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      // ADD THE NEW FACT TO THE UI; ADD FACT TO THE STATE
      setFacts((facts) => [newFact, ...facts]);
      // RESET INPUT FIELDS
      setText("");
      setSource("");
      setCategory("");
      // CLOSE THE FORM
      setShowForm(false);
    } else {
      console.log("The data is valid");
    }
  }
  return (
    <form id="fact-form-id" className="fact-form" onSubmit={submitForm}>
      <input
        type="text"
        placeholder="Share a Fact with world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large" value="Post">
        Post
      </button>
    </form>
  );
}
//===================================================================//

//======================= CATEGORIES COMPONENT ======================//
function Categories() {
  const categories = CATEGORIES;
  return (
    <aside>
      <ul className="category-list">
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {categories.map((category) => (
          <Category key={category.name} cat={category} />
        ))}
      </ul>
    </aside>
  );
}
//------------------------ CATEGORY COMPONENT -----------------------//
function Category({ cat }) {
  return (
    <li className="category">
      <button
        className="btn btn-category"
        style={{ backgroundColor: cat.color }}
      >
        {cat.name}
      </button>
    </li>
  );
}
//===================================================================//

//======================= FACTS LIST COMPONENT ======================//
function FactList({ facts }) {
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
    </section>
  );
}
//----------------------- FACT LIST COMPONENT -----------------------//
function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank>">
          (source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: "#3b82f6" }}>
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍🏾 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}
//===================================================================//

//========================= FOOTER COMPONENT ========================//
function Footer() {
  return (
    <footer>
      <p className="footer-logo">STC media inc Technology</p>
    </footer>
  );
}
//===================================================================//

export default App;
