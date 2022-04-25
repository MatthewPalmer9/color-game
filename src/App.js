import ColorGame from './components/ColorGame';
import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <ColorGame />
      <div className="creator-credit">
        <h1>Created by MattPDev</h1>
        <div className="socials">
          <ul>
            <a href="https://linkedin.com/in/mattpdev" target="_blank" rel="noreferrer">
              <li><ion-icon name="logo-linkedin"></ion-icon></li>
            </a>
            <a href="https://twitter.com/mattpdev" target="_blank" rel="noreferrer">
              <li><ion-icon name="logo-twitter"></ion-icon></li>
            </a>
            <a href="https://github.com/matthewpalmer9" target="_blank" rel="noreferrer">
              <li><ion-icon name="logo-github"></ion-icon></li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
