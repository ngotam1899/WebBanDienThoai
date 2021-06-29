import React, { Component } from 'react'
import ContentLoader from "react-content-loader"

export default class Loader extends Component {
  render() {
    return (
      <>
      {
        Array.from({ length: 4 }, (_, k) => (
          <div className="col-lg-3 col-6" key = {k}>
            <ContentLoader 
              speed={2}
              width="100%"
              height={290}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="6" y="6" rx="9" ry="9" width="100%" height="175" /> 
              <rect x="6" y="187" rx="4" ry="4" width="100%" height="24" /> 
              <rect x="6" y="216" rx="4" ry="4" width="100%" height="18" /> 
              <rect x="6" y="240" rx="4" ry="4" width="100%" height="18" /> 
              <circle cx="16" cy="274" r="9" /> 
              <circle cx="36" cy="274" r="9" /> 
              <circle cx="56" cy="274" r="9" /> 
              <circle cx="76" cy="274" r="9" /> 
              <circle cx="96" cy="274" r="9" /> 
              <rect x="110" y="269" rx="9" ry="9" width="50" height="13" />
            </ContentLoader>
          </div>
          
        ))
      }
      </>
    )
  }
}
