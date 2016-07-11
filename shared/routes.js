import React from 'react';
import { Route } from 'react-router';

import ClientRoot from 'components';

export default (
  <Route
    component={ClientRoot}
    name='root'
    path='/'
  />
);
