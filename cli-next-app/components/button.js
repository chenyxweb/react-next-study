export default ({ children, ...restProps }) => {
  return <button {...restProps}>{children}</button>
}
