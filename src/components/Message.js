import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

// if variant is not passed
Message.defaultProps = {
  variant: 'info',
}

export default Message
