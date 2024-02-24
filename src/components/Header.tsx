import { usePlayerProgress } from "../store/slices/player";

export function Header() {
  const { currentModule, currentLesson } = usePlayerProgress();

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
