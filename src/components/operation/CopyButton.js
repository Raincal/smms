import { Button, message } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'

const styles = {
  marginLeft: 8,
}

const CopyButton = ({ hasSelected, links, type, children }) => {
  let str = ''
  links.map(link => {
    link = type === 'markdown' ? `![smms](${link})` : link
    str += `${link}\n`
    return str
  })

  const onCopy = () => {
    message.success('Copy successful!')
  }

  return (
    <CopyToClipboard text={str} onCopy={onCopy} style={styles}>
      <Button disabled={!hasSelected}>{children}</Button>
    </CopyToClipboard>
  )
}

export default CopyButton
