import "./style.css";

function App() {
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

export default App;
