<template>
  <div class="bg-#2a2a2a min-h-100vh">
    <div class="flex justify-end px-6 text-white">
      <EBtn :text="'中文'" @click="switchLocale('zh-TW')" />
      <EBtn :text="'English'" class="ml-2" @click="switchLocale('en-US')" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="w-100 h-60 p-6 border-1 border-solid border-#757575 rounded-2">
    
    <h2 class="text-center text-white text-2xl font-bold`">{{ t('operation') }}</h2>
    <ETextField :label="t('name')" v-model="form.name" :id="'name'" :type="'text'" />
    <ETextField :label="t('age')" class="mt-2" v-model="form.age" :id="'age'" :type="'number'" />
    <div class="flex justify-end mt-4">
      <EBtn :text="t('edit')" :color="'success'" class="mr-4" @click="openDialog('edit')" />
      <EBtn :text="t('add')" :color="'warn'" @click="openDialog('add')" />
    </div>
  </div>
  <div class="w-100 mt-4 p-6 border-1 border-solid border-#757575 rounded-2" v-if="users.length > 0">
    <table class="text-white text-center w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ t('name') }}</th>
          <th class="w-10">{{ t('age') }}</th>
          <th>{{ t('operation') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>
            <div class="flex justify-center">
              <EBtn :text="t('edit')" :color="'success'" class="mr-4" @click="() => {
                currentUserId = user.id
                form.name = user.name
                form.age = user.age
              }" />
              <EBtn :text="t('delete')" :color="'error'" @click="openDialog('delete', user)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
   
    <!-- 確認 dialog -->
    <dialog ref="confirmDialog" class="rounded-4 border-none">
      <p>{{ dialogMessage }}</p>
      <div class="flex justify-end mt-2">
        <EBtn :text="t('cancel')" :color="'error'" class="mr-4" @click="closeDialog" />
        <EBtn :text="t('confirm')" :color="'success'" @click="confirmAction" />
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t, setLocale  } = useI18n()
// 切換語系
const switchLocale = (lang: 'zh-TW' | 'en-US') => {
  setLocale(lang)
}


interface User {
  name: string
  id?: number
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

// 新增功能
const handleSubmit = async () => {
  try {

    const res = await axios.post(`${baseUrl}/user`, {
      name: form.name,
      age: Number(form.age)
    })
    if (res.status === 200) {
      form.name = ''
      form.age = null
      await fetchUsers()
    }
  } catch (err) {
    console.error(err)
  }
}
// 修改功能
const handleEdit = async () => {
  try {
    const res = await axios.put(`${baseUrl}/user`, {
      name: form.name,
      age: Number(form.age),
      id: currentUserId.value
    })
    if (res.status === 200) {
      form.name = ''
      form.age = null
      await fetchUsers()
    }
  } catch (err) {
    console.error(err)
  }
}
// 刪除功能
const handleDelete = async () => {
  try {
    const res = await axios.delete(`${baseUrl}/user`, {
      data: { id: currentUserId.value }
    })
    if (res.status === 200) {
      await fetchUsers()
    }
  } catch (err) {
    console.error(err)
  }
}
//確認 dialog 相關功能
type ActionType = 'add' | 'edit' | 'delete'
const confirmDialog = ref<HTMLDialogElement | null>(null)
const currentAction = ref<ActionType | null>(null)
const currentUserId = ref<number | undefined>()
const dialogMessage = ref('')

// 打開 dialog
const openDialog = (action: ActionType, user?: User) => {
  currentAction.value = action
  if (user) {
    currentUserId.value = user?.id
  }
  if (action === 'add' && currentUserId.value) {
    form.name = ''
    form.age = null
    currentUserId.value = undefined
    return
  } else if (action === 'add') {
    dialogMessage.value = t('confirm_add')
    console.log(t('confirm_add'))
  }
  if (action === 'edit') {
    dialogMessage.value = t('confirm_edit', { id: currentUserId.value || '' })
  }
  if (action === 'delete') dialogMessage.value = t('confirm_delete', { id: currentUserId.value || '' })
  confirmDialog.value?.showModal()
}
// 關閉 dialog
const closeDialog = () => {
  confirmDialog.value?.close()
  currentAction.value = null
}
// 點擊確認後執行操作
const confirmAction = () => {
  try {
    if (currentAction.value === 'delete') {
      handleDelete()
    }
    if (currentAction.value === 'add') {
      handleSubmit()
    }
    if (currentAction.value === 'edit') {
      handleEdit()
    }
  } catch (err) {
    console.error(err)
  } finally {
    confirmDialog.value?.close()
  }


}
onMounted(() => {
  fetchUsers()
 
})
</script>

<style scoped lang="scss"></style>
