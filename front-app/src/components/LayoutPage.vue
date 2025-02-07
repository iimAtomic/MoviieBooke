<!-- Layout.vue -->
<template>
  <div>
    <NavbarPage />
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarPage from './NavbarPage.vue';

export default {
  components: {
    NavbarPage,
  },
};
</script>
