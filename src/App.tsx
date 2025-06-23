import React from 'react';
import './App.css';
import ScheduledMusicPlayer from './components/ScheduledMusicPlayer';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Scheduled Music Player</h1>
        <ScheduledMusicPlayer />
      </header>
    </div>
  );
};

export default App; 