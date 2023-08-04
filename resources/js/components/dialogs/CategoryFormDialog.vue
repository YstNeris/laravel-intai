<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import { Category } from "@/types";

const store = useCategoryStore();

const { action, category, isDialogVisible } = storeToRefs(store);

const { hideCategoryDialog, createCategory, updateCategory } = store;

const showDialog = computed(() => ["create", "update"].includes(action.value));

const dialogTitle = computed(() =>
  action.value === "create" ? "Создание категории" : "Изменение категории"
);
const buttonTitle = computed(() =>
  action.value === "create" ? "Создать" : "Сохранить"
);
const buttonAction = computed(() =>
  action.value === "create" ? createCategory : updateCategory
);

const categoryFormRef = ref<FormInstance>();

const rules = reactive<FormRules<Category>>({
  title: [
    {
      required: true,
      message: "Наименование категории обязательное поле для заполнения",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      buttonAction.value();
    }
  });
};
</script>

<template>
  <el-dialog
    v-if="showDialog"
    v-model="isDialogVisible"
    :title="dialogTitle"
    width="600px"
    align-center
    @closed="hideCategoryDialog()"
  >
    <el-form
      ref="categoryFormRef"
      label-position="top"
      :rules="rules"
      :model="category"
    >
      <el-form-item label="Наименование" prop="title">
        <el-input
          v-model="category.title"
          placeholder="Введите наименование товара"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" @click="isDialogVisible = false" text
        >Отмена</el-button
      >
      <el-button type="primary" @click="submitForm(categoryFormRef)" plain>
        {{ buttonTitle }}
      </el-button>
    </template>
  </el-dialog>
</template>
