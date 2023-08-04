<script lang="ts" setup>
import { Category, Product } from "@/types";
import Layout from "@/Layout.vue";
import { Link } from "@inertiajs/vue3";
import { ArrowLeft, EditPen } from "@element-plus/icons-vue";
import ProductFormDialog from "@/components/dialogs/ProductFormDialog.vue";
import { useProductStore, useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";

interface Props {
  product: Product<true>;
  categories: Category[];
}

const props = defineProps<Props>();

const store = useProductStore();
const categoryStore = useCategoryStore();

const { showProductDialog } = store;

store.products = [{ ...props.product }];
store.product = store.products[0];
categoryStore.categories = [...props.categories];

const { product } = storeToRefs(store);
</script>

<template>
  <Layout>
    <ProductFormDialog />
    <el-row justify="space-around" align="middle" class="main-data">
      <el-col :span="5">
        <el-card>
          <template #header>
            <el-col :span="24" class="justify-between">
              <Link href="/products"
                ><el-button type="info" :icon="ArrowLeft" text
                  >Назад</el-button
                ></Link
              >
              <el-button
                type="warning"
                @click="showProductDialog('update', product.id)"
                :icon="EditPen"
                text
                >Изменить</el-button
              >
            </el-col>
          </template>
          <el-image
            class="card-image"
            fit="cover"
            :src="product.image_url"
            :preview-src-list="[product.image_url]"
            hide-on-click-modal
            preview-teleported
          />
          <h3>{{ product.title }} | {{ product.category.title }}</h3>
          <p>
            {{ product.description }}
          </p>
          <el-tag size="large"> {{ product.price }} руб. </el-tag>
        </el-card>
      </el-col>
    </el-row>
  </Layout>
</template>

<style scoped>
.card-image {
  display: flex;
}
</style>
