<script lang="ts" setup>
import { Link } from "@inertiajs/vue3";

const links = [
  { url: "/products", title: "Товары" },
  { url: "/categories", title: "Категории" },
];
</script>

<template>
  <el-menu mode="horizontal" :default-active="$page.url" :ellipsis="false">
    <div class="el-menu-buttons">
      <Link class="d-flex" v-for="{ url, title } in links" :href="url"
        ><el-menu-item :index="url">{{ title }}</el-menu-item></Link
      >
    </div>
    <div class="el-menu-buttons">
      <slot name="header-buttons" />
    </div>
  </el-menu>
  <slot />
</template>

<style lang="scss">
.el-menu {
  justify-content: space-between;

  &-buttons {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
