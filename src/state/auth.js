import firebase from 'firebase'

const SET_USER = 'auth/SET_USER'
const ERROR = 'auth/ERROR'
const LOG_OUT = 'auth/LOG_OUT'

const initialState = {
  data: null,
  error: null,
  name: null
}

let unsubscribe = null
export const enableSync = () => dispatch => {
  dispatch(disableSync())
  unsubscribe = firebase.auth().onAuthStateChanged(
    user => {
      if (user && user.uid) {

        let ref = firebase.database().ref('/users/' + user.uid)

        ref.on("value", function (snap) {
          console.log(snap.val().name)
          user.updateProfile({ displayName: snap.val().name })
          user.alamakota = snap.val().name
          dispatch({type: SET_USER, data: user})
        })
      }
      dispatch({type: SET_USER, data: user})
    }
  )
}

export const disableSync = () => dispatch => {
  if (unsubscribe !== null) {
    unsubscribe()
  }
}

export const signUp = (email, password, other) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(
    email,
    password
  ).then(
    user => {
      firebase.database().ref('/users/' + user.uid).set(other)
    }
  ).catch(
    error => dispatch({type: ERROR, error})
  )
}

export const signIn = (email, password) => dispatch => {
  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(
    email,
    password
  ).catch(
    error => dispatch({type: ERROR, error})
  )
}

export const signOut = () => dispatch => {

  firebase.auth().signOut().catch(
    error => dispatch({type: ERROR, error})
  )
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'RESET':
      return {
        ...state,
        error: null
      }
    case SET_USER:
      return {
        ...state,
        data: action.data,
        error: null
      }
    case ERROR:
      return {
        ...state,
        error: action.error
      }
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}