import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Item = props => {
  const {item, sel} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = item
  const {history} = props
  const clk = () => {
    history.replace(`/jobs/${id}`)
  }

  return (
    <li className="item" onClick={clk}>
      <div className="c1">
        <img src={companyLogoUrl} alt="company logo" className="logo" />
        <div className="cc1">
          <p>{title}</p>
        </div>
      </div>
      <div className="c2">
        <p>{location}</p>
        <p>{employmentType}</p>
        <p className="pp">{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="c3">
        <p>Description</p>
        <p>{jobDescription}</p>
      </div>
    </li>
  )
}
export default withRouter(Item)
