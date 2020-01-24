import React from 'react'

import PropTypes from "prop-types";

import {FacebookShareButton,PinterestShareButton,TwitterShareButton,WhatsappShareButton} from 'react-share';
import {FacebookIcon,PinterestIcon,TwitterIcon,WhatsappIcon} from 'react-share';

const ShareBar = ({url, size})=>
<span>
<FacebookShareButton url={url}><FacebookIcon size={size} round={false}/></FacebookShareButton>
<TwitterShareButton url={url}><TwitterIcon size={size} round={false}/></TwitterShareButton>
<WhatsappShareButton url={url}><WhatsappIcon size={size} round={false}/></WhatsappShareButton>
<PinterestShareButton url={url}><PinterestIcon size={size} round={false}/></PinterestShareButton>

</span>

ShareBar.propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  };

export default ShareBar;