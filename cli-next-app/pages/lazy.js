import { useState } from 'react'

export default () => {
  const timeStamp = +new Date()

  const [time, setTime] = useState(timeStamp)

  const handleClick = async () => {
    // 当点击按钮的时候才会去加载moment
    const moment = await import('moment')
    console.log(setTime(moment.default(timeStamp).format('YYYY-MM-DD HH:mm:ss')))
  }

  return (
    <div>
      <div>将时间戳格式化</div>
      <div>{time}</div>
      <button onClick={handleClick}>格式化</button>
    </div>
  )
}
