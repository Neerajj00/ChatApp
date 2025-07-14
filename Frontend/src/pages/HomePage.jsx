import React from 'react'
import useAuthUser from '../hooks/useAuthUser.js';

function HomePage() {
  const {authUser} = useAuthUser();
  console.log(authUser);
  return (
    <div>HomePage</div>
  )
}

export default HomePage