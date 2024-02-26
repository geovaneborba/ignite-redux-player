import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { usePlayerProgress, useStore } from "../store";

export function Video() {
  const { currentLesson } = usePlayerProgress();
  const { isLoading, next } = useStore();

  const handlePlayNext = () => {
    next();
  };

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-950 aspect-video">
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 text-zinc-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
      />
    </div>
  );
}
