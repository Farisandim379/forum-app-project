import { ActionType } from './action'

function detailThreadReducer (detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread
    case ActionType.CLEAR_DETAIL_THREAD:
      return null
    case ActionType.ADD_COMMENT:
      return { ...detailThread, comments: [action.payload.comment, ...detailThread.comments] }

    // Logika Vote Thread Detail
    case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId) ? detailThread.upVotesBy : [...detailThread.upVotesBy, action.payload.userId],
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
      }
    case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId) ? detailThread.downVotesBy : [...detailThread.downVotesBy, action.payload.userId]
      }
    case ActionType.TOGGLE_NEUTRALVOTE_THREAD_DETAIL:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
      }

    // Logika Vote Komentar
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId) ? comment.upVotesBy : [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId)
            }
          }
          return comment
        })
      }
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId) ? comment.downVotesBy : [...comment.downVotesBy, action.payload.userId]
            }
          }
          return comment
        })
      }
    case ActionType.TOGGLE_NEUTRALVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId)
            }
          }
          return comment
        })
      }
    default:
      return detailThread
  }
}

export default detailThreadReducer
