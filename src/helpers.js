import firebase from 'firebase/app'
import 'firebase/auth'

const addUser = (username, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithUsernameAndPassword(username, password)
      .then(res => resolve(res))  
      .catch(error => reject(error))
  })
}

const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithUsernameAndPassword(username, password)
      .then(res => resolve(res))  
      .catch(error => reject(error))
  })
}

export {addUser, loginUser}