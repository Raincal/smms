import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

const Header = ({ location }) => (
  <Menu selectedKeys={[location.pathname]} mode="horizontal">
    <Menu.Item key="/">
      <Link to="/"><Icon type="home" />Home</Link>
    </Menu.Item>
    <Menu.Item key="/dashboard">
      <Link to="/dashboard"><Icon type="clock-circle-o" />Dashboard</Link>
    </Menu.Item>
    <Menu.Item key="/about">
      <Link to="/about"><Icon type="appstore" />About</Link>
    </Menu.Item>
    <Menu.Item key="github">
      <a
        href="https://github.com/Raincal/smms"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source Code
      </a>
    </Menu.Item>
  </Menu>
)

export default Header
