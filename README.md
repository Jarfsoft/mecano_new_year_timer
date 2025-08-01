# Scheduled Music Player - Un Año Más

A React TypeScript application that automatically plays "Un Año Más" by Mecano at 23:56:25 on December 31st (any year). Perfect for New Year countdown events and celebrations.

## Live Demo

### [Another Year](http://another-year.netlify.app)

## Features

- **Scheduled Playback**: Automatically plays "Un Año Más" at 23:56:25 on December 31st
- **Smart Offset Calculation**: If the page loads after the scheduled time but within the song's duration, it starts playback from the appropriate timestamp
- **Real-time Countdown**: Shows a live countdown timer when waiting for the scheduled time
- **Responsive Design**: Works on desktop and mobile devices
- **Year-Agnostic**: Works every year automatically - no need to update the date
- **TypeScript**: Fully typed for better development experience and code safety

## How It Works

1. **Before Scheduled Time**: The app shows a countdown timer and waits
2. **At 23:56:25 on December 31st**: "Un Año Más" automatically starts playing
3. **Late Loading**: If you load the page after 23:56:25 but before the song ends (4:30 later), it starts from the correct offset
4. **After Song Duration**: The app shows that the scheduled time has passed

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add the song file**:
   Place "Un Año Más" by Mecano in `public/audio/un-ano-mas-mecano.mp3`

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Configuration

The app is pre-configured for "Un Año Más" by Mecano:

```typescript
export const CONFIG: Config = {
  // Automatically sets to next December 31st at 23:56:25
  SCHEDULED_TIME: getNextDecember31st(),
  
  // Song duration: 269 seconds and 653 milliseconds (4 minutes 29 seconds)
  SONG_DURATION: 269653,
  
  // Song file location
  SONG_URL: '/audio/un-ano-mas-mecano.mp3',
  
  // Song details
  SONG_TITLE: 'Un Año Más',
  ARTIST: 'Mecano',
  EVENT_TITLE: 'New Year Countdown - Un Año Más'
};
```

### Audio File Setup

1. **Get the song**: Obtain "Un Año Más" by Mecano (269 seconds duration)
2. **Rename it**: Save as `un-ano-mas-mecano.mp3`
3. **Place it**: Put the file in `public/audio/` folder
4. **Test it**: The app will automatically use the file

### File Structure

```
public/
└── audio/
    ├── README.md
    └── un-ano-mas-mecano.mp3  ← Your song file here
```

## TypeScript Features

- **Type Safety**: All components and functions are properly typed
- **Interface Definitions**: Clear interfaces for configuration and state
- **Type Guards**: Proper type checking for all data structures
- **IntelliSense**: Full IDE support with autocomplete and error detection

### Type Definitions

```typescript
interface Config {
  SCHEDULED_TIME: Date;
  SONG_DURATION: number;
  SONG_URL: string;
  SONG_TITLE: string;
  ARTIST: string;
  EVENT_TITLE: string;
}

type PlayerStatus = 'loading' | 'waiting' | 'playing' | 'expired' | 'error';
```

## Use Cases

- **New Year Countdown**: Perfect for playing "Un Año Más" at the traditional Spanish New Year time
- **Family Gatherings**: Synchronize the song across multiple devices
- **Live Events**: Use as background music for New Year celebrations
- **Personal Countdown**: Create your own New Year ritual

## Technical Details

- **React 19**: Latest React with hooks and functional components
- **TypeScript**: Full type safety and modern JavaScript features
- **React Hooks**: Uses `useState`, `useEffect`, and `useRef` for state management
- **Time Calculations**: Precise millisecond-level timing for accurate playback
- **Audio API**: Uses HTML5 `<audio>` element with programmatic control
- **Responsive CSS**: Modern styling with gradient backgrounds and card layouts
- **Auto-Year Detection**: Automatically calculates the next December 31st

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### TypeScript Configuration

The project uses a strict TypeScript configuration with:
- Strict type checking
- React JSX support
- Modern ES6+ features
- DOM type definitions

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Troubleshooting

### Audio Won't Play
- Ensure `un-ano-mas-mecano.mp3` is in the `public/audio/` folder
- Check that the file is not corrupted
- Ensure the browser allows autoplay (may require user interaction)

### Timing Issues
- The app uses the client's system time
- For precise timing, ensure the client's clock is synchronized
- The song will play at exactly 23:56:25 on December 31st

### TypeScript Errors
- Run `npm start` to see TypeScript compilation errors
- Check that all imports are properly typed
- Ensure all function parameters have proper type annotations

### Build for Production
```bash
npm run build
```

## Song Information

- **Title**: "Un Año Más"
- **Artist**: Mecano
- **Duration**: 269 seconds (4 minutes 29 seconds)
- **Release**: 1988
- **Genre**: Pop

## License

This project is open source and available under the MIT License.
