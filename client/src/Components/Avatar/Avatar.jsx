import React from 'react'

const Avatar = ({children ,backgroundColor, px, py, color, borderRadius, fontSize, curser}) => {

  const style = {
    backgroundColor,
    padding: `${px} ${py}`,
    color: color || 'black',
    borderRadius,
    fontSize,
    curser: curser || null
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Avatar
