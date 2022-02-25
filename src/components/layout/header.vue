<template>
  <q-header elevated :class="$q.dark.isActive ? 'q-dark' : 'bg-purple'">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="menu"
        @click="emit('toggleLeftDrawer', !drawer)"
        class="q-mr-sm"
      />
      <q-space></q-space>
      <q-btn
        type="a"
        target="_blank"
        flat
        round
        icon="mdi-github"
        href="https://github.com/opq-osc"
      >
        <q-tooltip> OPQ Open Source Community </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-toolbar inset>
      <q-toolbar-title>
        <strong>{{ $route.meta.desc }}</strong>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { watch, ref } from 'vue';
const $q = useQuasar();
const drawer = ref(false);
const prop = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'toggleLeftDrawer']);
watch(
  () => prop.modelValue,
  () => {
    drawer.value = prop.modelValue;
  }
);
watch(drawer, (drawer) => {
  emit('update:modelValue', drawer);
});
</script>
