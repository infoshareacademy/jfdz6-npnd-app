import firebase from 'firebase'

const SET_USER = 'auth/SET_USER'

const initialState = null

export const signUp = (email, password) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(
    email,
    password
  ).then(
    data => dispatch({type: SET_USER, data})
  )
}

export const signIn = (email, password) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(
    email,
    password
  ).then(
    data => dispatch({type: SET_USER, data})
  )
}
export default (state=initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return action.data
    default:
      return state
  }
}