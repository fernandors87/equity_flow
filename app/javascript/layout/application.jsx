import 'css/application'
import ApplicationContent from 'layout/application-content'
import ApplicationNavbar from 'layout/application-navbar'
import React from 'react'

export default class Application extends React.Component {

  render() {
    return (
      <div className="application">
        <ApplicationNavbar />
        <ApplicationContent view="home" />
      </div>
    )
  }
}
