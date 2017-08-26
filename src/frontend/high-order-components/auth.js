
import React from 'react';

import AuthWrapper from './AuthWrapper';

export default function (Component) {
  return (props) => {
    return (
      <AuthWrapper>
        <Component {...props} />
      </AuthWrapper>
    );
  };
}
