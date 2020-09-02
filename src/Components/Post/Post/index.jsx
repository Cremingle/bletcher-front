import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  postTitle: null,
  hoverIcon: null,
};
const propTypes = {
  postImg: PropTypes.string.isRequired,
  postTitle: PropTypes.string,
  hoverIcon: PropTypes.element,
};
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { postImg, postTitle, hoverIcon } = this.props;
    return (
      <div className="post">
        <div className="post__hover">{hoverIcon}</div>
        <div className="post__body">
          <img className="post__body__image" src={postImg} alt="artwork" />
        </div>
        <div className="post__footer">
          {postTitle ? (
            <div className="post__footer__title">{postTitle}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
