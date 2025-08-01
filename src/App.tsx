import React, { useState } from 'react';
import './App.css';
import ScheduledMusicPlayer from './components/ScheduledMusicPlayer';

const App: React.FC = () => {
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const [showNewYearModal, setShowNewYearModal] = useState<boolean>(false);
  const [showFelizAnoNuevo, setShowFelizAnoNuevo] = useState<boolean>(false);
  const [newYearCountdown, setNewYearCountdown] = useState<number>(0);

  const handleNewYearModalChange = (showModal: boolean, showFelizAnoNuevo: boolean, countdown: number): void => {
    setShowNewYearModal(showModal);
    setShowFelizAnoNuevo(showFelizAnoNuevo);
    setNewYearCountdown(countdown);
  };

  const closeNewYearModal = (): void => {
    setShowNewYearModal(false);
    setShowFelizAnoNuevo(false);
  };

  const handleStartClick = async (): Promise<void> => {
    // Create a silent audio context to unlock autoplay
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      
      await audioContext.close();
    } catch (error) {
      console.log('Audio context initialization failed:', error);
    }
    
    setHasUserInteracted(true);
  };

  if (!hasUserInteracted) {
    return (
      <div className="App">
        <div className="welcome-screen">
          <div className="welcome-container">
            <h1>🎵 Un Año Más - Countdown Timer</h1>
            <p className="welcome-description">
              Bienvenido al contador de Año Nuevo con "Un Año Más" de Mecano
            </p>
            <p className="welcome-description-en">
              Welcome to the New Year countdown with "Un Año Más" by Mecano
            </p>
            <div className="welcome-info">
              <p>📅 Se reproducirá automáticamente el 31 de diciembre a las 23:56:25</p>
              <p>🎶 Duración: 4 minutos y 29 segundos</p>
              <p>🎆 Incluye cuenta regresiva de Año Nuevo</p>
            </div>
            <button className="start-button" onClick={handleStartClick}>
              🚀 Comenzar / Start
            </button>
            <p className="interaction-note">
              * Haz clic para habilitar la reproducción automática
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Scheduled Music Player</h1>
        <ScheduledMusicPlayer onNewYearModalChange={handleNewYearModalChange} />
      </header>

      {/* New Year Modal */}
      {showNewYearModal && (
        <div className="new-year-modal">
          <div className="modal-overlay" onClick={showFelizAnoNuevo ? closeNewYearModal : undefined}>
            {!showFelizAnoNuevo ? (
              <div className="countdown-container">
                <div className="modal-countdown">
                  {newYearCountdown}
                </div>
              </div>
            ) : (
              <div className="feliz-ano-nuevo-container">
                <div className="fireworks-background">
                  <img 
                    src="/images/fireworks.webp" 
                    alt="Fireworks celebration"
                    className="fireworks-image"
                  />
                </div>
                <div className="feliz-ano-nuevo">
                  ¡Feliz Año Nuevo!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 