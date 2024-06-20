import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const {history} = props
  const jo = () => {
    history.replace('/jobs')
  }
  return (
    <>
      <ul>
        <Header />
      </ul>
      <div className="home">
        <div className="content">
          <h1>Find The Job That Fits Your Life</h1>
          <p>Millions of people are searching for jobs</p>
          <button className="find" onClick={jo}>
            <Link to="/jobs">Find Jobs</Link>
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
