import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'

// Component pages
import Membership from './Membership'

const MyAppPage = () => (
  <Fragment>
    {/* This `path` will be added at the end of the URL */}
    <Route path="/isaca-membership-panel" exact component={Membership} />
  </Fragment>
)

export default MyAppPage
