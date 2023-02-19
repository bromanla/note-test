<template>
  <span>Изменено: {{ formatDate }}</span>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

const props = defineProps<{ date: Date | string }>();
const formatDate = computed(() => {
  const date =
    typeof props.date === 'string' ? new Date(props.date) : props.date;
  return format(date, isToday(date) ? 'HH:mm' : 'd MMM yyyy г.', {
    locale: ru,
  });
});
</script>

<style scoped lang="scss">
span {
  font-size: 0.75rem;
  color: var(--el-color-info-light-3);
}
</style>
