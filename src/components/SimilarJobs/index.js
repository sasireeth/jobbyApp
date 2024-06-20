const SimilarJobs = props => {
  const {item} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = item
  return (
    <li className="similar">
      <div className="c1">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
