import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Item from '../Item'
import Profile from '../Profile'
import './index.css'
import JobDetails from '../JobDetails'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    activeList: [],
    activeEmployee: [],
    activeSalary: '',
    txt: '',
    apiStatus: apiStatusConstants.initial,
  }

  update = event => {
    this.setState({txt: event.target.value})
  }

  componentDidMount = () => {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const {activeEmployee, activeSalary, txt} = this.state
    console.log(activeEmployee)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployee.join()}&minimum_package=${activeSalary}&search=${txt}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updt = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({activeList: updt, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  search = () => {
    const {activeList, txt} = this.state
    const lst = activeList.filter(each =>
      each.title.toLowerCase().includes(txt.toLowerCase()),
    )
    return lst
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
    const up = this.search()
    const dis = up.length > 0
    return dis ? (
      <ul>
        {up.map(each => (
          <Item item={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <div className="no">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
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
      <button onClick={this.ret} className="ret">
        Retry
      </button>
    </div>
  )

  updateType = event => {
    const {activeEmployee} = this.state
    if (!activeEmployee.includes(event.target.id)) {
      this.setState(
        prev => ({activeEmployee: [...prev.activeEmployee, event.target.id]}),
        this.fetchDetails,
      )
    } else {
      const a = activeEmployee.filter(each => each !== event.target.id)
      this.setState(prev => ({activeEmployee: a}), this.fetchDetails)
    }
  }

  updateSal = event => {
    this.setState({activeSalary: event.target.id}, this.fetchDetails)
  }

  ret = () => {
    this.componentDidMount()
  }

  render() {
    const {activeList, txt} = this.state
    return (
      <>
        <ul>
          <Header />
        </ul>
        <div className="jobs">
          <div className="cont1">
            <Profile />
            <hr />
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(each => (
                <li className="lst" key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    onChange={this.updateType}
                  />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <li className="lst" key={each.salaryRangeId}>
                  <input
                    type="checkbox"
                    id={each.salaryRangeId}
                    onClick={this.updateSal}
                  />
                  <label htmlFor={each.salaryRangeId}> {each.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="cont2">
            <div className="srch">
              <input type="search" className="srh" onChange={this.update} />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.search}
                className="ret"
              >
                Search
              </button>
            </div>
            <div>{this.renderJobProfileDetailsList()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
