import React from 'react'

import styled from 'styled-components'
import Auth from '../hoc/auth'
import {withRouter} from 'react-router-dom'
function LandingPage() {
 

  return (
    <Landing>
    
      this is landing page
    
    </Landing>
  )
}
export default Auth(withRouter(LandingPage))
const Landing = styled.div`
text-align: center;


`;