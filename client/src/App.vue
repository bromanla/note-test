<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col class="logo">
          <router-link to="/">Заметки</router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import { ElContainer, ElHeader, ElRow, ElCol, ElMain, ElLoading } from 'element-plus';

  export default {
    components: { ElContainer, ElHeader, ElRow, ElCol, ElMain },
    async mounted() {
      const loadingInstance = ElLoading.service({ target: '.el-main' });
      await this.$store.dispatch('fetchNotes');
      this.$nextTick(() => loadingInstance.close())
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: #f5f5f5;
    color: #2c3e50;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .el-card {
    margin: 0 auto 0.4rem auto;
    max-width: 800px
  }

  .el-header {
    background-color: #354e5b;
    color: #e9e9e9;
    line-height: 60px;
  }

  .logo {
    text-align: left;
  }

  .logo a {
    text-decoration: none;
    color: #f8f8f8;
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media (max-width: 650px)  {
    html {
      font-size: 14px;
    }
  }
</style>
