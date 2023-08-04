import type { Action, Product } from "@/types";

import { ElMessage } from "element-plus";
import axios from "axios";
import { defineStore } from "pinia";

interface State {
  products: Product<true>[];
  product: Product<true> | null;
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

export const useProductStore = defineStore({
  id: "product",
  state: (): State => ({
    products: [],
    product: null,
    action: null,
    isDialogVisible: false,
  }),
  actions: {
    createProduct() {
      axios
        .post<Product<true>>(`/products`, this.product)
        .then(({ data: newProduct }) => {
          this.$patch({
            products: [...this.products, newProduct],
          });
          generateMessage("success", "Товар успешно создан");
        })
        .catch(() => {
          generateMessage("error", "Произошла ошибка на сервере");
        })
        .finally(() => {
          this.isDialogVisible = false;
        });
    },
    updateProduct() {
      axios
        .put(`/products/${this.product.id}`, this.product)
        .then(() => {
          const index = this.products.findIndex(
            (p: Product<true>) => p.id === this.product.id
          );
          this.products.splice(index, 1, this.product);
          generateMessage("success", "Товар успешно изменён");
        })
        .catch(() => {
          generateMessage("error", "Произошла ошибка на сервере");
        })
        .finally(() => {
          this.isDialogVisible = false;
        });
    },
    deleteProduct() {
      axios
        .delete(`/products/${this.product.id}`)
        .then(() => {
          this.products = this.products.filter(
            (p: Product<true>) => p.id !== this.product.id
          );
          generateMessage("success", "Товар успешно удалён");
        })
        .catch(() => {
          generateMessage("error", "Произошла ошибка на сервере");
        })
        .finally(() => {
          this.isDialogVisible = false;
        });
    },
    showProductDialog(action: Action, productId?: number) {
      this.isDialogVisible = true;
      this.action = action;
      this.product = productId
        ? { ...this.products.find((p: Product<true>) => p.id === productId) }
        : {};
    },
    hideProductDialog() {
      this.action = null;
    },
  },
});
