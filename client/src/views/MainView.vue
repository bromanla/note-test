<template>
  <el-empty v-if="allNotes.length === 0" description="Пусто" />
  <el-card v-for="note in allNotes" :key="note.id">
    <el-row class="text">
      <p v-html="note.text"></p>
    </el-row>
    <el-divider/>
    <el-row>
      <note-control :id = "note.id"></note-control>
    </el-row>
  </el-card>

  <fixed-add-button></fixed-add-button>
</template>

<script>
  import { ElEmpty, ElCard, ElDivider, ElRow } from 'element-plus';
  import { mapGetters } from 'vuex';
  import NoteControl from '@/components/NoteControl.vue';
  import FixedAddButton from '@/components/FixedAddButton.vue';

  export default {
    name: 'main-view',
    components: { ElEmpty, ElCard, ElDivider, ElRow, NoteControl, FixedAddButton },
    computed: mapGetters(['allNotes']),
  }
</script>

<style scoped>
  .el-divider--horizontal {
    margin: 12px 0 12px 0;
  }

  .text {
    text-align: left
  }
</style>

