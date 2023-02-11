import type { ComponentStory } from '@storybook/react'
import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import Edit from './index'

export default {
  component: Edit,
  title: 'Pages/Edit',
}

const Template: ComponentStory<typeof Edit> = () => (
  <MemoryRouter initialEntries={['/edit/52']}>
    <Routes>
      <Route path="/edit/:postId" element={<Edit />} />
    </Routes>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {}
