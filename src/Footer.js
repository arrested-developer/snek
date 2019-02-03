import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  width: 100vw;
  background: black;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px;
  text-align: right;
  box-sizing: border-box;
  font-size: 14px;
  a {
    color: red;
  }
`;

const MyFooter = props => {
  return (
    <Footer>
      Built by{' '}
      <a href={'https://github.com/arrested-developer'} target={'_blank'}>
        @arrested-developer
      </a>
    </Footer>
  );
};

export default MyFooter;
