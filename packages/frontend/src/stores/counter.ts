import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCounterStore = defineStore('counter', () => {
  const count = useLocalStorage('count', 0);

  function increment() {
    count.value = count.value + 1;
  }

  return { count, increment };
});
