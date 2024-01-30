"use client";

import { Participant, Track } from "livekit-client";
import { useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl } from "./full-screen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div ref={wrapperRef} className="relative h-full">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl onChange={() => {}} value={0} onToggle={() => {}} />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
