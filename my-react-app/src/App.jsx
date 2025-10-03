import { useState } from 'react';

// Complete USA states and sample cities
const usStates = {
  Alabama: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
  Alaska: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan'],
  Arizona: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
  Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
  California: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
  Colorado: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
  Connecticut: ['Hartford', 'New Haven', 'Stamford', 'Waterbury', 'Norwalk'],
  Delaware: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
  Florida: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg'],
  Georgia: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
  Hawaii: ['Honolulu', 'Hilo', 'Kailua', 'Kapolei', 'Waipahu'],
  Idaho: ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Caldwell'],
  Illinois: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford'],
  Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
  Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
  Kansas: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
  Kentucky: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
  Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
  Maine: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
  Maryland: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
  Massachusetts: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'],
  Michigan: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'],
  Minnesota: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'],
  Mississippi: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
  Missouri: ['Kansas City', 'Saint Louis', 'Springfield', 'Columbia', 'Independence'],
  Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
  Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
  Nevada: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
  NewHampshire: ['Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester'],
  NewJersey: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'],
  NewMexico: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
  NewYork: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'],
  NorthCarolina: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
  NorthDakota: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
  Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
  Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Edmond'],
  Oregon: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro'],
  Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
  RhodeIsland: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
  SouthCarolina: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
  SouthDakota: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
  Tennessee: ['Memphis', 'Nashville', 'Knoxville', 'Chattanooga', 'Clarksville'],
  Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'],
  Utah: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
  Vermont: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'],
  Virginia: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
  Washington: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
  WestVirginia: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'],
  Wisconsin: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
  Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
};

export default function App() {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [weatherResult, setWeatherResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_BASE = 'http://127.0.0.1:5000'; // Python backend URL

  const handleSubmit = async () => {
    if (!state || !city || !date || hour === '') return;
    setIsLoading(true);
    setWeatherResult(null);

    try {
      const resp = await fetch(`${BACKEND_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, state, date, hour }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Failed to fetch prediction');
      }

      const data = await resp.json();
      setWeatherResult(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>USA Weather Predictor</h1>

      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label>State</label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            {Object.keys(usStates).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
            <option value="">Select City</option>
            {state && usStates[state].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div style={styles.inputGroup}>
          <label>Hour (0-23)</label>
          <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} min={0} max={23} />
        </div>

        <button onClick={handleSubmit} disabled={isLoading} style={styles.button}>
          {isLoading ? 'Fetching...' : 'Predict Weather'}
        </button>
      </div>

      {weatherResult && (
        <div style={styles.results}>
          <h2>Prediction for {city}, {state} on {date} at {hour}:00</h2>
          <p><strong>Predicted Weather:</strong> {weatherResult.predicted_weather}</p>

          <h3>Expected Features:</h3>
          <ul>
            {Object.entries(weatherResult.features).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' },
  title: { fontSize: '2rem', marginBottom: '1rem' },
  form: { display: 'inline-block', textAlign: 'left', marginBottom: '2rem' },
  inputGroup: { marginBottom: '1rem' },
  button: { padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' },
  results: { marginTop: '2rem', background: '#f0f0f0', padding: '1rem', borderRadius: '8px' },
};
