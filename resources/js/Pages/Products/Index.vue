<script lang="ts" setup>
import { Category, Product } from "@/types";
import Layout from "@/Layout.vue";
import { CirclePlus } from "@element-plus/icons-vue";
import ProductsTable from "@/components/tables/ProductsTable.vue";
import ProductFormDialog from "@/components/dialogs/ProductFormDialog.vue";
import ProductDeleteDialog from "@/components/dialogs/ProductDeleteDialog.vue";
import { useProductStore, useCategoryStore } from "@/stores";

interface Props {
  products: Product<true>[];
  categories: Category[];
}

const props = defineProps<Props>();

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const { showProductDialog } = productStore;

productStore.products = [...props.products];
categoryStore.categories = [...props.categories];
</script>

<template>
  <Layout>
    <ProductFormDialog />
    <ProductDeleteDialog />
    <ProductsTable />
    <template #header-buttons>
      <el-button
        type="primary"
        @click="showProductDialog('create')"
        :icon="CirclePlus"
        >Создать товар</el-button
      >
    </template>
  </Layout>
</template>
