import React from 'react';

import { Footer } from './Footer.styles';

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
