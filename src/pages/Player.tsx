import { MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useAppDispatch, useAppSelector } from "../store";
import { loadCourse, usePlayerProgress } from "../store/slices/player";
import { useEffect } from "react";

export function Player() {
  /**
   ** useSelector: o selector só vai re-renderizar o componente
   ** caso mudar alguma informação do modules
   */
  const modules = useAppSelector((state) => state.player.course?.modules);
  const { currentLesson } = usePlayerProgress();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`;
  }, [currentLesson?.title]);

  useEffect(() => {
    dispatch(loadCourse());
  }, [dispatch]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6 ">
        <div className="flex items-center justify-between ">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="h-4 w-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules?.map((module, index) => (
              <Module
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOfLesson={module.lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
