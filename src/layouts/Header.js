import { Menu, Icon } from 'antd'
import Link from 'umi/link'

const MENUS = [
  { path: '/', icon: 'home', text: 'Home' },
  { path: '/dashboard', icon: 'laptop', text: 'Dashboard' },
  { path: '/about', icon: 'appstore-o', text: 'About' },
  { path: '/github', icon: 'code-o', text: 'Source Code' },
]

const Header = ({ location }) => (
  <Menu selectedKeys={[location.pathname]} mode="horizontal" style={{ overflow: 'hidden' }}>
    {MENUS.map(menu => (
      <Menu.Item key={menu.path}>
        {menu.path === '/github' ? (
          <a href="https://github.com/Raincal/smms" target="_blank" rel="noopener noreferrer">
            <Icon type={menu.icon} />
            {menu.text}
          </a>
        ) : (
          <Link to={menu.path}>
            <Icon type={menu.icon} />
            {menu.text}
          </Link>
        )}
      </Menu.Item>
    ))}
  </Menu>
)

export default Header
