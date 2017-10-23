import React from 'react'

import Header from './Header'
import Footer from './Footer'

import styles from './MainLayout.less'

const MainLayout = ({ children, location }) => {
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

export default MainLayout
