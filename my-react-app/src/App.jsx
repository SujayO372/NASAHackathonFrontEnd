import { useState, useEffect } from 'react';

const countries = {
  USA: {
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
    Hawaii: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu'],
    Idaho: ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Pocatello'],
    Illinois: ['Chicago', 'Aurora', 'Joliet', 'Naperville', 'Rockford'],
    Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
    Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
    Kansas: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
    Kentucky: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
    Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
    Maine: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
    Maryland: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
    Massachusetts: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
    Michigan: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing'],
    Minnesota: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington'],
    Mississippi: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
    Missouri: ['Kansas City', 'St. Louis', 'Springfield', 'Independence', 'Columbia'],
    Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
    Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
    Nevada: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
    'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover'],
    'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
    'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
    'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
    Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
    Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
    Oregon: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'],
    Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
    'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
    'South Carolina': ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
    'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
    Tennessee: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
    Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'],
    Utah: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
    Vermont: ['Burlington', 'Essex', 'South Burlington', 'Colchester', 'Rutland'],
    Virginia: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
    Washington: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
    'West Virginia': ['Charleston', 'Huntington', 'Parkersburg', 'Morgantown', 'Wheeling'],
    Wisconsin: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
    Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
  },
  Canada: {
    'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert'],
    'British Columbia': ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Abbotsford'],
    'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie'],
    'New Brunswick': ['Saint John', 'Moncton', 'Fredericton', 'Dieppe', 'Riverview'],
    'Newfoundland and Labrador': ['St. Johns', 'Mount Pearl', 'Corner Brook', 'Conception Bay South', 'Paradise'],
    'Northwest Territories': ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith', 'Behchokò'],
    'Nova Scotia': ['Halifax', 'Cape Breton', 'Dartmouth', 'Sydney', 'Truro'],
    'Nunavut': ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake', 'Cambridge Bay'],
    'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton'],
    'Prince Edward Island': ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil'],
    'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current'],
    'Yukon': ['Whitehorse', 'Dawson City', 'Watson Lake', 'Haines Junction', 'Mayo'],
  },
};

