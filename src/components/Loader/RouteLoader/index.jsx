import React from 'react';
import Progress from './Progress';
import PageLoader from '../PageLoader';

const RouteLoader = ({height}) => {
  return (
    <React.Fragment>
      <Progress isAnimating />
      <PageLoader height={height}/>
    </React.Fragment>
  );
};

export default RouteLoader;
