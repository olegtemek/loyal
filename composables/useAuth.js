import { useAuthStore } from "@/store/auth.js";
const authStore = useAuthStore();

const useAuth = () => {



  const registration = (data) => {
    authStore.registration(data)
  }
  const login = (data) => {
    authStore.login(data)
  }
  const reset = (data) => {
    authStore.reset(data)
  }
  const checkCode = (data) => {
    authStore.checkCode(data)
  }

  const createUserAdmin = (data) => {
    authStore.createUserAdmin(data)
  }
  return {
    registration, login, reset, checkCode, createUserAdmin
  }
}

export default useAuth