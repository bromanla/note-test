<template>
  <div class="card" v-loading="api.note.loading">
    <div class="editor">
      <quill-editor
        theme="snow"
        content-type="html"
        :toolbar="toolbar"
        @ready="editorReady"
        @textChange="editorTextChange"
        v-model:content="body.text"
      />
    </div>

    <div class="button-control">
      <date-element
        class="date-element"
        v-if="isEdit"
        :date="body.updatedDate"
      />

      <el-button @click="routeToBack()">Назад</el-button>
      <el-button type="primary" :disabled="isEmptyText" @click="submit()"
        >Сохранить</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '~/composables';
import { RouteName } from '~/router';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import { ElMessage } from 'element-plus';
import type { IFindOneNoteDTO } from '@severstal-test/common';

const route = useRoute();
const router = useRouter();

/* Id редактируемой записи */
let id = NaN;
let quill: Quill;
const isEdit = ref(false);

const toolbar = [
  'bold',
  'italic',
  'underline',
  'strike',
  'code-block',
  'link',
  { color: [] },
  { background: [] },
  { size: ['small', false, 'large'] },
];

const body = ref<IFindOneNoteDTO>({
  id: NaN,
  text: '',
  createdDate: new Date(),
  updatedDate: new Date(),
});

const isEmptyText = ref(true);

const routeToBack = () => router.push({ name: RouteName.Main });

const submit = () => {
  const action = isEdit.value
    ? api.note.update(id, { text: body.value.text })
    : api.note.create({ text: body.value.text });

  action.then((req) => {
    if (req) {
      ElMessage({
        type: 'success',
        message: 'Сохранено',
      });
      routeToBack();
    }
  });
};

const editorReady = (q: Quill) => (quill = q);
const editorTextChange = () =>
  (isEmptyText.value =
    quill && Boolean(quill.getText().trim().length) ? false : true);

onMounted(async () => {
  id = Number(route.params.id);

  if (!isNaN(id) && id > 0) {
    isEdit.value = true;
    body.value = await api.note.findOne({ id });
  }
});
</script>

<style lang="scss">
.card {
  .ql-container {
    min-height: 200px;
  }

  .button-control {
    margin-top: 1rem;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr repeat(3, auto) 1fr;

    > .date-element {
      margin-right: auto;
    }

    > .el-button:nth-child(1) {
      grid-column-start: 2;
    }
  }
}
</style>
