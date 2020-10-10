// 获取远程数据演示
// https://dog.ceo/api/breeds/image/random

import axios from 'axios'

const GetData = ({ url }) => {
  return (
    <div>
      <h3>fetch</h3>
      <button>切换图片{url}</button>
      <img src='' alt='' />
    </div>
  )
}

GetData.getInitialProps = async () => {
  try {
    const res = await axios.get('http://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    console.log(res)
  } catch (error) {
    console.log(error.message)
  }

  return { url: '123' }
}

export default GetData
