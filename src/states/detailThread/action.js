import api from '../../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  TOGGLE_NEUTRALVOTE_THREAD_DETAIL: 'TOGGLE_NEUTRALVOTE_THREAD_DETAIL',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRALVOTE_COMMENT: 'TOGGLE_NEUTRALVOTE_COMMENT'
}

// =====================
// ACTION CREATORS
// =====================

function receiveDetailThreadActionCreator (detailThread) {
  return { type: ActionType.RECEIVE_DETAIL_THREAD, payload: { detailThread } }
}

function clearDetailThreadActionCreator () {
  return { type: ActionType.CLEAR_DETAIL_THREAD }
}

function addCommentActionCreator (comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } }
}

// Action Creators untuk Vote Thread Detail
function toggleUpVoteThreadDetailActionCreator (userId) {
  return { type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL, payload: { userId } }
}
function toggleDownVoteThreadDetailActionCreator (userId) {
  return { type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL, payload: { userId } }
}
function toggleNeutralVoteThreadDetailActionCreator (userId) {
  return { type: ActionType.TOGGLE_NEUTRALVOTE_THREAD_DETAIL, payload: { userId } }
}

// Action Creators untuk Vote Komentar
function toggleUpVoteCommentActionCreator ({ commentId, userId }) {
  return { type: ActionType.TOGGLE_UPVOTE_COMMENT, payload: { commentId, userId } }
}
function toggleDownVoteCommentActionCreator ({ commentId, userId }) {
  return { type: ActionType.TOGGLE_DOWNVOTE_COMMENT, payload: { commentId, userId } }
}
function toggleNeutralVoteCommentActionCreator ({ commentId, userId }) {
  return { type: ActionType.TOGGLE_NEUTRALVOTE_COMMENT, payload: { commentId, userId } }
}

// =====================
// THUNK FUNCTIONS
// =====================

function asyncReceiveDetailThread (threadId) {
  return async (dispatch) => {
    dispatch(clearDetailThreadActionCreator()) // Bersihkan UI dari data sebelumnya
    dispatch(showLoading())
    try {
      const detailThread = await api.getDetailThread(threadId)
      dispatch(receiveDetailThreadActionCreator(detailThread))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncAddComment ({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const comment = await api.createComment({ threadId, content })
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

// Thunks untuk Vote Thread Detail
function asyncToggleUpVoteThreadDetail () {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id))
    try {
      await api.upVoteThread(detailThread.id)
    } catch (error) {
      alert(error.message)
      dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id))
    }
  }
}

function asyncToggleDownVoteThreadDetail () {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id))
    try {
      await api.downVoteThread(detailThread.id)
    } catch (error) {
      alert(error.message)
      dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id))
    }
  }
}

function asyncToggleNeutralVoteThreadDetail () {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleNeutralVoteThreadDetailActionCreator(authUser.id))
    try {
      await api.neutralVoteThread(detailThread.id)
    } catch (error) {
      alert(error.message)
    }
  }
}

// Thunks untuk Vote Komentar
function asyncToggleUpVoteComment (commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }))
    try {
      await api.upVoteComment(detailThread.id, commentId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }))
    }
  }
}

function asyncToggleDownVoteComment (commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }))
    try {
      await api.downVoteComment(detailThread.id, commentId)
    } catch (error) {
      alert(error.message)
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }))
    }
  }
}

function asyncToggleNeutralVoteComment (commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }))
    try {
      await api.neutralVoteComment(detailThread.id, commentId)
    } catch (error) {
      alert(error.message)
    }
  }
}

// =====================
// EXPORTS
// =====================

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment
}
