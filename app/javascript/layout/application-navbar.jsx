import { Navbar } from 'react-bootstrap'
import React from 'react'

export default class ApplicationNavbar extends React.Component {

  render() {
    return (
      <div className="navbar-top">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">EquityFlow</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
}
