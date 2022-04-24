<template>
  <el-button round size="small" @click="$router.push(`/editor/${id}`)">
    <el-icon><edit /></el-icon>
  </el-button>
  <el-button round size="small" @click="deleteRecord(id)">
    <el-icon><delete /></el-icon>
  </el-button>
</template>

<script>
  import { ElMessage, ElMessageBox, ElButton, ElIcon } from 'element-plus'
  import { Delete, Edit, Search } from '@element-plus/icons-vue'

  export default {
    name: 'note-control',
    components: { Edit, Delete, Search, ElButton, ElIcon },
    props: ['id'],
    methods: {
      deleteRecord: async function (id) {
        ElMessageBox
          .confirm(`Удалить запись?`, {
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            type: 'warning'
          })
          .then(() => {
            return this.$store.dispatch('deleteRecord', id)
          })
          .then(() => ElMessage({ type: 'success', message: 'Запись удалена' }))
          .catch((e) => {
            if (e !== 'cancel')
              ElMessage({ type: 'error', message: e.message })
          })
      }
    },
  }
</script>