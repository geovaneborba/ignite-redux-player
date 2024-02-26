import { create } from "zustand";
import { api } from "../lib/axios";

type PlayAction = {
  moduleIndex: number;
  lessonIndex: number;
};

type Course = {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
};

type PlayerState = {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  play: ({ lessonIndex, moduleIndex }: PlayAction) => void;
  next: () => void;
  load: () => Promise<void>;
};

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({
        isLoading: true,
      });

      const response = await api.get("/courses/1");

      // fake fetch delay for loading courses
      await new Promise((resolve) => setTimeout(resolve, 700));

      set({
        course: response.data,
        isLoading: false,
      });
    },

    play: ({ moduleIndex, lessonIndex }: PlayAction) => {
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },

    next: () => {
      const { currentLessonIndex, course, currentModuleIndex } = get();

      const currentModule = course?.modules[currentModuleIndex];

      if (currentModule && course) {
        //* Verifica se existe uma nova aula no módulo atual
        if (currentLessonIndex + 1 < currentModule.lessons.length) {
          set({
            currentLessonIndex: currentLessonIndex + 1,
          });
        } else {
          //* Verifica se existe um novo módulo
          if (currentModuleIndex + 1 < course.modules.length) {
            set({
              currentModuleIndex: currentModuleIndex + 1, //* Muda para o próximo módulo
              currentLessonIndex: 0, //* Muda para a primeira aula do módulo
            });
          } else {
            //* finalizou todas aulas
            console.log("No more lessons available.");
          }
        }
      }
    },
  };
});

export const usePlayerProgress = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state;

    const currentModule = state.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return {
      currentModule,
      currentLesson,
    };
  });
};
