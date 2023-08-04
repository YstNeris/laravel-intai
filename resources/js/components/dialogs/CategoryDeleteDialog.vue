<script lang="ts" setup>
import { useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useCategoryStore();

const { action, category, isDialogVisible } = storeToRefs(store);

const { hideCategoryDialog, deleteCategory } = store;

const showDialog = computed(() => action.value === "delete");
</script>

<template>
  <el-dialog
    v-if="showDialog"
    v-model="isDialogVisible"
    title="Подтвердите действие"
    width="600px"
    align-center
    @closed="hideCategoryDialog()"
  >
    <span>Вы уверенны что хотите удалить категорию?</span>
    <div>
      <b>{{ category.title }}</b>
    </div>
    <template #footer>
      <el-button type="info" @click="isDialogVisible = false" text
        >Отмена</el-button
      >
      <el-button type="danger" @click="deleteCategory()" plain>
        Удалить
      </el-button>
    </template>
  </el-dialog>
</template>
