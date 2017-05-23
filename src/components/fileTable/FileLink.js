import React from 'react'
import CopyIcon from './CopyIcon'

const FileLink = ({ text, record }) => (
  <div>
    <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
    <CopyIcon
      placement="topRight"
      title="Copy link"
      type="link"
      text={text}
    />
    <CopyIcon
      placement="topLeft"
      title="Copy MarkDown"
      type="copy"
      text={`![${record.filename}](${text})`}
    />
  </div>
)

export default FileLink
