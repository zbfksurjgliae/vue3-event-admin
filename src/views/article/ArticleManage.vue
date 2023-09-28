<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { artGetListService, artDeleteService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'
// 定义文章参数
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 添加loading处理
const loading = ref(false)
// 定义文章列表数据、获取文章列表数据
const articleList = ref([])
// 定义文章总页数
const total = ref(0)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 搜索、重置按钮函数
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = async () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
// 定义变量
const articleEditRef = ref()
// 编辑、删除、发布按钮函数
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('你确定删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await artDeleteService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
// 分页按钮函数
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 添加或编辑成功后的操作
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染到最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="success" plain round
        >发布文章</el-button
      >
    </template>
    <!-- 主体部分 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章表格展示 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column lable="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" lable="分类"></el-table-column>
      <el-table-column lable="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" lable="状态"></el-table-column>
      <el-table-column width="100" lable="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            circle
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            type="danger"
            plain
            circle
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      background
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
  <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
</template>
