<template>
  <div class="card">
    <div class="text" v-html="props.note.text" />

    <el-divider class="divider" />

    <div class="note-control">
      <el-button-group size="small">
        <el-button :icon="Edit" @click="emits('onEdit')" />
        <el-button :icon="Delete" @click="emits('onRemove')" />
      </el-button-group>
    </div>

    <el-dialog></el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import type { IBaseNoteDTO } from '@severstal-test/common';

const props = defineProps<{ note: IBaseNoteDTO }>();
const emits = defineEmits(['onEdit', 'onRemove']);
</script>

<style scoped lang="scss">
.card {
  .text {
    text-align: left;
  }
  .divider {
    margin: 1rem 0;
  }

  .note-control {
    display: flex;
    justify-content: right;
  }
}
</style>
