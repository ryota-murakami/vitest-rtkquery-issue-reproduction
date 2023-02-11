import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Layout from '../../components/Layout/index'
import Loading from '../../components/Loading/Loading'
import ButtonGroup from '../../components/Pagination/ButtonGroup'
import usePagination from '../../components/Pagination/usePagination'
import RTKQueryErrorMessages from '../../components/RTKQueryErrorMessages/RTKQueryErrorMessages'
import { selectAuthor } from '../../redux/adminSlice'
import { useAppSelector } from '../../redux/hooks'

import DashboardPostRow from './DashboardPostRow'

const Dashboard: React.FC = memo(() => {
  const { page, totalPage, data, error, isLoading, refetch } = usePagination(10)
  const author = useAppSelector(selectAuthor)

  if (error) {
    return <RTKQueryErrorMessages error={error} />
  }

  if (isLoading || data === undefined) {
    return <Loading />
  }
  const { postList } = data

  return (
    <>
      <h1 className="text-color-primary mb-3 text-center text-3xl font-semibold">
        Dashboard
      </h1>
      <div className="flex h-full flex-col justify-between">
        <ul className="post-row-container">
          {postList.map((post: Post, i: number) => {
            return (
              <DashboardPostRow
                key={i}
                post={post}
                index={i}
                author={author}
                refetch={refetch}
              />
            )
          })}
        </ul>
        <div className="mt-8 flex justify-end gap-4">
          <Link to="create">
            <Button data-cy="create-btn" variant="primary">
              Create
            </Button>
          </Link>
        </div>
        <ButtonGroup page={page} totalPage={totalPage} />
      </div>
    </>
  )
})
Dashboard.displayName = 'Dashborad'

const DashboardPage = memo(() => (
  <Layout
    disableBaseStyle
    className="mx-auto flex flex-grow flex-col justify-start px-4 py-4 sm:w-full lg:container"
  >
    <Dashboard />
  </Layout>
))
DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
