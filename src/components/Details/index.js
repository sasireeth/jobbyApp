import {Link} from 'react-router-dom'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'
import Item from '../Item'

const Details = props => {
  const {item, similar} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    companyWebsiteUrl,
    packagePerAnnum,
    location,
    rating,
    skills,
    image,
    title,
    description,
    id,
  } = item
  console.log(skills)
  return (
    <div className="bg">
      <div className="details">
        <div className="c1">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="logo"
          />
          <div className="cc1">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="c2">
          <p>{location}</p>
          <p>{employmentType}</p>
          <p className="pp">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="c3">
          <div className="link">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <h1>Skills</h1>
        <ul className="c4">
          {skills.map(each => (
            <Skills item={each} key={each.id} />
          ))}
        </ul>
        <h1>Life at Company</h1>
        <div className="c5">
          <h1>{description}</h1>
          <img src={image} className="img1" alt="life at company" />
        </div>
      </div>
      <h1 className="p">Similar Jobs</h1>
      <ul className="c6">
        {similar.map(each => (
          <SimilarJobs item={each} key={each.id} />
        ))}
      </ul>
    </div>
  )
}
export default Details
