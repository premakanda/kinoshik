import logo from "@/assets/logo.svg"
import { Path } from "@/common/routing/Routing";
import { Link } from "react-router";

export const Logo = () => {
  return (
    <div>
        <Link to={Path.Main}><img src={logo} width={230}  alt="Логотип" /></Link>
      
    </div>
  );
};
