import React, { Component } from 'react'
import ContentLoader from "react-content-loader"

export default class ProductInfoLoader extends Component {
  render() {
    return (
      <ContentLoader 
        speed={0}
        width="100%"
        height={360}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="305" height="45" /> 
        <rect x="0" y="63" rx="10" ry="10" width="189" height="26" /> 
        <circle cx="15" cy="114" r="15" /> 
        <rect x="0" y="140" rx="10" ry="10" width="148" height="56" /> 
        <rect x="0" y="211" rx="10" ry="10" width="178" height="19" /> 
        <rect x="0" y="316" rx="20" ry="20" width="175" height="37" /> 
        <circle cx="49" cy="114" r="15" /> 
        <circle cx="84" cy="114" r="15" /> 
        <circle cx="119" cy="114" r="15" /> 
        <circle cx="156" cy="114" r="15" /> 
        <rect x="183" y="105" rx="11" ry="11" width="90" height="22" /> 
        <rect x="162" y="139" rx="10" ry="10" width="148" height="56" /> 
        <rect x="322" y="137" rx="10" ry="10" width="148" height="56" /> 
        <rect x="325" y="246" rx="10" ry="10" width="148" height="56" /> 
        <rect x="163" y="247" rx="10" ry="10" width="148" height="56" /> 
        <rect x="0" y="247" rx="10" ry="10" width="148" height="56" />
      </ContentLoader>
    )
  }
}
