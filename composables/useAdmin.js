import { useAuthStore } from "@/store/auth.js";
const authStore = useAuthStore();
import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();
import { useAdminStore } from "@/store/admin.js";
const adminStore = useAdminStore();

const useAdmin = () => {

  const userUpdate = (data) => {
    userStore.update(data)
  }

  const userTransaction = (data) => {
    adminStore.userTransaction(data)
  }


  return {
    userUpdate, userTransaction
  }
}

export default useAdmin