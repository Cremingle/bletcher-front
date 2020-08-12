import React from 'react';

import PropTypes from 'prop-types';

import bgFilledHeartImg from 'Assets/images/fundHeart-bg-fill.png';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';

const defaultProps = {
  onClick: null,
  isBgFilled: false,
};

const propTypes = {
  onClick: PropTypes.func,
  isBgFilled: PropTypes.bool,
};

const FundHeart = (props) => {
  const { onClick, isBgFilled } = props;
  return isBgFilled ? (
    <NoStyleButton
      onClick={onClick}
      content={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <img
          src={bgFilledHeartImg}
          alt="heartIcon"
          className="heartIcon-hover"
        />
      }
    />
  ) : (
    <img src={HeartImg} alt="heartBadge" className="fundHeart" />
  );
};

FundHeart.defaultProps = defaultProps;
FundHeart.propTypes = propTypes;

export default FundHeart;