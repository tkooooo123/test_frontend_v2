<template>
  <div class="bg-#2a2a2a min-h-100vh flex flex-col items-center justify-center">
    <div class="w-100 h-60 p-6 border-1 border-solid border-#757575 rounded-2">
      <h2 class="text-center text-white text-2xl font-bold`">操作</h2>
      <ETextField :label="'姓名'" v-model="form.name" :id="'name'" :type="'text'" />
      <ETextField :label="'年齡'" class="mt-2" v-model="form.age" :id="'age'" :type="'number'" />
      <div class="flex justify-end mt-4">
        <EBtn :text="'修改'" :color="'success'" class="mr-4" />
        <EBtn :text="'新增'" :color="'warn'" @click="handleSubmit" />
      </div>
    </div>
    <div class="w-100 mt-4 p-6 border-1 border-solid border-#757575 rounded-2">
      <table class="text-white text-center w-full">
        <thead>
          <th>#</th>
          <th>名字</th>
          <th class="w-10">年齡</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>
              <div class="flex justify-center">
                <EBtn :text="'修改'" :color="'success'" class="mr-4" />
                <EBtn :text="'刪除'" :color="'error'" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

interface User {
  name: string
  age: number | null
}
const userStore = useUserStore()
const { fetchUsers } = userStore
const { users } = storeToRefs(userStore)
const baseUrl = 'https://38839.wu.elitepro.ltd/api' // 後端網址 將由面試官提供
const form = reactive<User>({
  name: '',
  age: null
})

const handleSubmit = async () => {
  try {

    const res = await axios.post(`${baseUrl}/user`, {
      name: form.name,
      age: Number(form.age)
    })
  } catch {
  }
}

await fetchUsers()
</script>

<style scoped lang="scss"></style>
