import React from 'react'
import CopyIcon from './CopyIcon'

const PREFIX = 'https://ooo.0o0.ooo'

const FileLink = ({ text, record }) => (
  <div>
    <a href={`${PREFIX}${text}`} target="_blank" rel="noopener noreferrer">{text.slice(1)}</a>
    <CopyIcon
      placement="topRight"
      title="Copy link"
      type="link"
      text={`${PREFIX}${text}`}
    />
    <CopyIcon
      placement="topLeft"
      title="Copy MarkDown"
      type="copy"
      text={`![${record.filename}](${PREFIX}${text})`}
    />
  </div>
)

export default FileLink
