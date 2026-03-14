import api from '../../utils/api'

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
}

function receiveUsersActionCreator (users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users
    }
  }
}

// Tambahkan fungsi thunk ini
function asyncRegisterUser ({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password })
    } catch (error) {
      alert(error.message)
      throw error
    }
  }
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser
}
