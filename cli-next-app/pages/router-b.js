import Link from 'next/link'
import Router from 'next/router'

const RouterB = () => {
  const handleClick = () => {
    console.log('click')
    Router.push('/router-a?id=123')
  }

  return (
    <div>
      <div>页面b</div>
      <Link href='/router-a'>
        <a>去页面a</a>
      </Link>
      <button onClick={handleClick}>去页面a</button>
    </div>
  )
}

export default RouterB
