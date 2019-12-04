export default function (state = {
  userInfo: {}
}, action) {
  let {
    userInfo
  } = state

  switch (action.type) {

    case 'setUserInfo':

      return action.userInfo

    default:

      return userInfo

  }

}
