<template>
  <div
    class="loading-wrapper"
    v-loading="api.note.loading"
    element-loading-background="transparent"
  >
    <template v-if="notes.length">
      <note-card
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @onEdit="routeToEdit(note.id)"
        @onRemove="removeItem(note.id)"
      />
    </template>
    <el-empty v-if="!api.note.loading && !notes.length" description="Пусто" />
  </div>

  <el-pagination
    hide-on-single-page
    layout="prev, pager, next"
    @update:current-page="loadData"
    :current-page="options.currentPage"
    :page-count="options.totalPage"
  />

  <add-button @onClick="routeToAdd()" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, defaultOption } from '~/composables';
import { RouteName } from '~/router';
import { ElMessageBox } from 'element-plus';
import type { IFindAllNoteDTO } from '@severstal-test/common';

const route = useRoute();
const router = useRouter();
const notes = ref<IFindAllNoteDTO['data']>([]);
const options = ref(defaultOption);

const loadData = async (page?: number) => {
  if (page) options.value.currentPage = page;

  const data = await api.note.findAll({ page: options.value.currentPage });
  notes.value = data.data;
  options.value = data.option;
  router.push({ query: { page: String(data.option.currentPage) } });
};

const routeToAdd = () => router.push({ name: RouteName.Editor });

const routeToEdit = (id: number) =>
  router.push({ name: RouteName.Editor, params: { id } });

const removeItem = (id: number) =>
  ElMessageBox.confirm(`Удалить запись #${id}?`, {
    confirmButtonText: 'Да',
    cancelButtonText: 'Нет',
    type: 'warning',
  })
    .then(() => api.note.remove(id))
    .then(() => loadData());

onMounted(() => {
  const page = Number(route.query.page);
  Number.isNaN(page) ? loadData() : loadData(page);
});
</script>

<style lang="scss">
.el-pagination {
  margin: 0 auto;
}

.loading-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 150px;
}
</style>
