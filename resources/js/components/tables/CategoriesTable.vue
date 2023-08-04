<script lang="ts" setup>
import { EditPen, Delete } from "@element-plus/icons-vue";
import { useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";

const store = useCategoryStore();

const { categories } = storeToRefs(store);

const { showCategoryDialog } = store;
</script>

<template>
  <el-table :data="categories" class="main-data">
    <el-table-column prop="id" label="ID" :width="50" />
    <el-table-column prop="title" label="Наименование" />
    <el-table-column label="Действия" :width="300">
      <template #default="{ row: { id } }">
        <el-button
          type="warning"
          @click="showCategoryDialog('update', id)"
          :icon="EditPen"
          text
          >Изменить</el-button
        >
        <el-button
          type="danger"
          @click="showCategoryDialog('delete', id)"
          :icon="Delete"
          text
          >Удалить</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
