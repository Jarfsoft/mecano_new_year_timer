import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { PlayerStatus } from '../types';

interface ScheduledMusicPlayerProps {
  onNewYearModalChange?: (showModal: boolean, showFelizAnoNuevo: boolean, countdown: number) => void;
}

const ScheduledMusicPlayer: React.FC<ScheduledMusicPlayerProps> = ({ onNewYearModalChange }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [status, setStatus] = useState<PlayerStatus>('loading');
  const [timeUntilPlay, setTimeUntilPlay] = useState<number | null>(null);
  const [playbackOffset, setPlaybackOffset] = useState<number>(0);
  const [showPlayButton, setShowPlayButton] = useState<boolean>(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownAlertRef = useRef<boolean>(false);

  // Get configuration values
  const { SCHEDULED_TIME, SONG_DURATION, SONG_URL, SONG_TITLE, ARTIST, EVENT_TITLE } = CONFIG;

  // Show one-time alert on component mount
  useEffect(() => {
    if (!hasShownAlertRef.current) {
      alert('Nota: Tu navegador podría bloquear la reproducción automática. Si la canción no empieza, toca el botón de reproducir; se retomará desde el punto correcto.\n\nNote: Your browser may block automatic playback. If the song doesn\'t start, please tap play—it\'ll resume from the right moment.');
      hasShownAlertRef.current = true;
    }
  }, []);

  const playAudio = async (offset: number = 0): Promise<void> => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = offset / 1000; // Convert to seconds
        await audioRef.current.play();
        setAutoplayBlocked(false);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Error playing audio:', error);
        if (error instanceof Error && error.name === 'NotAllowedError') {
          setAutoplayBlocked(true);
          setShowPlayButton(true);
        } else {
          setStatus('error');
        }
      }
    }
  };

  const handleUserPlay = (): void => {
    playAudio(playbackOffset);
  };

  useEffect(() => {
    const checkTimeAndPlay = (): void => {
      const now = new Date();
      setCurrentTime(now);

      const timeDiff = SCHEDULED_TIME.getTime() - now.getTime();
      const songEndTime = SCHEDULED_TIME.getTime() + SONG_DURATION;
      
      // Calculate time until New Year (midnight)
      const newYearTime = new Date(SCHEDULED_TIME.getFullYear() + 1, 0, 1, 0, 0, 0);
      const timeUntilNewYear = newYearTime.getTime() - now.getTime();

      // Notify parent component about modal state
      if (onNewYearModalChange) {
        if (timeUntilNewYear > 0 && timeUntilNewYear <= 10000) {
          // Show modal in the last 10 seconds before New Year
          onNewYearModalChange(true, false, Math.ceil(timeUntilNewYear / 1000));
        } else if (timeUntilNewYear <= 0 && timeUntilNewYear > -57000) {
          // Show "Feliz Año Nuevo" for 57 seconds after New Year
          onNewYearModalChange(true, true, 0);
        } else if (timeUntilNewYear <= -57000) {
          // Auto-close modal after 57 seconds of "Feliz Año Nuevo"
          onNewYearModalChange(false, false, 0);
        }
      }

      if (timeDiff > 0) {
        // Before scheduled time - wait
        setStatus('waiting');
        setTimeUntilPlay(timeDiff);
        setPlaybackOffset(0);
        setShowPlayButton(false);
        setAutoplayBlocked(false);
      } else if (now.getTime() <= songEndTime) {
        // Within song duration - play from appropriate offset
        const offset = Math.abs(timeDiff);
        setStatus('playing');
        setTimeUntilPlay(0);
        setPlaybackOffset(offset);
        
        if (audioRef.current && audioRef.current.paused) {
          playAudio(offset);
        }
      } else {
        // After song duration - don't play
        setStatus('expired');
        setTimeUntilPlay(0);
        setPlaybackOffset(0);
        setShowPlayButton(false);
        setAutoplayBlocked(false);
      }
    };

    // Initial check
    checkTimeAndPlay();

    // Set up interval to check time every second
    intervalRef.current = setInterval(checkTimeAndPlay, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [SCHEDULED_TIME, SONG_DURATION, onNewYearModalChange]);

  const formatTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return '00:00:00:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    if (days > 0) {
      return `${days.toString().padStart(2, '0')} Days, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusMessage = (): string => {
    switch (status) {
      case 'loading':
        return 'Loading...';
      case 'waiting':
        return `Waiting for scheduled time...`;
      case 'playing':
        if (autoplayBlocked) {
          return `Ready to play ${SONG_TITLE} by ${ARTIST} (started ${formatTime(playbackOffset)} into the track) - Click to play`;
        }
        return `Playing ${SONG_TITLE} by ${ARTIST} (started ${formatTime(playbackOffset)} into the track)`;
      case 'expired':
        return 'Scheduled time has passed and song duration has elapsed';
      case 'error':
        return 'Error playing audio';
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = (): string => {
    switch (status) {
      case 'waiting':
        return 'text-blue-600';
      case 'playing':
        return autoplayBlocked ? 'text-orange-600' : 'text-green-600';
      case 'expired':
        return 'text-gray-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="scheduled-music-player">
      <div className="player-container">
        <div className="info-section">
          <h2>{EVENT_TITLE || 'Music Schedule'}</h2>
          <div className="schedule-info">
            <p><strong>Scheduled Time:</strong> {formatDateTime(SCHEDULED_TIME)}</p>
            <p><strong>Song:</strong> {SONG_TITLE} by {ARTIST}</p>
            <p><strong>Song Duration:</strong> {formatTime(SONG_DURATION)}</p>
            <p><strong>Current Time:</strong> {formatDateTime(currentTime)}</p>
          </div>
        </div>

        <div className="status-section">
          <div className={`status-message ${getStatusColor()}`}>
            {getStatusMessage()}
          </div>
          
          {status === 'waiting' && timeUntilPlay && (
            <div className="countdown">
              <h3>Time Remaining:</h3>
              <div className="countdown-timer">{formatTime(timeUntilPlay)}</div>
            </div>
          )}

          {status === 'playing' && !autoplayBlocked && (
            <div className="playback-info">
              <p>Song is playing automatically</p>
              {playbackOffset > 0 && (
                <p>Started {formatTime(playbackOffset)} into the track</p>
              )}
            </div>
          )}

          {autoplayBlocked && showPlayButton && (
            <div className="autoplay-blocked">
              <p className="autoplay-message">
                🎵 Your browser blocked autoplay. Click the button below to start the song:
              </p>
              <button 
                className="play-button"
                onClick={handleUserPlay}
              >
                ▶️ Play {SONG_TITLE}
              </button>
            </div>
          )}
        </div>

        <div className="audio-section">
          {
            status === 'playing' ?
              <audio
                ref={audioRef}
                src={SONG_URL}
                controls
              />
            :
              <p className="audio-note">
                Audio controls will appear when the song starts playing
              </p>
          }
        </div>
      </div>
    </div>
  );
};

export default ScheduledMusicPlayer; 