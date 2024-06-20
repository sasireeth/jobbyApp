import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: '', isFalse: false}

  user = event => {
    this.setState({username: event.target.value})
  }

  pass = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, isFalse: true})
    }
  }

  render() {
    const {history} = this.props
    const {errorMsg, isFalse, username1, password1} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="b1">
        <form className="login" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="i1"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username1}
            onChange={this.user}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password1}
            onChange={this.pass}
          />
          <button type="submit" onClick="log">
            Login
          </button>
          {isFalse && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginPage
