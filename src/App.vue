<script setup>
  import { onMounted, onUpdated, watch } from 'vue';
  import { useThemeStore } from './store/useThemeStore';
  import Header from './components/Header.vue';

  const $theme = useThemeStore();


 
</script>

<template>
  <div class="app">
    <Header class="app__header" />
    <div class="app__body">
      <router-view></router-view>
    </div>
  </div>

 
</template>
<style lang="scss">
  .app {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    @include for-device(desktop) {
      flex-direction: row;
    }
    
    &__header {
      position: fixed;
      width: 100%;
      z-index: 10;
      
      @include for-device(desktop) {
        width:max-content;
        height: 100%;
      }
      
    }

    &__body {
      flex: 1;
      width: 100%;
      height: 100%;
      padding-top: 7.2rem;

      @include for-device(desktop) {
        padding-top: 0;
      }


    }
  }

</style>
