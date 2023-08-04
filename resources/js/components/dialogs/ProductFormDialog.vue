<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { useProductStore, useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import { Category, Product } from "@/types";

const store = useProductStore();
const { categories } = useCategoryStore();

const { action, product, isDialogVisible } = storeToRefs(store);

const { hideProductDialog, createProduct, updateProduct } = store;

const showDialog = computed(() => ["create", "update"].includes(action.value));

const dialogTitle = computed(() =>
  action.value === "create" ? "Создание товара" : "Изменение товара"
);
const buttonTitle = computed(() =>
  action.value === "create" ? "Создать" : "Сохранить"
);
const buttonAction = computed(() =>
  action.value === "create" ? createProduct : updateProduct
);

const productFormRef = ref<FormInstance>();

const rules = reactive<FormRules<Product>>({
  title: [
    {
      required: true,
      message: "Наименование товара обязательное поле для заполнения",
      trigger: "blur",
    },
  ],
  category_id: [
    {
      required: true,
      message: "Категория товара обязательное поле для выбора",
      trigger: "blur",
    },
  ],
  price: [
    {
      required: true,
      message: "Цена товара обязательное поле для заполнения",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      product.value.category = categories.find(
        (c: Category) => c.id === product.value.category_id
      );
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
    @closed="hideProductDialog()"
  >
    <el-form
      ref="productFormRef"
      label-position="top"
      :rules="rules"
      :model="product"
    >
      <el-image
        class="form-image"
        fit="cover"
        :src="product.image_url"
        :preview-src-list="[product.image_url]"
        hide-on-click-modal
        preview-teleported
        v-if="product.image_url"
      />
      <el-form-item label="Наименование" prop="title">
        <el-input
          v-model="product.title"
          placeholder="Введите наименование товара"
        />
      </el-form-item>
      <el-form-item label="Описание" prop="description">
        <el-input
          v-model="product.description"
          type="textarea"
          placeholder="Введите описание товара"
        />
      </el-form-item>
      <el-form-item label="Ссылка на изображение" prop="image_url">
        <el-input
          v-model="product.image_url"
          placeholder="Введите ссылку на изображение товара"
        />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Категория" prop="category_id">
            <el-select
              v-model="product.category_id"
              placeholder="Выберите категорию товара"
              class="w-100"
            >
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.title"
                :value="category.id"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Цена" prop="price">
            <el-input-number v-model="product.price" :min="1" class="w-100" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="info" @click="isDialogVisible = false" text
        >Отмена</el-button
      >
      <el-button type="primary" @click="submitForm(productFormRef)" plain>
        {{ buttonTitle }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style>
.form-image {
  display: flex !important;
  width: 250px;
  height: 250px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: auto;
}
</style>
