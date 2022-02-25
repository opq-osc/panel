<template>
  <q-drawer v-model="drawer" show-if-above :width="250">
    <q-card flat>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="38px">
            <img
              src="https://avatars.githubusercontent.com/u/82746709?s=200&v=4"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>OPQ</q-item-label>
          <q-item-label caption> panel </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-list padding>
      <q-item
        active-class="text-pink"
        clickable
        v-ripple
        v-for="item in menu"
        :key="item.title"
        :to="item.link"
        exact
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" color="item.color" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">{{ item.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-toolbar class="fixed-bottom">
      <q-btn
        @click="$q.fullscreen.toggle()"
        flat
        round
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        class="q-mr-sm"
      />
      <q-space />
      <q-btn
        @click="dark"
        flat
        round
        dense
        :icon="
          !$q.dark.isActive ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
        "
        class="q-mr-sm"
      />
    </q-toolbar>
  </q-drawer>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { watch, ref } from 'vue';
const $q = useQuasar();
const dark = () => {
  $q.dark.toggle();
  $q.localStorage.set('dark', $q.dark.isActive);
};
const drawer = ref(false);
const prop = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'upgrade']);
watch(
  () => prop.modelValue,
  () => {
    drawer.value = prop.modelValue;
  }
);
watch(drawer, (drawer) => {
  emit('update:modelValue', drawer);
});
const menu: { title: string; color: string; icon: string; link: string }[] = [
  {
    title: '控制台',
    color: 'purple',
    icon: 'mdi-desktop-mac-dashboard',
    link: '/dashboard',
  },
  {
    title: '插件',
    color: 'pink',
    icon: 'mdi-chart-tree',
    link: '/plugins',
  },
  {
    title: 'Api Test',
    color: 'pink',
    icon: 'mdi-api',
    link: '',
  },
  {
    title: 'chat',
    color: 'pink',
    icon: 'mdi-chat',
    link: 'chat',
  },
];
</script>
