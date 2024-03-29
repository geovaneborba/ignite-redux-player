import { useAppSelector } from "../store";
import { usePlayerProgress } from "../store/slices/player";

export function Header() {
  const { currentModule, currentLesson } = usePlayerProgress();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  if (isCourseLoading) {
    return (
      <div className="animate-pulse flex flex-col gap-y-2">
        <div className="h-2 w-24 bg-zinc-800 rounded-full "></div>
        <div className="h-2 w-48 bg-zinc-800 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {currentLesson && currentModule && (
        <>
          <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
          <span className="text-sm text-zinc-400">
            Módulo "{currentModule.title}"
          </span>
        </>
      )}
    </div>
  );
}
