<template>
  <header>
    <router-link class="logo" :to="{ name: RouteName.Main }"
      >Заметки</router-link
    >
    <el-dropdown>
      <el-button class="dropdown-button" type="danger" :icon="Setting" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toggleTheme()">{{
            themeText
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
  <el-divider />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import { toggleTheme, isDark } from '~/composables';
import { RouteName } from '~/router';

const themeText = computed(() =>
  isDark.value ? 'Светлая тема' : 'Темная тема',
);
</script>

<style scoped lang="scss">
.el-divider {
  margin: 0 0 1rem 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--el-color-info);
}
</style>
