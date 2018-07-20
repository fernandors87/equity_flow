import HomeView from 'views/home'
import React from 'react'

export default class ApplicationContent extends React.Component {

  render() {
    return (
      <div className="content">
        <HomeView />
      </div>
    )
  }
}
