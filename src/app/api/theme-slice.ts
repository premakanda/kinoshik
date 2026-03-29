import { createSlice } from "@reduxjs/toolkit"

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: "dark" as ThemeMode,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
})

export const { selectThemeMode} = themeSlice.selectors
export const { changeThemeModeAC } = themeSlice.actions
export const themeReducer = themeSlice.reducer

export type ThemeMode = "dark" | "light"
