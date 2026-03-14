import api from '../../utils/api'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  TOGGLE_NEUTRALVOTE_THREAD: 'TOGGLE_NEUTRALVOTE_THREAD'
}

// =====================
// ACTION CREATORS
// =====================

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads }
  }
}

function addThreadActionCreator (thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread }
  }
}

function toggleUpVoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: { threadId, userId }
  }
}

function toggleDownVoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: { threadId, userId }
  }
}

function toggleNeutralVoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRALVOTE_THREAD,
    payload: { threadId, userId }
  }
}

// =====================
// THUNK FUNCTIONS
// =====================

function asyncAddThread ({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThreadActionCreator(thread))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncToggleUpVoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    // Optimistic UI: Langsung ubah UI di layar sebelum memanggil API
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }))
    try {
      await api.upVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      // Jika API gagal, kembalikan UI ke state awal (Neutral)
      dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncToggleDownVoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    // Optimistic UI: Langsung ubah UI di layar sebelum memanggil API
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }))
    try {
      await api.downVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      // Jika API gagal, kembalikan UI ke state awal (Neutral)
      dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }))
    }
  }
}

function asyncToggleNeutralVoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    // Optimistic UI: Langsung ubah UI di layar sebelum memanggil API
    dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }))
    try {
      await api.neutralVoteThread(threadId)
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread
}
