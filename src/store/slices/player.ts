import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

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
};

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");

  // fake fetch delay for loading courses
  await new Promise((resolve) => setTimeout(resolve, 700));

  return response.data;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (
      state,
      action: PayloadAction<{ moduleIndex: number; lessonIndex: number }>
    ) => {
      state.currentModuleIndex = action.payload.moduleIndex;
      state.currentLessonIndex = action.payload.lessonIndex;
    },

    next: (state) => {
      const currentModule = state.course?.modules[state.currentModuleIndex];
      const currentLessonIndex = state.currentLessonIndex;

      if (currentModule && state.course) {
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
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const usePlayerProgress = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex, isLoading } = state.player;

    const currentModule = state.player.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return {
      currentModule,
      currentLesson,
      currentModuleIndex,
      currentLessonIndex,
      isLoading,
    };
  });
};
