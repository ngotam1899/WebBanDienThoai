import React, { Component } from 'react';
import './styles.css';
import { faFacebookF, faTwitter, faYoutube , faLinkedin, faCcDiscover, faCcMastercard, faCcPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from '../../constants/assetsImage';

class Footer extends Component {
    render() {
        return (
            <>
    <div className="footer-top-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div className="footer-about-us">
                        <h2><img src={ assets('brand-footer.png') } className="w-100"/></h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi veritatis magni at?</p>
                        <div className="footer-social">
                            <a href="#" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="#" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#" target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
                            <a href="#" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                    <div className="footer-menu">
                        <h2 className="footer-wid-title">User Navigation </h2>
                        <ul>
                            <li><a href="#">My account</a></li>
                            <li><a href="#">Order history</a></li>
                            <li><a href="#">Wishlist</a></li>
                            <li><a href="#">Vendor contact</a></li>
                            <li><a href="#">Front page</a></li>
                        </ul>                        
                    </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                    <div className="footer-menu">
                        <h2 className="footer-wid-title">Categories</h2>
                        <ul>
                            <li><a href="#">Mobile Phone</a></li>
                            <li><a href="#">Home accesseries</a></li>
                            <li><a href="#">LED TV</a></li>
                            <li><a href="#">Computer</a></li>
                            <li><a href="#">Gadets</a></li>
                        </ul>                        
                    </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                    <div className="footer-newsletter">
                        <h2 className="footer-wid-title">Newsletter</h2>
                        <p>Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your inbox!</p>
                        <div className="newsletter-form">
                            <form action="#">
                                <input type="email" placeholder="Type your email"/>
                                <input type="submit" value="Subscribe"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    
    <div className="footer-bottom-area">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="copyright">
                        <p>&copy; 2020 Tiểu luận chuyên ngành</p>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="footer-card-icon">
                        <FontAwesomeIcon icon={faCcDiscover} />
                        <FontAwesomeIcon icon={faCcMastercard} />
                        <FontAwesomeIcon icon={faCcPaypal} />
                        <FontAwesomeIcon icon={faCcVisa} />
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
            
        );
    }
}

export default Footer;