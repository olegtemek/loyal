import { useAuthStore } from "@/store/auth.js";
const authStore = useAuthStore();
import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();

const useUser = () => {

  const userUpdate = (data) => {
    userStore.update(data)
  }

  const getInfoUser = () => {
    return authStore.getUser
  }

  const hello = () => {
    let h = (new Date()).getHours();

    let text = '';
    if (h > 23 || h < 7) text = 'Доброй ночи';
    if (h > 6 && h < 12) text = 'Доброе утро';
    if (h > 11 && h < 19) text = 'Добрый день';
    if (h > 18 && h < 24) text = 'Добрый вечер';
    return text
  }

  return {
    userUpdate, hello, getInfoUser
  }
}

export default useUser