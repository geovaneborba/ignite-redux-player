import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    course: {
      modules: [
        {
          id: "1",
          title: "Iniciando com React",
          lessons: [
            { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
            {
              id: "w-DW4DhDfcw",
              title: "Estilização do Post",
              duration: "10:05",
            },
            {
              id: "D83-55LUdKE",
              title: "Componente: Header",
              duration: "06:33",
            },
            {
              id: "W_ATsETujaY",
              title: "Componente: Sidebar",
              duration: "09:12",
            },
            { id: "Pj8dPeameYo", title: "CSS Global", duration: "03:23" },
            {
              id: "8KBq2vhwbac",
              title: "Form de comentários",
              duration: "11:34",
            },
          ],
        },
        {
          id: "2",
          title: "Estrutura da aplicação",
          lessons: [
            {
              id: "gE48FQXRZ_o",
              title: "Componente: Comment",
              duration: "13:45",
            },
            { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
            {
              id: "h5JA3wfuW1k",
              title: "Interações no JSX",
              duration: "06:33",
            },
            {
              id: "1G0vSTqWELg",
              title: "Utilizando estado",
              duration: "09:12",
            },
          ],
        },
      ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  },

  reducers: {
    play: (
      state,
      action: PayloadAction<{ moduleIndex: number; lessonIndex: number }>
    ) => {
      state.currentModuleIndex = action.payload.moduleIndex;
      state.currentLessonIndex = action.payload.lessonIndex;
    },

    next: (state) => {
      const currentModule = state.course.modules[state.currentModuleIndex];
      const currentLessonIndex = state.currentLessonIndex;

      //* Verifica se existe uma nova aula no módulo atual
      if (currentLessonIndex + 1 < currentModule.lessons.length) {
        state.currentLessonIndex += 1;
      } else {
        //* Verifica se existe um novo módulo
        if (state.currentModuleIndex + 1 < state.course.modules.length) {
          state.currentModuleIndex += 1; //* Muda para o próximo módulo
          state.currentLessonIndex = 0; //* Muda para a primeira aula do módulo
        } else {
          //* finalizou todas aulas
          console.log("No more lessons available.");
        }
      }
    },
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const usePlayerProgress = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentModule = state.player.course.modules[currentModuleIndex];
    const currentLesson = currentModule.lessons[currentLessonIndex];

    return {
      currentModule,
      currentLesson,
      currentModuleIndex,
      currentLessonIndex,
    };
  });
};
