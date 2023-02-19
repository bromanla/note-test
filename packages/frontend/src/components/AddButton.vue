<template>
  <el-button circle type="primary" :icon="Plus" @click="onClick()"></el-button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { useCounterStore } from '~/stores/counter';

const emit = defineEmits(['onClick']);
const counterStore = useCounterStore();
const onClick = () => {
  counterStore.increment();
  emit('onClick');
};
</script>

<style scoped lang="scss">
.el-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 9999;
}
</style>
