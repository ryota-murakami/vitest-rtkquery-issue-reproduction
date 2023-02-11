import matchers from '@testing-library/jest-dom/matchers'
import MatchMediaMock from 'jest-matchmedia-mock'
import nodeFetch from 'node-fetch'
import { expect, afterEach, beforeAll, beforeEach, afterAll } from 'vitest'

import { server } from '../mocks/server'
// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

//@ts-ignore
window.fetch = nodeFetch
//@ts-ignore
window.Request = nodeFetch.Request

let matchMedia

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  matchMedia = new MatchMediaMock()
})

beforeEach(() => {
  server.resetHandlers()
})

afterEach(() => {
  matchMedia.clear()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
