import { Header } from "@/common/components/Header/Header";
import { Routing } from "@/common/routing/Routing";
import s from "./App.module.css";
import { Footer } from "@/common/components/Footer/Footer";
import { ToastContainer } from 'react-toastify'
import { LinearProgress } from "@/common/components/LinearProgress/LinearProgress";
import { useGlobalLoading } from "@/common/hooks/useGlobalLoading";


function App() {
    const isGlobalLoading = useGlobalLoading()
  return (
    <div className={s.wrapper}>
      <Header />
      {isGlobalLoading && <LinearProgress />}

      <main className={s.main}>
        <Routing />
        <ToastContainer />
     
      </main>

      <footer className={s.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
