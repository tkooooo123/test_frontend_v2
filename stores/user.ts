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
        const data: User[] = await $fetch('/api/user')
        this.users = data || []
      } catch {
      }
    }
  }
})