import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { next, usePlayerProgress } from "../store/slices/player";

export function Video() {
  const lesson = usePlayerProgress();

  const dispatch = useDispatch();

  const handlePlayNext = () => {
    dispatch(next());
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${lesson.currentLesson.id}`}
      />
    </div>
  );
}
