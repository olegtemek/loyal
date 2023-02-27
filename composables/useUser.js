import { useAuthStore } from "@/store/auth.js";
const authStore = useAuthStore();
import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();
import { useCashbackStore } from "@/store/cashback.js";
const cashbackStore = useCashbackStore();

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

  const getProcent = async (user) => {
    let procents = cashbackStore.getCashback;

    let procent = procents[0].cashback

    procents.forEach(proc => {
      if (proc.counter <= user.info[0].lost) {
        return procent = proc.cashback
      }
    });


    return procent
  }

  return {
    userUpdate, hello, getInfoUser, getProcent
  }
}

export default useUser