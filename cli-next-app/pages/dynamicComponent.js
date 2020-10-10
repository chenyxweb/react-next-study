import dynamic from 'next/dynamic'

// 基础用法
// const Button = dynamic(import('../components/button'))

// 高级用法
const Button = dynamic(() => import('../components/button'), {
  // 添加加载中状态
  loading: () => <div>loading...</div>,
})

export default () => {
  return (
    <div>
      dynamicComponent
      <Button onClick={() => console.log('click')}>按钮组件</Button>
    </div>
  )
}
