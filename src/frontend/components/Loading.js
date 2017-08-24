import React from 'react';
import LoadingIcon from '../components/LoadingIcon';

const Loading = (props) => {
  return (
    <div className="loading-wrapper" style={{
      color: props.color,
    }}>
      <h1>
        Fetching from Github
        <LoadingIcon />
      </h1>
    </div>
  );
}

export default Loading;
