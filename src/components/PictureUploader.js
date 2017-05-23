import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'

import './Picture.less'

const Dragger = Upload.Dragger

const props = {
  name: 'smfile',
  multiple: true,
  accept: 'image/*',
  showUploadList: {
    showRemoveIcon: false,
  },
  listType: 'picture',
  action: 'https://sm.ms/api/upload',
  headers: {
    'X-Requested-With': null,
  },
  beforeUpload(file) {
    const isJPEG = file.type === 'image/jpeg',
      isJPG = file.type === 'image/jpg',
      isPNG = file.type === 'image/png',
      isGIF = file.type === 'image/gif',
      isPic = isJPG || isJPEG || isPNG || isGIF,
      isSmall = file.size < 1024 * 1024 * 5,
      isPass = isPic && isSmall

    if (!isPic) {
      message.error('只能上传格式为 JPG/JPEG/PNG/GIF 的图片！', 3)
    } else if (!isSmall) {
      message.error('只能上传小于5M的图片！', 3)
    }

    return isPass
  },
}

class PictureUploader extends Component {
  state = {
    fileList: this.props.uploadlist,
  }

  handleChange = (info) => {
    let fileList = info.fileList
    const response = info.file.response
    fileList = fileList.slice(-100)
    this.setState({ fileList })
    if (response && response.code === 'success') {
      const { uid, name } = info.file
      this.props.dispatch({
        type: 'uploadlist/upload',
        payload: {
          data: {
            ...response.data,
            filename: name,
            visible: true,
            uid,
            name,
          },
        },
      })
      message.success(`${info.file.name} file uploaded successfully.`, 3)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`, 3)
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
