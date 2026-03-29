import { useNavigate } from "react-router";
import s from "./BackButton.module.css";

type BackButtonProps = {
  label?: string;
  className?: string;
};

export const BackButton = ({ label = "Назад", className }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Если пользователь пришёл напрямую (история короткая) — откатимся на главную.
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <button type="button" className={`${s.button} ${className ?? ""}`} onClick={handleBack}>
      {label}
    </button>
  );
};

