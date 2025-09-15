import axios from 'axios'
export default defineEventHandler(async () => {
 try {
   const res = await axios.get(`https://38839.wu.elitepro.ltd/api/user`)
   return res.data.data
 } catch {
 }
})