import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {activeList: [], isLoading: false}

  componentDidMount = () => {
    this.fetchDetails()
  }

  retry = () => {
    this.componentDidMount()
  }

  loader = () => (
    <button className="but" onClick={this.retry}>
      Retry
    </button>
  )

  profile = prof => (
    <div className="pro">
      <img src={prof.profileImageUrl} alt="profile" className="img" />
      <h1>M.Sasireeth Reddy</h1>
      <p>{prof.shortBio}</p>
    </div>
  )

  fetchDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
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
      const updt = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({activeList: updt, isLoading: false})
    } else {
      this.setState({isLoading: true})
    }
  }

  render() {
    const {activeList, isLoading} = this.state
    return <>{isLoading ? this.loader() : this.profile(activeList)}</>
  }
}
export default Profile
