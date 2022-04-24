<template>
  <el-tooltip content="Добавить" placement="top">
    <el-button
      circle
      size="large"
      type="primary"
      @click="$router.push(`/editor`)">
      <el-icon><plus /></el-icon>
    </el-button>
  </el-tooltip>
</template>

<script>
  import { Plus } from '@element-plus/icons-vue';
  import { ElTooltip, ElButton, ElIcon } from 'element-plus';

  export default {
    name: 'fixed-add-button',
    components: { Plus, ElTooltip, ElButton, ElIcon }
  }
</script>

<style scoped>
  .el-button {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 9999;
  }
</style>
