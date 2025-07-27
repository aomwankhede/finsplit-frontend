import { reactive } from 'vue'

export const store = reactive({
  isLoggedIn: (localStorage.getItem('token')!=null),
  currUser: null,
  defaultAmount:0,
  currId:-1
})