import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  console.log('router: ', router)

  return <div>post---{router.query.id}</div>
}

export default Post
