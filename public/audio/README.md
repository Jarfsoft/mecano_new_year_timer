# Audio Files

Place your audio files in this folder.

## Required File

For the scheduled music player to work, you need to add:

**File name:** `un-ano-mas-mecano.mp3`
**Song:** "Un Año Más" by Mecano
**Duration:** 269 seconds (4 minutes 29 seconds)

## File Structure

```
public/
└── audio/
    ├── README.md
    └── un-ano-mas-mecano.mp3  ← Place your song file here
```

## Supported Formats

The HTML5 audio element supports:
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- AAC (.aac)

## File Size

For optimal performance, consider:
- Compressing the audio file to reduce size
- Using MP3 format for good compatibility
- Keeping file size under 10MB for faster loading

## Testing

Once you add the file, the application will automatically detect it and use it for the scheduled playback. 