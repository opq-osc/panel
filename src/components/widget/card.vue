<template>
  <div class="col-md-3 col-sm-12 col-xs-12">
    <q-item :style="`background-color: ${background}`" class="q-pa-none">
      <q-item-section
        side
        :style="`background-color: ${color}`"
        class="q-pa-lg q-mr-none text-white"
      >
        <q-icon :name="icon" color="white" size="24px"></q-icon>
      </q-item-section>
      <q-item-section class="q-pa-md q-ml-none text-white">
        <q-item-label class="text-white text-h6 text-weight-bolder">
          {{ value }}
        </q-item-label>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number || String,
    required: false,
    default: 0,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});
</script>
