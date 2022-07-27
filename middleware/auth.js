import { useStore } from '@/store';

export default defineNuxtRouteMiddleware(() => {
    const store = useStore();
    store.checkAuth()
})
