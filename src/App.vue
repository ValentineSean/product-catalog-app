<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>

    <!-- <SystemLayout /> -->
  </div>
</template>

<script>
  // import SystemLayout from "./components/layout/SystemLayout"

  export default {
    name: 'App',
    components: {
      // SystemLayout
    },
  }
</script>

<style>
  .loading-spinner{
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
</style>
