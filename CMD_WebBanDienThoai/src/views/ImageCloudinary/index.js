import React, { Component } from 'react';
import { connect } from "react-redux";
import ImagesActions from "../../redux/actions/cloudinary";

class ImageCloudinary extends Component {
  componentDidMount(){
    const {onGetImage, item} = this.props;
    onGetImage(item);
  }

  render() {
    return (
      <img/>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGetImage: (id) => {
      dispatch(ImagesActions.onGetAnImage(id))
    },
  }
}
export default connect(null, mapDispatchToProps) (ImageCloudinary);
