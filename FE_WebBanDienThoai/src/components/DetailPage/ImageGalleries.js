import React, { Component } from 'react';
import './image-gallery.css'
import ImageGallery from 'react-image-gallery';


class ImageGalleries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showNav: true,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
    };

    this.images = [].concat(this._getStaticImages());
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  //Đưa vào mảng ảnh
  /* eslint-disable */
  _getStaticImages() {
    let images = [];
    const {imageDetail} = this.props;
    if(imageDetail.length === 0){
      images.push({
        original: "http://www.pha.gov.pk/img/img-02.jpg" ,
        thumbnail: "http://www.pha.gov.pk/img/img-02.jpg"
      });
    }
    else{
      imageDetail.map((item) =>{
        images.push({
          original: item.public_url ,
          thumbnail: item.public_url
        });
      })
    }
    return images;
  }
/* eslint-disable */
  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  render(){
    const {imageColor} = this.props;
    return (
      <>
      <section className='app container'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          startIndex={imageColor ? this.images.findIndex(item => item.original === imageColor) : 0}
          lazyLoad={true}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={true}
          showBullets={false}
          showFullscreenButton={true}
          showPlayButton={true}
          showThumbnails={true}
          showIndex={true}
          showNav={true}
          isRTL={false}
          thumbnailPosition='bottom'
          slideDuration={parseInt(500)}
          slideInterval={parseInt(2000)}
          slideOnThumbnailOver={true}
          additionalClass="app-image-gallery"
        />
      </section>
      </>
    );
  }
}

export default ImageGalleries;
