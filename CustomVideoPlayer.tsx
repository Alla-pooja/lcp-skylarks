import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import CustomIconButton from "./CustomIconButton";

const MAX_VIDEO_LENGTH_DURATION_IN_SEC = 15 * 60;

interface VideoDetailPlayerProps {
  hlsStreamUrl: string;
  streamUrl?: string;
  showPlayerControls?: boolean;
  isFullScreen?: boolean;
  refreshIntervalInSec?: number;
  thumbnail?: string;
  height?: string;
}

const CustomVideoPlayer: React.FC<VideoDetailPlayerProps> = ({ hlsStreamUrl, refreshIntervalInSec = 5, thumbnail, height }) => {
  const theme = useTheme();
  const playerRef = useRef<any>(null);

  const [playing, setPlaying] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [url, setUrl] = useState(hlsStreamUrl);
  const [videoStartTime] = useState(() => {
    const currentDatetime = new Date();
    currentDatetime.setMinutes(currentDatetime.getMinutes() - 15);
    return currentDatetime;
  }); // Initialize with the current time
  const [videoEndTime, setVideoEndTime] = useState(new Date()); // Initialize with the current time

  useEffect(() => {
    // Call on first render
    const interval = setInterval(() => {
      const newDate = new Date();
      setVideoEndTime(newDate);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //   useEffect(() => {
  //     function fireOnVideoEnd() {
  //       setUrl("");
  //       setTimeout(() => {
  //         setUrl(hlsStreamUrl);
  //       }, 1000);
  //     }
  //     playerRef?.current?.addEventListener("ended", fireOnVideoEnd, true);
  //     return () => {
  //       playerRef?.current?.removeEventListener("ended", fireOnVideoEnd);
  //     };
  //   }, [playerRef, hlsStreamUrl]);

  useEffect(() => {
    if (isRetrying) {
      const refreshTimer = setTimeout(() => {
        setIsRetrying(false);
      }, refreshIntervalInSec * 1000);

      return () => {
        clearTimeout(refreshTimer);
      };
    }
  }, [isRetrying, refreshIntervalInSec]);

  const handlePlay = () => {
    if (playerRef?.current) {
      setPlaying(true);
      // playerRef.current.play();
    }
  };

  const handlePause = () => {
    if (playerRef?.current) {
      setPlaying(false);
      //   playerRef?.current?.pause();
    }
  };

  const handleVideoEnded = () => {
    if (playerRef.current) {
      //   playerRef?.current?.pause(); // Start playing again when video ends
    }
  };

  const handleTimeUpdate = () => {
    // if (playerRef.current) {
    //   const loopDuration = 2; // Time (in seconds) before the end to initiate looping
    //   if (!isDragging && playerRef?.current?.duration - playerRef?.current?.currentTime <= loopDuration) {
    //     playerRef.current.currentTime = 0; // Seek to the beginning for looping
    //     setCurrentTime(playerRef.current.currentTime);
    //   }
    // }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && playerRef.current) {
        // setCurrentTime(playerRef.current.currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleLoadedMetadata = () => {
    const video = playerRef.current;
    if (!video) return;
  };
  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;
  }, [playerRef.current !== null]);

  return (
    <Box
      sx={{
        position: "relative",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <>
        <ReactPlayer
          ref={playerRef}
          autoPlay={true}
          playing
          width="100%"
          height={height || "221px"}
          url={url}
          muted={muted}
          onReady={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={(e: any) => {
            if (e.target.duration >= MAX_VIDEO_LENGTH_DURATION_IN_SEC) {
              setDuration(MAX_VIDEO_LENGTH_DURATION_IN_SEC);
            } else {
              setDuration(e.target.duration);
            }
          }}
          light={<img src={thumbnail} alt="thumbnail" height={height || "221px"} width="100%" style={{ borderRadius: "4px" }} />}
          playIcon={
            <CustomIconButton
              sx={{
                borderRadius: "50%",
                position: "absolute",
                width: "50px",
                height: "50px",
                border: "none",
                background: `${theme.palette.text.titleLabel}4D`,
                "&:hover": {
                  background: `${theme.palette.text.titleLabel}4D`,
                },
              }}
            >
              <PlayArrowIcon sx={{ fontSize: "40px" }} onClick={handlePlay} />
            </CustomIconButton>
          }
        />
      </>
    </Box>
  );
};

export default CustomVideoPlayer;
