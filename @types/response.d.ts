// API Response Types
declare namespace Res {
  // Use to when user failed something within intended aplication behavior e.g. failed login by miss type password
  declare type failedMessage = { failed: string }
  /**
   * POST /api/login
   */
  declare type Login = Author | Res.failedMessag

  /**
   * POST: /api/signup
   */
  declare type SignUp = Author | Res.Error

  /**
   * GET /api/user_count
   */
  declare interface GetUserCount {
    userCount: number
  }

  declare interface PostList {
    total: number
    postList: Post[]
  }

  declare interface UpdatePost {
    message: 'Post Updated!'
  }

  /**
   * Deletre /api/:id
   */
  declare interface DeletePost {
    message: 'Delete Successful!'
  }

  // POST: /api/logout
  declare interface Logout {
    message: 'Logout Successful'
  }

  // DELETE /api/stock/:id
  declare interface DeleteStock {
    message: 'Delete Successful!'
  }
  /**
   * API Reqest/Response body types
   */
  declare type Error = {
    error: string
  }
}
