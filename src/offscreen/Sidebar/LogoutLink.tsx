import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import React, { memo } from 'react'
import type { NavigateFunction } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../redux/adminSlice'
import { API } from '../../redux/API'
import isSuccess from '../../redux/helper/isSuccess'
import { enqueSnackbar } from '../../redux/snackbarSlice'
import { dispatch } from '../../redux/store'

export async function handleLogout(
  e: React.MouseEvent<HTMLButtonElement>,
  navigate: NavigateFunction | undefined = undefined
) {
  e.preventDefault()
  const response = await dispatch(API.endpoints.logoutRequest.initiate())

  if (isSuccess(response) && 'data' in response) {
    dispatch(logout())
    dispatch(enqueSnackbar({ color: 'green', message: response.data.message }))
    if (navigate) navigate('/')
  }
}

const LogoutLink: React.FC = memo(
  () => {
    const navigate = useNavigate()
    return (
      <button
        onClick={(e) => handleLogout(e, navigate)}
        data-cy="logout-link"
        className="group flex w-full items-center rounded-md bg-gray-900 px-2 py-2 text-base font-medium text-white"
      >
        <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6 flex-shrink-0 text-gray-300" />
        Logout
      </button>
    )
  },
  () => true
)
LogoutLink.displayName = 'LogoutLink'

export default LogoutLink
