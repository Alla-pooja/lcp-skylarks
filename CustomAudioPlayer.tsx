import Forward30Icon from "@mui/icons-material/Forward30";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Replay30Icon from "@mui/icons-material/Replay30";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AudioSlider, { CustomAudioSlider } from "./AudioSlider";
import CustomIconButton from "./CustomIconButton";
import VideoAnalytics from "./CustomVideoAnalytics";
import VideoSeekingSlider, { CustomSliderThumb } from "./VideoSeeker";

interface AudioProps {
  url: string;
}

export default function CustomAudioPlayer({ url }: AudioProps) {
  const theme = useTheme();

  const audioRef = useRef<any>(null);

  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleVolumeChange = (value: any) => {
    setVolume(parseFloat(value));
    if (value <= 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const palyAudio = () => {
    setPlaying(true);

    if (audioRef?.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    setPlaying(false);
    if (audioRef?.current) {
      audioRef.current.pause();
    }
  };

  const handleSeekBackChange = () => {
    audioRef.current.currentTime = audioRef.current.currentTime - 1;
  };
  const handleSeekForwardChange = () => {
    audioRef.current.currentTime = audioRef.current.currentTime + 1;
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSliderDragStart = () => {
    setIsDragging(true);
  };

  const handleSliderDragEnd = () => {
    setIsDragging(false);
  };

  const handleVideoEnded = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Start playing again when video ends
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const loopDuration = 2; // Time (in seconds) before the end to initiate looping
      if (isDragging && audioRef.current.duration - audioRef.current.currentTime <= loopDuration) {
        audioRef.current.currentTime = 0; // Seek to the beginning for looping
        setCurrentTime(audioRef.current.currentTime);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        display: "flex",
        gap: 1,
      }}
    >
      <CustomIconButton
        onClick={handleSeekBackChange}
        sx={{
          color: theme.palette.primary.main,
          borderRadius: "2px",
          minWidth: "1.8rem",
          width: "1.8rem",
          height: "1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Replay30Icon sx={{ fontSize: "1.2em" }} />
      </CustomIconButton>
      <CustomIconButton
        sx={{
          color: theme.palette.primary.main,
          borderRadius: "2px",
          minWidth: "1.8rem",
          width: "1.8rem",
          height: "1.8rem",
        }}
      >
        {playing ? <PauseIcon onClick={pauseAudio} sx={{ fontSize: "1.2em" }} /> : <PlayArrowIcon onClick={palyAudio} sx={{ fontSize: "1.2em" }} />}
      </CustomIconButton>
      <CustomIconButton
        onClick={handleSeekForwardChange}
        sx={{
          color: theme.palette.primary.main,
          borderRadius: "2px",
          minWidth: "1.8rem",
          width: "1.8rem",
          height: "1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Forward30Icon sx={{ fontSize: "1.2em" }} />
      </CustomIconButton>
      <audio ref={audioRef} src={url} muted={muted} onEnded={handleVideoEnded} onTimeUpdate={handleTimeUpdate} />
      <Box
        sx={{
          position: "relative",
          background: theme.palette.background.default,
          boxShadow: "inset -2px -2px 3px #282F47, inset 2px 2px 16px #0E0E0F",
          borderRadius: "3px",
          height: "1.8rem",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: "-3px",
            left: "-6px",
            zIndex: 0,
            opacity: 0.4,
          }}
        >
          <VideoAnalytics
            data={[
              2.3, 2.1, 4.0, 5.1, 4.0, 3.6, 3.2, 2.3, 1.4, 1.8, 1.5, 1.2, 1.5, 1.2, 1.2, 1.5, 1.2, 2.3, 2.1, 3.6, 3.2, 2.3, 3.6, 3.2, 2.3, 3.6, 3.2,
              2.3, 1.2, 1.5, 1.2, 2.3, 2.1, 3.6, 3.2, 2.3, 3.6, 3.2, 2.3, 3.6, 3.2, 2.3, 3.6, 3.2, 2.3, 3.6, 3.2, 2.3, 3.6, 3.2, 2.3,
            ]}
          />
          <CustomSliderThumb
            step={0.1}
            sx={{
              "& .MuiSlider-thumb": {
                height: { xs: 28, xl: 30 },
                background: "linear-gradient(180deg, rgb(228 46 1 / 78%) 0%, rgba(228, 46, 1, 0) 71.87%)",
                borderRadius: "0.2px",
                top: "35px",
                "&:hover": {
                  boxShadow: "none",
                },
                "& .seeker-bar": {
                  backgroundColor: "currentColor",
                  marginLeft: "20px",
                  marginRight: 0,
                  display: "none",
                },
              },
              left: "10px",
              top: "-16px",
              width: "95%",
              position: "absolute",
            }}
            slots={{ thumb: VideoSeekingSlider }}
            value={currentTime}
            min={0}
            max={audioRef?.current?.duration || 0}
            onChange={handleSliderChange}
            onMouseDown={handleSliderDragStart}
            onMouseUp={handleSliderDragEnd}
          />
        </Box>
      </Box>
      <Box display="flex" width="20%" flexDirection="row">
        {muted ? (
          <VolumeOffIcon sx={{ color: theme.palette.text.default, mr: "5px", mt: 0.4, fontSize: "1em" }} />
        ) : (
          <VolumeUpIcon sx={{ color: theme.palette.text.default, mr: "5px", mt: 0.4, fontSize: "1em" }} />
        )}
        <CustomAudioSlider
          sx={{
            "&.MuiSlider-root": {
              padding: "12px 0",
            },
          }}
          name="volume"
          slots={{ thumb: AudioSlider }}
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e, v) => handleVolumeChange(v)}
        />
      </Box>
    </Box>
  );
}
