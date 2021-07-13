import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { User } from '../../classes/user'
// import axios from 'axios'

class Nav extends Component<{user: User}> {

  state = {
    // user: new User(),
    redirect: false
  }

  // componentDidMount = async () => {
  //   try {
  //     const response = await axios.get('user')

  //     this.setState({
  //       user: response.data.data
  //     })
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  handleClick = async () => {
    // await axios.post('logout', {})
    localStorage.clear()
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/#">Company name</a>
        <ul className="my-2 my-md-8 mr-md-3">
          <Link to={'/profile'} className='p-2 text-white'>{this.props.user.first_name} {this.props.user.last_name}</Link>
          <a className="p-2 text-white" href="#" onClick={this.handleClick}>Sign out</a>
        </ul>
      </nav>
    )
  }
}

export default connect(
  (state: {user: User}) => ({user: state.user})
)(Nav)
