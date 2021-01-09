import React, { Component } from 'react'
export const ScreenWithDefaultParams = (Comp, defaultParams) => {
  return class extends Component {
    render() {
      return <Comp {...this.props} screenProps={defaultParams} />
    }
  }
}
