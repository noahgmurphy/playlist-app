import logo from './logo.svg';
import './App.css';
import TrackList from './Tracklist/Tracklist';
import Playlist from '/Users/noah/Desktop/SpotifyPlaylist/jammming/src/Playlist/Playlist.js';
import SearchResults from './SearchResults/SearchResults.js'
import TokenAndPermissions from '/Users/noah/Desktop/SpotifyPlaylist/jammming/src/APIhandling/TokenAndPermission.js';


function App() {
  return (
    <div className="App">
      <TokenAndPermissions/>
      
    </div>
  );
}

export default App;
