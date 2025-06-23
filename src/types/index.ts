// Type definitions for the Scheduled Music Player

export interface Config {
  SCHEDULED_TIME: Date;
  SONG_DURATION: number;
  SONG_URL: string;
  SONG_TITLE: string;
  ARTIST: string;
  EVENT_TITLE: string;
}

export type PlayerStatus = 'loading' | 'waiting' | 'playing' | 'expired' | 'error';

export interface ScheduledMusicPlayerState {
  currentTime: Date;
  status: PlayerStatus;
  timeUntilPlay: number | null;
  playbackOffset: number;
}

// Helper function type for setting scheduled time
export type SetScheduledTimeFunction = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second?: number
) => Date; 