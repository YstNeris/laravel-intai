<script lang="ts" setup>
import { Link } from "@inertiajs/vue3";
import { Postcard, EditPen, Delete } from "@element-plus/icons-vue";
import { useProductStore } from "@/stores";
import { storeToRefs } from "pinia";

const store = useProductStore();

const { products } = storeToRefs(store);

const { showProductDialog } = store;
</script>

<template>
  <el-table :data="products" class="main-data">
    <el-table-column prop="id" label="ID" :width="50" />
    <el-table-column label="Изображение" :width="150">
      <template #default="{ row: { image_url } }">
        <el-image
          class="main-data-image"
          fit="cover"
          :src="image_url"
          :preview-src-list="[image_url]"
          hide-on-click-modal
          preview-teleported
        />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="Наименование" :width="400" />
    <el-table-column prop="description" label="Описание">
      <template #default="{ row: { description } }">
        <span>{{ description.slice(0, 125) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="category.title" label="Категория" :width="200" />
    <el-table-column label="Цена" :width="150">
      <template #default="{ row: { price } }">
        <span>{{ price }} руб.</span>
      </template>
    </el-table-column>
    <el-table-column label="Действия" :width="450">
      <template #default="{ row: { id } }">
        <Link :href="'/products/' + id" style="margin-right: 12px"
          ><el-button type="primary" :icon="Postcard" text
            >Страница товара</el-button
          ></Link
        >
        <el-button
          type="warning"
          @click="showProductDialog('update', id)"
          :icon="EditPen"
          text
          >Изменить</el-button
        >
        <el-button
          type="danger"
          @click="showProductDialog('delete', id)"
          :icon="Delete"
          text
          >Удалить</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
