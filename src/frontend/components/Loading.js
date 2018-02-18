import React from 'react';
import LoadingIcon from '../components/LoadingIcon';

const Loading = (props) => {
  return (
    <div>
      <h1>
        Fetching from Github
        <LoadingIcon />
      </h1>
    </div>
  );
}

export default Loading;
