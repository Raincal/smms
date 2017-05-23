import React from 'react'

import { Layout } from '../components'

import styles from './App.less'

const { Header, Footer } = Layout

const App = ({ children, location }) => {
  return (
    <div className={styles.layout}>
      <Header location={location} />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default App
