import React from 'react'
import { connect } from 'dva'

import PictureUploader from '../components/PictureUploader'

const Home = props => (
  <div>
    <PictureUploader {...props} />
  </div>)

const mapStateToProps = ({ uploadlist }) => {
  return {
    uploadlist,
  }
}

export default connect(mapStateToProps)(Home)
