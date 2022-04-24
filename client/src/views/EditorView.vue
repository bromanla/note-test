<template>
  <el-card>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>

    <div class="editorPanel">
      <el-button :disabled="isEmptyText" @click="save" type="primary">Сохранить</el-button>
    </div>
  </el-card>
</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { ElCard, ElButton, ElLoading } from 'element-plus'

  export default {
    components: {
      ElCard,
      ElButton,
      ElLoading,
      ckeditor: CKEditor.component,
    },
    data() {
      return {
        id: NaN,
        isEdit: false,
        isLoading: false,
        editorData: '',
        editor: ClassicEditor,
        editorConfig: {
          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', '|', 'undo', 'redo' ]
        }
      };
    },
    computed: {
      isEmptyText: function () {
        return this.editorData.trim().length === 0;
      }
    },
    methods: {
      save: async function () {
        const loadingInstance = ElLoading.service({ target: '.el-card' });

        if (this.isEdit)
          await this.$store.dispatch('patchNoteById', { id: this.id, text: this.editorData });
        else
          await this.$store.dispatch('createNote', this.editorData );

        loadingInstance.close();
        this.$router.push(`/`);
      }
    },
    async mounted() {
      this.id = Number(this.$route.params.id);

      if (!isNaN(this.id)) {
        const note = await this.$store.dispatch('fetchNoteById', this.id);
        this.editorData = note.text;
        this.isEdit = true;
      }
    }
  }
</script>

<style>
  .ck-editor__editable_inline {
    min-height: 200px;
  }

  .editorPanel {
    display: flex;
    justify-content: right;
    margin-top:  0.5rem;
  }
</style>

