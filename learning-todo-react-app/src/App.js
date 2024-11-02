import "./style.css";
//========================= HEADER COMPONENT ========================//
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>
      <button id="btn-open" className="btn btn-large">
        Share A Fact
      </button>
    </header>
  );
}
//===================================================================//

//====================== NEW FACT FORM COMPONENT ====================//
function NewFactForm() {
  return (
    <form id="fact-form-id" className="fact-form hidden">
      <input type="text" placeholder="Share a Fact with world..." />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source..." />
      <select>
        <option value="">Choose category</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
      </select>
      <button className="btn btn-large" value="Post">
        Post
      </button>
    </form>
  );
}
//===================================================================//

//======================== CATEGORY COMPONENT =======================//
function Category() {
  return (
    <aside>
      <ul className="category-list">
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        <li className="category">
          <button
            className="btn btn-category"
            style={{ backgroundColor: "#3b82f6" }}
          >
            Technology
          </button>
        </li>
        <li className="category">
          <button
            className="btn btn-category"
            style={{ backgroundColor: "#16a34a" }}
          >
            Science
          </button>
        </li>
      </ul>
    </aside>
  );
}
//===================================================================//

//======================= FACTS LIST COMPONENT ======================//
function FactList() {
  return (
    <section>
      <ul className="fact-list">
        <li className="fact">
          <p>
            React is being developed by Meta (formerly facebook)
            <a
              className="source"
              href="https://opensource.fb.com/"
              target="_blank>"
            >
              (source)
            </a>
          </p>
          <span className="tag" style={{ backgroundColor: "#3b82f6" }}>
            technology
          </span>
          <div className="vote-buttons">
            <button>👍🏾 24</button>
            <button>🤯 9</button>
            <button>⛔️ 4</button>
          </div>
        </li>

        <li className="fact">
          <p>
            Millennial dads spend 3 times as much time with their kids than
            their fathers spent with them. In 1982, 43% of fathers had never
            changed a diaper. Today, that number is down to 3%
            <a
              className="source"
              href="https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids"
              target="_blank"
            >
              (Source)
            </a>
          </p>
          <span className="tag" style={{ backgroundColor: "#eab308" }}>
            society
          </span>
          <div className="vote-buttons">
            <button>👍🏾 11</button>
            <button>🤯 2</button>
            <button>⛔️ 0</button>
          </div>
        </li>

        <li className="fact">
          <p>
            Lisbon is the capital of Portugal
            <a
              className="source"
              href="https://en.wikipedia.org/wiki/Lisbon"
              target="_blank"
            >
              (Source)
            </a>
          </p>
          <span className="tag" style={{ backgroundColor: "#8b5cf6" }}>
            society
          </span>
          <div className="vote-buttons">
            <button>👍🏾 9</button>
            <button>🤯 3</button>
            <button>⛔️ 1</button>
          </div>
        </li>
      </ul>
    </section>
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

//=========================== APPLICATION ===========================//
function App() {
  return (
    <>
      <Header />
      <NewFactForm />
      <main className="main">
        <Category />
        <FactList />
      </main>
      <Footer />
    </>
  );
}
//===================================================================//
export default App;
