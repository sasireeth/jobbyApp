import './index.css'

const Skills = props => {
  const {item} = props
  const {name, imageUrl} = item
  return (
    <li className="skil">
      <img src={imageUrl} className="img" alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default Skills
