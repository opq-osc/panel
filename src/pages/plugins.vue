<template>
  <q-card flat>
    <q-card-section>
      <q-chip
        clickable
        @click="onePlugin(item)"
        v-for="(item, index) in state.PluginsList"
        :key="index"
      >
        {{ item }}
      </q-chip>
    </q-card-section>
  </q-card>
  <q-dialog v-model="dialog" position="bottom">
    <q-card flat style="width: 420px">
      <q-linear-progress :value="1" color="pink" />
      <q-card-section class="row items-center no-wrap">
        <v-ace-editor
          v-model:value="state.LuaFileSrc"
          lang="lua"
          theme="chrome"
          style="width: 100%; height: 480px"
          :options="{ useWorker: true }"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn @click="save" flat color="pink">保存</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { inject, reactive, ref } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';

const $q = useQuasar();

const ws = inject('ws') as SocketIOClient.Socket;

const dialog = ref(false);

const state = reactive({
  LuaFileName: '',
  LuaFileSrc: '',
  PluginsList: [],
});

ws.emit('GetPluginsList', (info: { Plugins: string[] }) =>
  (state.PluginsList as string[]).push(...info.Plugins)
);

const onePlugin = (name: string) => {
  ws.emit('GetOnePlugin', name, (info: { [keys: string]: string }) => {
    Object.assign(state, info);
    dialog.value = true;
  });
};

const save = () => {
  ws.emit('EditOnePlugin', state, (info: { Msg: string; Ret: number }) => {
    Object.assign(state, info);
    dialog.value = false;
    $q.notify(info.Msg);
  });
};
</script>
