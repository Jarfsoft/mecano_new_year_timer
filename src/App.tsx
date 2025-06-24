import React, { useState } from 'react';
import './App.css';
import ScheduledMusicPlayer from './components/ScheduledMusicPlayer';

const App: React.FC = () => {
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
                <button className="close-modal-button" onClick={closeNewYearModal}>
                  ✕ Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 