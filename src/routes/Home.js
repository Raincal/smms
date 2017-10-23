import React from 'react'
import { connect } from 'dva'

import PictureUploader from '../components/PictureUploader'
import MainLayout from '../components/layout'

const Home = props => (
  <MainLayout location={props.location}>
    <PictureUploader {...props} />
  </MainLayout>
)

const mapStateToProps = ({ uploadlist }) => {
  return {
    uploadlist,
  }
}

export default connect(mapStateToProps)(Home)
