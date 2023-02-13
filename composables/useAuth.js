import { useAuthStore } from "@/store/auth.js";
const authStore = useAuthStore();

const useAuth = () => {



  const registration = (data) => {
    authStore.registration(data)
  }
  const login = (data) => {
    authStore.login(data)
  }

  return {
    registration, login
  }
}

export default useAuth