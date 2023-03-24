import './banner.css';

import banner from '../../resources/img/banner.png';

const Banner = () => {
    return (
        <div className="banner">
            <img src={banner} alt="banner"/>
        </div>
    );
}

export default Banner;