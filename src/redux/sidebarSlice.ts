import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'

export interface SidebarState {
  open: boolean
}

const initialState: SidebarState = {
  open: false,
}

export const sidebarSlice = createSlice({
  initialState,
  name: 'sidebar',
  reducers: {
    closeSidebar: (state) => {
      state.open = false
    },
    openSidebar: (state) => {
      state.open = true
    },
    toggleSidebar: (state) => {
      state.open = state.open === true ? false : true
    },
  },
})

export const selectSidebarOpen = (state: RootState): SidebarState['open'] =>
  state.sidebar.open

export const { openSidebar, closeSidebar, toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
