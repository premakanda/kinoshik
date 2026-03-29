
import s from './Header.module.css'
import { NavLink } from 'react-router'
import { Switch } from '../Switch/Switch'
import { Logo } from '../Logo/Logo'
import { Path } from '@/common/routing/Routing'
 
const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.Category, label: 'Category movies' },
  { to: Path.Filtered, label: 'Filtered movies' },
  { to: Path.Search, label: 'Search' },
  { to: Path.Favorites, label: 'Favorites' },
]
 
export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
            <Logo/>
      <nav>
        <ul className={s.list}>
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `${s.link} ${isActive ? s.activeLink : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Switch/>
      </div>
    </header>
  )
}