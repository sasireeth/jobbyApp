import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Item from '../Item'
import Details from '../Details'
import Profile from '../Profile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    activeList: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updt = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        companyWebsiteUrl: data.job_details.company_website_url,
        skills: data.job_details.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        image: data.job_details.life_at_company.image_url,
        description: data.job_details.life_at_company.description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        title: data.job_details.title,
        packagePerAnnum: data.job_details.package_per_annum,
      }
      const similar = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        activeList: updt,
        similarJobs: similar,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  ret = () => {
    this.componentDidMount()
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  renderJobDetails = () => {
    const {activeList, similarJobs} = this.state
    return (
      <div className="gap">
        <Details item={activeList} similar={similarJobs} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="uns">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.ret}>Retry</button>
    </div>
  )

  render() {
    return (
      <>
        <ul>
          <Header />
        </ul>
        {this.renderJobProfileDetailsList()}
      </>
    )
  }
}
export default JobDetails
