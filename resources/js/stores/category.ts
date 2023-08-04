import type { Action, Category } from "@/types";

import { ElMessage } from "element-plus";
import axios from "axios";
import { defineStore } from "pinia";

interface State {
  categories: Category[];
  category: Category | null;
  action: Action;
  isDialogVisible: boolean;
}

const generateMessage = (type: "success" | "error", message: string) => {
  ElMessage({
    message,
    type,
    showClose: true,
  });
};

export const useCategoryStore = defineStore({
  id: "category",
  state: (): State => ({
    categories: [],
    category: null,
    action: null,
    isDialogVisible: false,
  }),
  actions: {
    createCategory() {
      axios
        .post<Category>(`/categories`, this.category)
        .then(({ data: newCategory }) => {
          this.$patch({
            categories: [...this.categories, newCategory],
          });
          generateMessage("success", "Категория успешно создана");
        })
        .catch(() => {
          generateMessage("error", "Произошла ошибка на сервере");
        })
        .finally(() => {
          this.isDialogVisible = false;
        });
    },
    updateCategory() {
      axios
        .put(`/categories/${this.category.id}`, this.category)
        .then(() => {
          const index = this.categories.findIndex(
            (c: Category) => c.id === this.category.id
          );
          this.categories.splice(index, 1, this.category);
          generateMessage("success", "Категория успешно изменена");
        })
        .catch(() => {
          generateMessage("error", "Произашла ошибка на сервере");
        })
        .finally(() => {
          this.isDialogVisible = false;
        });
    },
    deleteCategory() {
      axios
        .delete(`/categories/${this.category.id}`)
        .then(() => {
          this.categories = this.categories.filter(
            (c: Category) => c.id !== this.category.id
          );
          generateMessage("success", "Категория успешно удалена");
        })
        .catch(() => {
          generateMessage("error", "Произашла ошибка на сервере");
        })
        .finally(() => {
          this.isDialogVisible = false;
        });
    },
    showCategoryDialog(action: Action, categoryId?: number) {
      this.isDialogVisible = true;
      this.action = action;
      this.category = categoryId
        ? { ...this.categories.find((c: Category) => c.id === categoryId) }
        : {};
    },
    hideCategoryDialog() {
      this.action = null;
    },
  },
});
