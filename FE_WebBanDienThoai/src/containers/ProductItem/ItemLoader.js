import React, { Component } from 'react'
import ContentLoader from "react-content-loader"

export default class Loader extends Component {
  render() {
    return (
      <>
      {
        Array.from({ length: 4 }, (_, k) => (
          <div className="col-3">
            <ContentLoader 
              key = {k}
              speed={2}
              width="100%"
              height={270}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="6" y="6" rx="9" ry="9" width="100%" height="175" /> 
              <rect x="6" y="187" rx="4" ry="4" width="100%" height="13" /> 
              <rect x="6" y="205" rx="4" ry="4" width="100%" height="13" /> 
              <rect x="6" y="224" rx="4" ry="4" width="100%" height="13" /> 
              <circle cx="16" cy="253" r="9" /> 
              <circle cx="36" cy="253" r="9" /> 
              <circle cx="56" cy="253" r="9" /> 
              <circle cx="76" cy="253" r="9" /> 
              <circle cx="96" cy="253" r="9" /> 
              <rect x="110" y="248" rx="9" ry="9" width="50" height="13" />
            </ContentLoader>
          </div>
          
        ))
      }
      </>
    )
  }
}
