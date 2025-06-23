import { Config, SetScheduledTimeFunction } from './types';

// Configuration for the Scheduled Music Player
// Modify these values to customize your scheduled music event

export const CONFIG: Config = {
  // Set your desired scheduled time (format: 'YYYY-MM-DDTHH:MM:SS')
  // This will play every year on December 31st at 23:56:26
  SCHEDULED_TIME: getNextDecember31st(),
  
  // Song duration in milliseconds (269 seconds = 269000 milliseconds)
  SONG_DURATION: 269000,
  
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

// Helper function to get the next December 31st at 23:56:26
function getNextDecember31st(): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Create December 31st of current year at 23:56:26
  let targetDate = new Date(currentYear, 11, 31, 23, 56, 26);
  
  // If we've already passed this year's December 31st, use next year
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, 11, 31, 23, 56, 26);
  }
  
  return targetDate;
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