<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
// 从store获取获取个人信息
const userStore = useUserStore()
const {
  user: { username, nickname, email, id }
} = userStore
const userInfo = ref({ username, nickname, email, id })
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,15}$/,
      message: '昵称必须是2-15位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
}
// 获取表单节点
const userFormRef = ref()
// 提交个人信息函数
const onSubmit = async () => {
  const valid = await userFormRef.value.validate
  if (valid) {
    await userUpdateInfoService(userInfo.value)
    await userStore.getUser()
    ElMessage.success('修改成功')
  }
}
</script>

<template>
  <page-container title="基本资料">
    <!-- 主体部分 -->
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="userFormRef"
          label-width="100px"
          size="large"
          style="justify-content: flex-start"
        >
          <el-form-item label="登录名称：">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称：" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱：" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
