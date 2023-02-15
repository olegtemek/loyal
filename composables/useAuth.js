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

  return {
    registration, login, reset, checkCode
  }
}

export default useAuth