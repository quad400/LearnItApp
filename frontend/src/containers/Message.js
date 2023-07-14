import React from 'react'
import { Alert } from 'antd'

const Message = ({ message, type, className }) => {
  return <Alert className={className} message={message} type={type} closable showIcon/>
}

export default Message
