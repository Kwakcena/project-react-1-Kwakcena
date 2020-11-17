import React from 'react';

import styled from '@emotion/styled';

import {
  FaArrowRight,
  FaArrowLeft,
} from 'react-icons/fa';

const Arrow = styled.div({
  position: 'absolute',
  cursor: 'pointer',
  zIndex: 10,
  '&.next': {
    right: '0%',
    top: '50%',
  },
  '&.prev': {
    left: '0%',
    top: '50%',
  },
});

export function NextArrow({ onClick }) {
  return (
    <Arrow
      className="arrow next"
      onClick={onClick}
    >
      <FaArrowRight
        color="#000"
      />
    </Arrow>
  );
}

export function PrevArrow({ onClick }) {
  return (
    <Arrow
      className="arrow prev"
      onClick={onClick}
    >
      <FaArrowLeft
        color="#000"
      />
    </Arrow>
  );
}
