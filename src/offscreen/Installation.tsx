import React, { memo } from 'react'

import Loading from '../components/Loading/Loading'
import Signup from '../pages/Signup/index'
import { useGetUserCountQuery } from '../redux/API'

const Installation: React.FC = memo(() => {
  const { data, isLoading, error } = useGetUserCountQuery()

  if (isLoading) return <Loading />
  if (error) return <div>Error</div>
  if (data && data.userCount === 0) return <Signup />

  return <div>There is no post.</div>
})
Installation.displayName = 'Installation'

export default Installation
