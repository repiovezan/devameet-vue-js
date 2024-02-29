import { defineStore } from 'pinia'

export const useAccessTokenStore = defineStore({
    id: 'accessToken',
    state: () => ({
        token: localStorage.getItem('token')
    }),
    getters: {
        isAuthtenticated: (state) => state.token !== null
            && state.token !== undefined
            && state.token !== ''
    },
    actions: {
        setStoken(t: string) {
            this.token = t;
        }
    }
})