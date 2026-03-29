
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect } from "react";
import s from "./switch.module.css"
import { changeThemeModeAC, selectThemeMode } from "@/app/api/theme-slice";


export const Switch = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  // При монтировании компонента загружаем тему из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") as "light" | "dark" | null;
    if (savedTheme && savedTheme !== themeMode) {
      dispatch(changeThemeModeAC({ themeMode: savedTheme }));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    document.body.className = themeMode;
  }, [themeMode]);


 

 const toggleTheme = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }


  return (
    <div>
      <button onClick={toggleTheme} className={s.themeButton}>
        {themeMode === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
};
