import { connect } from 'dva'

import PictureUploader from '../components/PictureUploader'

export default connect(({ uploadlist }) => ({ uploadlist }))(PictureUploader)
