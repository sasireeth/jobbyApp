import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="i2"
          />
        </Link>
      </li>

      <div className="con1">
        <li>
          <Link to="/" className="head">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
      </div>
      <button onClick={logout} className="but">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
