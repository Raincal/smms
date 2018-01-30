import React, { Component } from 'react'
import { Icon, Tooltip } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'

class CopyIcon extends Component {
  state = {
    copied: false,
    title: this.props.title,
  }

  handleVisibleChange = () => {
    this.setState({
      copied: false,
      title: this.props.title,
    })
  }

  handleCopy = () => {
    this.setState({
      copied: true,
      title: 'Copied',
    })
  }

  render() {
    const { text, placement, type } = this.props
    const { title, copied } = this.state
    return (
      <Tooltip
        placement={placement}
        title={title}
        arrowPointAtCenter
        onVisibleChange={this.handleVisibleChange}>
        <CopyToClipboard text={text} onCopy={this.handleCopy}>
          <Icon
            type={copied ? 'check' : type}
            style={{
              color: copied ? '#00a854' : '',
              cursor: 'pointer',
              width: 15,
              height: 15,
              marginLeft: 3,
            }}
          />
        </CopyToClipboard>
      </Tooltip>
    )
  }
}

export default CopyIcon
