import api from '../../utils/api'
import { setAuthUserActionCreator } from '../authUser/action'
import { showLoading, hideLoading } from 'react-redux-loading-bar' // 1. Import ini

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreloadActionCreator (isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload }
  }
}

function asyncPreloadProcess () {
  return async (dispatch) => {
    dispatch(showLoading()) // 2. Nyalakan loading bar
    try {
      const authUser = await api.getOwnProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      dispatch(setAuthUserActionCreator(null))
    } finally {
      dispatch(setIsPreloadActionCreator(false))
      dispatch(hideLoading()) // 3. Matikan loading bar
    }
  }
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess
}
