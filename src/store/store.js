import { reactive } from 'vue'
import makeRequest from '@/helper/makeRequest'
export const store = reactive({
  isLoggedIn: (localStorage.getItem('token')!=null),
  currUser: await makeRequest('GET','/users'),
  defaultAmount:0,
  currId:-1
})