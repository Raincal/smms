import React from 'react'

import Header from './Header'
import Footer from './Footer'

import styles from './MainLayout.less'

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
