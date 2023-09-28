<script setup>
import { Plus, Upload, CirclePlus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'
// 定义变量
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
// 定义上传函数
const onUploadFile = (file) => {
  // 这里将图片转化成base64格式
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
// 定义更新头像函数
const onUpdate = async () => {
  await userUpdateAvatarService(imgUrl.value)
  await userStore.getUser()
  ElMessage.success('更换头像成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="8">
        <el-form size="large">
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onUploadFile"
              ref="uploadRef"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <el-icon
                v-else
                arc="@/assets/avatar.jpg"
                class="avatar-uploader-icon"
                ><Plus
              /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              :icon="CirclePlus"
              size="large"
              @click="uploadRef.$el.querySelector('input').click()"
              >选择图片</el-button
            >
            <el-button
              type="warning"
              plain
              :icon="Upload"
              size="large"
              @click="onUpdate"
              >上传头像</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 245px;
      height: 245px;
      display: block;
    }
    .el-upload {
      border: 2px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 245px;
      height: 245px;
      text-align: center;
    }
  }
}
</style>
