<script lang="ts" setup>
import { Category } from "@/types";
import Layout from "@/Layout.vue";
import { CirclePlus } from "@element-plus/icons-vue";
import CategoryFormDialog from "@/components/dialogs/CategoryFormDialog.vue";
import CategoryDeleteDialog from "@/components/dialogs/CategoryDeleteDialog.vue";
import CategoriesTable from "@/components/tables/CategoriesTable.vue";
import { useCategoryStore } from "@/stores";

interface Props {
  categories: Category[];
}

const props = defineProps<Props>();

const categoryStore = useCategoryStore();

const { showCategoryDialog } = categoryStore;

categoryStore.categories = [...props.categories];
</script>

<template>
  <Layout>
    <CategoryFormDialog />
    <CategoryDeleteDialog />
    <CategoriesTable />
    <template #header-buttons>
      <el-button
        type="primary"
        @click="showCategoryDialog('create')"
        :icon="CirclePlus"
        >Создать категорию</el-button
      >
    </template>
  </Layout>
</template>
