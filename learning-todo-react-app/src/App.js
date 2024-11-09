import { useEffect, useState } from "react";
import supabase from "./supabase";
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
    votesMindBlowing: 2,
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
  const [isLoading, setIsLoading] = useState(false);
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // "currentCategory" is set to "all" by default
  // This is only check if another category is selected
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);
        // SELECT ALL THE FACTS FROM THE DATABASE
        let query = supabase.from("technolgy-todo").select("*");

        if (currentCategory !== "all")
          // IF currentCategory state IS NOT "all"
          // SELECT ALL THE FACTS THAT currentCategory IS SET TOO
          query = query.eq("category", currentCategory);

        const { data: technolgy, error } = await query
          .order("votesInteresting", {
            ascending: false,
          })
          .limit(1000);

        if (!error) setFacts(technolgy);
        else alert("There was an error retrieving the facts");

        setIsLoading(false);
      }
      getFacts();
      // "currentCategory" was added to the dependecy useEffect array to re-render the broser when another category is selected
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        {isLoading ? (
          <CategoriesLoader />
        ) : (
          <Categories setCurrentCategory={setCurrentCategory} />
        )}
        {isLoading ? (
          <FactsLoader />
        ) : (
          <FactList setFacts={setFacts} facts={facts} />
        )}
      </main>
      <Footer />
    </>
  );
}
//===================================================================//

//==================== Categories Loader COMPONENT ==================//
function CategoriesLoader() {
  return <p className="catLoader">The Categories Are Loading...</p>;
}
//===================================================================//

//======================= Facts Loader COMPONENT ====================//
function FactsLoader() {
  return <p className="factsLoader">The Facts Are Loading...</p>;
}
//===================================================================//

//==================== Categories Loader COMPONENT ==================//
function NoFactsLoader() {
  return (
    <p className="factsLoader">
      The Are Currently No Facts for this Category. Please feel free to create
      the first one
    </p>
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
  const [isUpLoading, setIsUpLoading] = useState(false);
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

  async function submitForm(e) {
    // PREVENT BROWSER FROM RELOADING//
    e.preventDefault();
    // console.log(text, source, category);
    // PERFORM FORM VALIDATION
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // CREATE A NEW FACT OBJECT FOR LOCAL FACTS
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindBlowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      // console.log(newFact);
      // SET setIsUpLoading(true)
      setIsUpLoading(true);
      // UPLOAD NEW FACT TO SUPABASE
      const { data: newFact, error } = await supabase
        .from("technolgy-todo")
        .insert([{ text, source, category }])
        .select();
      // SET setIsUpLoading(true)
      setIsUpLoading(false);
      // IF ERROR IS FALSE ADD THE NEW FACT TO THE UI; ADD FACT TO THE STATE
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
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
        disabled={isUpLoading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUpLoading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUpLoading}
      >
        <option value="">Choose category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large" value="Post" disabled={isUpLoading}>
        Post
      </button>
    </form>
  );
}
//===================================================================//

//======================= CATEGORIES COMPONENT ======================//
function Categories({ setCurrentCategory }) {
  const categories = CATEGORIES;
  return (
    <aside>
      <ul className="category-list">
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {categories.map((category) => (
          <Category
            key={category.name}
            cat={category}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </ul>
    </aside>
  );
}
//------------------------ CATEGORY COMPONENT -----------------------//
function Category({ cat, setCurrentCategory }) {
  return (
    <li className="category">
      <button
        className="btn btn-category"
        style={{ backgroundColor: cat.color }}
        onClick={() => setCurrentCategory(cat.name)}
      >
        {cat.name}
      </button>
    </li>
  );
}
//===================================================================//

//======================= FACTS LIST COMPONENT ======================//
function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return <NoFactsLoader />;
  }
  return (
    <section className="fact-section">
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}
//----------------------- FACT LIST COMPONENT -----------------------//
function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDiputed =
    fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;
  //ASYNC FUNCTION TO VOTE ON THE FACTS
  async function handleVote(votescolumn, votes) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("technolgy-todo")
      .update({ [votescolumn]: votes + 1 })
      .eq("id", fact.id)
      .select();
    // console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    setIsUpdating(false);
  }
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank>">
          (source)
        </a>
        {isDiputed ? <span className="disputed">(⛔DISPUTED)</span> : null}
      </p>
      <span className="tag" style={{ backgroundColor: "#3b82f6" }}>
        {fact.category}
      </span>
      <span className="tag">{fact.created_at}</span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting", fact.votesInteresting)}
          disabled={isUpdating}
        >
          👍🏾 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindBlowing", fact.votesMindBlowing)}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindBlowing}
        </button>
        <button
          onClick={() => handleVote("votesFalse", fact.votesFalse)}
          disabled={isUpdating}
        >
          ⛔️ {fact.votesFalse}
        </button>
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
