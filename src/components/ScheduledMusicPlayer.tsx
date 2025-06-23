import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { PlayerStatus } from '../types';

const ScheduledMusicPlayer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [status, setStatus] = useState<PlayerStatus>('loading');
  const [timeUntilPlay, setTimeUntilPlay] = useState<number | null>(null);
  const [playbackOffset, setPlaybackOffset] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get configuration values
  const { SCHEDULED_TIME, SONG_DURATION, SONG_URL, SONG_TITLE, ARTIST, EVENT_TITLE } = CONFIG;

  useEffect(() => {
    const checkTimeAndPlay = (): void => {
      const now = new Date();
      setCurrentTime(now);

      const timeDiff = SCHEDULED_TIME.getTime() - now.getTime();
      const songEndTime = SCHEDULED_TIME.getTime() + SONG_DURATION;

      if (timeDiff > 0) {
        // Before scheduled time - wait
        setStatus('waiting');
        setTimeUntilPlay(timeDiff);
        setPlaybackOffset(0);
      } else if (now.getTime() <= songEndTime) {
        // Within song duration - play from appropriate offset
        const offset = Math.abs(timeDiff);
        setStatus('playing');
        setTimeUntilPlay(0);
        setPlaybackOffset(offset);
        
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.currentTime = offset / 1000; // Convert to seconds
          audioRef.current.play().catch((error: Error) => {
            console.error('Error playing audio:', error);
            setStatus('error');
          });
        }
      } else {
        // After song duration - don't play
        setStatus('expired');
        setTimeUntilPlay(0);
        setPlaybackOffset(0);
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
  }, [SCHEDULED_TIME, SONG_DURATION]);

  const formatTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return '00:00:00';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        return 'text-green-600';
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

          {status === 'playing' && (
            <div className="playback-info">
              <p>Song is playing automatically</p>
              {playbackOffset > 0 && (
                <p>Started {formatTime(playbackOffset)} into the track</p>
              )}
            </div>
          )}
        </div>

        <div className="audio-section">
          <audio
            ref={audioRef}
            src={SONG_URL}
            controls
            style={{ display: status === 'playing' ? 'block' : 'none' }}
          />
          <p className="audio-note">
            Audio controls will appear when the song starts playing
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduledMusicPlayer; 