import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import { onCloseHander } from './'

const LoginLink: React.FC = memo(() => {
  return (
    <Link
      onClick={onCloseHander}
      to="/login"
      data-cy="login-link"
      className="group flex items-center rounded-md bg-gray-900 px-2 py-2 text-base font-medium text-white"
    >
      <ArrowLeftOnRectangleIcon className="mr-4 h-6 w-6 flex-shrink-0 text-gray-300" />
      Login
    </Link>
  )
})
LoginLink.displayName = 'LoginLink'

export default LoginLink
