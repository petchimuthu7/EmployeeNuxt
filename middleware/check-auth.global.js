import { useStore } from '@/store';

export default defineNuxtRouteMiddleware((context) => {
    const store = useStore();
    //store.initAuth();
})