const weatherVariables = [
  { name: 'Temperature', color: '#FF4C29', icon: '🌡️', gradient: 'linear-gradient(135deg, #ef4444, #ea580c)' },
  { name: 'Precipitation', color: '#1E90FF', icon: '🌧️', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
  { name: 'Wind Speed', color: '#00CED1', icon: '💨', gradient: 'linear-gradient(135deg, #22d3ee, #14b8a6)' },
  { name: 'Air Quality', color: '#32CD32', icon: '👁️', gradient: 'linear-gradient(135deg, #4ade80, #10b981)' },
  { name: 'Dust Concentration', color: '#DAA520', icon: '☀️', gradient: 'linear-gradient(135deg, #eab308, #d97706)' },
  { name: 'Snowfall', color: '#87CEFA', icon: '❄️', gradient: 'linear-gradient(135deg, #93c5fd, #818cf8)' },
  { name: 'Cloud Cover', color: '#B0C4DE', icon: '☁️', gradient: 'linear-gradient(135deg, #94a3b8, #6b7280)' },
];

export default function App() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [selectedVariables, setSelectedVariables] = useState([]);
  const [weatherResult, setWeatherResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate floating particles for background
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 20 + 10,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const handleVariableToggle = (variable) => {
    setSelectedVariables((prev) =>
      prev.includes(variable)
        ? prev.filter((v) => v !== variable)
        : [...prev, variable]
    );
  };

  const handleSubmit = async () => {
    if (!country || !state || !city || !date || selectedVariables.length === 0) return;
    setIsLoading(true);
    
    // Simulate API call with loading animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const dummyConditions = {};
    selectedVariables.forEach((variable) => {
      dummyConditions[variable] = (Math.random() * 100).toFixed(1);
    });
    
    setWeatherResult({
      location: `${city}, ${state}, ${country}`,
      date,
      conditions: dummyConditions,
    });
    setIsLoading(false);
  };

  const handleDownload = (format) => {
    if (!weatherResult) return;

    let content;
    let filename = `weather_${weatherResult.location}_${weatherResult.date}`;
    if (format === 'csv') {
      content = 'Variable,Probability (%)\n';
      for (let variable in weatherResult.conditions) {
        content += `${variable},${weatherResult.conditions[variable]}\n`;
      }
      filename += '.csv';
      const blob = new Blob([content], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else if (format === 'json') {
      content = JSON.stringify(weatherResult, null, 2);
      filename += '.json';
      const blob = new Blob([content], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Particles */}
      <div style={styles.particlesContainer}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerCard}>
            <h1 style={styles.title}>NASA Weather Portal</h1>
            <div style={styles.statusIndicator}>
              <div style={styles.statusDot}></div>
              <p style={styles.subtitle}>Real-time atmospheric intelligence at your fingertips</p>
            </div>
          </div>
        </header>

        {/* Form Section */}
        <section style={styles.formSection}>
          <div style={styles.formCard}>
            <h2 style={styles.sectionTitle}>Configure Your Weather Query</h2>
            
            <div style={styles.formContent}>
              {/* Location Inputs */}
              <div style={styles.locationSection}>
                <div style={styles.locationRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>🌍 Country</label>
                    <input 
                      type="text"
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)}
                      style={styles.textInput}
                      placeholder="e.g., USA, Canada, Japan, Germany"
                      required
                    />
                  </div>
                </div>

                <div style={styles.locationRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>🏛️ State / Province / Region</label>
                    <input 
                      type="text"
                      value={state} 
                      onChange={(e) => setState(e.target.value)}
                      style={styles.textInput}
                      placeholder="e.g., California, Ontario, Tokyo, Bavaria"
                      required
                    />
                  </div>
                </div>

                <div style={styles.locationRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>🏙️ City</label>
                    <input 
                      type="text"
                      value={city} 
                      onChange={(e) => setCity(e.target.value)}
                      style={styles.textInput}
                      placeholder="e.g., San Francisco, Toronto, London, Munich"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date Selector */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  style={styles.dateInput}
                  required 
                />
              </div>

              {/* Weather Variables */}
              <div style={styles.variablesSection}>
                <label style={styles.label}>Select Weather Variables</label>
                <div style={styles.variablesGrid}>
                  {weatherVariables.map((variable) => {
                    const isSelected = selectedVariables.includes(variable.name);
                    
                    return (
                      <button
                        key={variable.name}
                        onClick={() => handleVariableToggle(variable.name)}
                        style={{
                          ...styles.variableButton,
                          background: isSelected ? variable.gradient : styles.variableButton.background,
                          borderColor: isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                          boxShadow: isSelected ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
                        }}
                      >
                        <div style={styles.variableContent}>
                          <span style={styles.variableIcon}>{variable.icon}</span>
                          <span style={styles.variableName}>{variable.name}</span>
                        </div>
                        {isSelected && <div style={styles.selectedOverlay}></div>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSubmit} 
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  opacity: isLoading ? 0.5 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {isLoading ? (
                  <div style={styles.loadingContent}>
                    <div style={styles.spinner}></div>
                    <span>Analyzing Atmospheric Data...</span>
                  </div>
                ) : (
                  'Generate Weather Probabilities'
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {weatherResult && (
          <section style={styles.resultsSection}>
            <div style={styles.resultsCard}>
              <div style={styles.resultsHeader}>
                <h2 style={styles.resultsTitle}>Weather Analysis Complete</h2>
                <p style={styles.resultsSubtitle}>
                  {weatherResult.location} • {weatherResult.date}
                </p>
              </div>

              {/* Probability Visualizations */}
              <div style={styles.resultsGrid}>
                {Object.entries(weatherResult.conditions).map(([variable, prob], index) => {
                  const variableData = weatherVariables.find((v) => v.name === variable);
                  
                  return (
                    <div 
                      key={variable} 
                      style={{
                        ...styles.resultCard,
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div style={styles.resultHeader}>
                        <div style={styles.resultInfo}>
                          <div style={{
                            ...styles.resultIcon,
                            background: variableData?.gradient || 'linear-gradient(135deg, #94a3b8, #6b7280)',
                          }}>
                            <span style={styles.resultIconEmoji}>{variableData?.icon || '☀️'}</span>
                          </div>
                          <span style={styles.resultVariable}>{variable}</span>
                        </div>
                        <span style={styles.resultPercentage}>{prob}%</span>
                      </div>
                      
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill,
                            width: `${prob}%`,
                            background: variableData?.gradient || 'linear-gradient(135deg, #94a3b8, #6b7280)',
                          }}
                        />
                        <div style={styles.progressShimmer}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download Buttons */}
              <div style={styles.downloadSection}>
                <button 
                  onClick={() => handleDownload('csv')}
                  style={styles.downloadButton}
                >
                  <span style={styles.downloadIcon}>📊</span>
                  <span>Download CSV</span>
                </button>
                <button 
                  onClick={() => handleDownload('json')}
                  style={styles.downloadButtonJson}
                >
                  <span style={styles.downloadIcon}>📋</span>
                  <span>Download JSON</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  particlesContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'white',
    animation: 'pulse 2s infinite',
  },
  orb1: {
    position: 'absolute',
    top: '80px',
    left: '80px',
    width: '288px',
    height: '288px',
    background: 'radial-gradient(circle, #8b5cf6, transparent)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    opacity: 0.2,
    animation: 'pulse 4s infinite',
  },
  orb2: {
    position: 'absolute',
    bottom: '80px',
    right: '80px',
    width: '288px',
    height: '288px',
    background: 'radial-gradient(circle, #06b6d4, transparent)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    opacity: 0.2,
    animation: 'pulse 4s infinite 2s',
  },
  orb3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '288px',
    height: '288px',
    background: 'radial-gradient(circle, #ec4899, transparent)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    opacity: 0.2,
    animation: 'pulse 4s infinite 1s',
    transform: 'translate(-50%, -50%)',
  },
  mainContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeIn 0.6s ease-out',
  },
  headerCard: {
    display: 'inline-block',
    padding: '2rem',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #22d3ee, #8b5cf6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#4ade80',
    borderRadius: '50%',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  },
  subtitle: {
    fontSize: '1.125rem',
    margin: 0,
  },
  formSection: {
    maxWidth: '800px',
    margin: '0 auto 3rem',
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  locationSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  locationRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  locationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    maxWidth: '400px',
    width: '100%',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  textInput: {
    width: '100%',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  dateInput: {
    width: '100%',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  variablesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  variablesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  variableButton: {
    position: 'relative',
    padding: '1rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    outline: 'none',
  },
  variableContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  variableIcon: {
    fontSize: '1.5rem',
  },
  variableName: {
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  selectedOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'pulse 2s infinite',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    color: 'white',
    fontWeight: '600',
    borderRadius: '16px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  loadingContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  resultsSection: {
    maxWidth: '1000px',
    margin: '0 auto',
    animation: 'fadeIn 0.6s ease-out',
  },
  resultsCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  resultsHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  resultsTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
  },
  resultsSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  resultCard: {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.5s ease',
    animation: 'slideIn 0.6s ease-out',
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  resultInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  resultIcon: {
    padding: '0.5rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultIconEmoji: {
    fontSize: '1.25rem',
  },
  resultVariable: {
    color: 'white',
    fontWeight: '500',
  },
  resultPercentage: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
  },
  progressBar: {
    position: 'relative',
    height: '12px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '6px',
    transition: 'width 1s ease-out',
  },
  progressShimmer: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    animation: 'shimmer 2s infinite',
  },
  downloadSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    fontWeight: '500',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  downloadButtonJson: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
    fontWeight: '500',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  downloadIcon: {
    fontSize: '1.125rem',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  
  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);