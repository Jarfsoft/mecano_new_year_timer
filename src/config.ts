import { Config, SetScheduledTimeFunction } from './types';

// Configuration for the Scheduled Music Player
// Modify these values to customize your scheduled music event

const _SONG_DURATION = 269653;
const TARGET_TIMESTAMP_MS = 214400;

export const CONFIG: Config = {
  // Set your desired scheduled time (format: 'YYYY-MM-DDTHH:MM:SS')
  // This will play every year on December 31st at 23:56:25
  SCHEDULED_TIME: getNextDecember31st(),
  
  // Song duration in milliseconds (269 seconds with 653 milliseconds = 269653 milliseconds)
  SONG_DURATION: _SONG_DURATION,
  
  // URL to your audio file
  // The song "Un Año Más" by Mecano should be placed in public/audio/
  SONG_URL: '/audio/un-ano-mas-mecano.mp3',
  
  // Song title for display
  SONG_TITLE: 'Un Año Más',
  
  // Artist name
  ARTIST: 'Mecano',
  
  // Event title
  EVENT_TITLE: 'New Year Countdown - Un Año Más'
};

// Helper function to get the next December 31st, with the target time of the song before midnight
function getNextDecember31st(): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Create December 31st of current year, with the target time of the song before midnight
  let targetDate = new Date(currentYear, 5, 27, 8, 0, 0).getTime() - TARGET_TIMESTAMP_MS;
  // If we've already passed this year's December 31st, use next year
  if (now.getTime() > (targetDate + _SONG_DURATION)) {
    targetDate = new Date(currentYear + 1, 5, 27, 8, 0, 0).getTime() - TARGET_TIMESTAMP_MS;
  }
  
  return new Date(targetDate);
}

// Helper function to set scheduled time easily
export const setScheduledTime: SetScheduledTimeFunction = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number = 0
): Date => {
  return new Date(year, month - 1, day, hour, minute, second);
};

// Example usage:
// SCHEDULED_TIME: setScheduledTime(2024, 12, 31, 23, 56, 26) // December 31st at 23:56:26
// SCHEDULED_TIME: setScheduledTime(2024, 1, 1, 0, 0, 0) // New Year's Day
// SCHEDULED_TIME: setScheduledTime(2024, 7, 4, 20, 0, 0) // July 4th at 8 PM 