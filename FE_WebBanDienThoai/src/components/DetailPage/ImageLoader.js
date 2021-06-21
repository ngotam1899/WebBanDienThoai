import React, { Component } from 'react'
import ContentLoader from "react-content-loader"

export default class ImageLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={0}
        width="100%"
        height="50vh"
        viewBox="0 0 442 550"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="20" ry="20" width="100%" height="430" /> 
        <rect x="0" y="442" rx="16" ry="16" width="22%" height="100" /> 
        <rect x="127" y="442" rx="16" ry="16" width="22%" height="100" /> 
        <rect x="252" y="442" rx="16" ry="16" width="22%" height="100" /> 
        <rect x="376" y="442" rx="16" ry="16" width="22%" height="100" />
      </ContentLoader>
    )
  }
}
