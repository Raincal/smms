import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'

import './Picture.less'

const Dragger = Upload.Dragger

const props = {
  name: 'smfile',
  multiple: true,
  accept: 'image/*',
  showUploadList: {
    showRemoveIcon: false
  },
  listType: 'picture',
  action: '/api/upload',
  headers: {
    'X-Requested-With': null
  },
  beforeUpload(file) {
    const isPic = /^(?:image\/jpe?g|image\/png|image\/gif|image\/bmp)$/i.test(
        file.type
      ),
      isSmall = file.size < 1024 * 1024 * 5,
      isPass = isPic && isSmall

    if (!isPic) {
      message.error('File not supported!', 3)
    } else if (!isSmall) {
      message.error('Your picture is larger than 5MB!', 3)
    }

    return isPass
  }
}

class PictureUploader extends Component {
  state = {
    fileList: this.props.uploadlist
  }

  handleChange = ({ file, fileList }) => {
    const response = file.response
    fileList = fileList.slice(-100)
    this.setState({ fileList })
    if (response) {
      if (response.code === 'success') {
        const { uid, name } = file
        this.props.dispatch({
          type: 'uploadlist/upload',
          payload: {
            data: {
              ...response.data,
              filename: name,
              visible: true,
              uid,
              name
            }
          }
        })
        message.success(`${file.name} file uploaded successfully.`, 3)
      } else if (response.status === 'error') {
        message.error(`${file.name} file upload failed.`, 3)
      } else {
        message.error('Server Error.', 3)
      }
    }
  }

  render() {
    const { fileList } = this.state
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        <Dragger {...props} fileList={fileList} onChange={this.handleChange}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            5 MB max per file. 10 files max per request.
          </p>
        </Dragger>
      </div>
    )
  }
}

export default PictureUploader
