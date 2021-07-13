import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { User } from '../../classes/user';

class Menu extends Component<{user: User}>{
  menuItems = [
    {
      link: '/users',
      name: 'Users'
    },
    {
      link: '/roles',
      name: 'Roles'
    },
    {
      link: '/products',
      name: 'Products'
    },
    {
      link: '/orders',
      name: 'Orders'
    }
  ]

  render() {
    let menu: JSX.Element[] = [];

    this.menuItems.forEach(i => {
      if (this.props.user.canView(i.name.toLowerCase())) {
        menu.push(
          <li className="nav-item">
            <NavLink to={i.link} className="nav-link">
              {i.name}
            </NavLink>
          </li>
        )
      }
    })

    return (
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link">
                Dashboard
              </NavLink>
            </li>
            {menu}
          </ul>
        </div>
      </nav>
    )
  }
}

export default connect(
  (state: {user: User}) => ({user: state.user})
)(Menu);