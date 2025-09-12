import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NASA Galaxy App 🚀</h1>
        <p>Explore missions, planets, and the wonders of the universe right from your browser.</p>
        <a
          className="App-button"
          href="https://www.nasa.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore NASA
        </a>
      </header>

      <section className="App-features">
        <div className="feature-card">
          <h2>Space Missions</h2>
          <p>Check out past, present, and upcoming space missions.</p>
        </div>
        <div className="feature-card">
          <h2>Planets & Stars</h2>
          <p>Discover detailed information about planets, stars, and galaxies.</p>
        </div>
        <div className="feature-card">
          <h2>Live Data</h2>
          <p>Access live satellite feeds, images, and NASA data sets.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
