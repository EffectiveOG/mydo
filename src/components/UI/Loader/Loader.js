import React from 'react';
import styled from 'styled-components'

import LoadingRing from './LoadingRing'

const StyledLoader = styled.div`
width: 100px;
  height: 100px;
`



const Loader = () => {
  return (

    <StyledLoader>
    <LoadingRing/>
    </StyledLoader>
  )
}

export default Loader ;