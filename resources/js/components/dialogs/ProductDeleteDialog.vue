<script lang="ts" setup>
import { useProductStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useProductStore();

const { action, product, isDialogVisible } = storeToRefs(store);

const { hideProductDialog, deleteProduct } = store;

const showDialog = computed(() => action.value === "delete");
</script>

<template>
  <el-dialog
    v-if="showDialog"
    v-model="isDialogVisible"
    title="Подтвердите действие"
    width="600px"
    align-center
    @closed="hideProductDialog()"
  >
    <span>Вы уверенны что хотите удалить товар?</span>
    <div>
      <b>{{ product.title }}</b>
    </div>
    <template #footer>
      <el-button type="info" @click="isDialogVisible = false" text
        >Отмена</el-button
      >
      <el-button type="danger" @click="deleteProduct()" plain>
        Удалить
      </el-button>
    </template>
  </el-dialog>
</template>
