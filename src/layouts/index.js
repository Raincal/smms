import withRouter from 'umi/withRouter'

import Header from './Header'
import Footer from './Footer'

import styles from './index.less'

const BasicLayout = ({ children, location }) => {
  return (
    <div className={styles.layout}>
      <Header location={location}/>
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  )
}

export default withRouter(BasicLayout)
