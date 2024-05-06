interface Props {
  textVisible?: boolean
  size?: number
}

const Logo = ({ textVisible = true }: Props) => {
  return (
    <div>
      {textVisible && (
        <span className="text-xl ml-1 font-semibold bg-gradient-to-r from-purple-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent ">
          Logo
        </span>
      )}
    </div>
  )
}
export default Logo
