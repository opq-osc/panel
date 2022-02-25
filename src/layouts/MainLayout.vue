<template>
  <q-layout view="lHh Lpr lFf">
    <Header v-model="drawer" @toggleLeftDrawer="drawer = !drawer" />
    <Drawer v-model="drawer" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import Header from '../components/layout/header.vue';
import Drawer from '../components/layout/drawer.vue';
import { ref } from 'vue';
const drawer = ref(false);
</script>
