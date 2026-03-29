import { Link } from 'react-router'
import s from './PageNotFound.module.css'
 
export const PageNotFound = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subtitle}>Page not found. We can’t find what you’re looking for</h2>
      <div className={s.linkWrap}>
      <Link to={"/"} className={s.link}>
              Main Page
            </Link>
            </div>
    </>
  )
}