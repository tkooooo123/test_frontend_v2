interface User {
  id: number
  name: string
  age: number
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),

  actions: {
    // 這裡只能呼叫自己的 /api/user
    async fetchUsers() {
      try {
        const { data, error } = await useFetch<User[]>('/api/user')

        if (error.value) {
          throw new Error(error.value.message)
        }
        this.users = data.value || []
      } catch {

      }
    }
  }
})