"use client";

import { ConnectionState } from "livekit-client";
import { Track } from "livekit-client";
import {
  useConnectionState,
  useTracks,
  useRemoteParticipant,
} from "@livekit/components-react";
import { OfflineVideo } from "./offline-video";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);
  let content;
  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <p>Loading...</p>;
  } else {
    content = <p>Live video</p>;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};
