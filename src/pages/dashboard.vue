<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <WidgetCard
          title="工作线程"
          icon="mdi-spider-thread"
          color="#5064b5"
          background="#3e51b5"
          :value="data.ClusterInfo?.GoroutineNum ?? 0"
        />
        <WidgetCard
          title="插件数量"
          icon="mdi-language-lua"
          color="#f37169"
          background="#f34636"
          :value="data.Plugins ?? 0"
        />
        <WidgetCard
          title="在线用户"
          icon="mdi-qqchat"
          color="#ea6a7f"
          background="#ea4b64"
          :value="data.QQUsersCounts ?? 0"
        />
        <WidgetCard
          title="稳定运行"
          icon="mdi-av-timer"
          color="#a270b1"
          background="#9f52b1"
          :value="Number(data.RunTime ?? 0)"
        />
      </div>
    </q-card-section>
  </q-card>
  <q-card flat>
    <q-card-section>
      <div class="row">
        <div class="col">
          <q-card-section>
            <div class="text-h6 text-center">系统信息</div>
          </q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.CPUH }}</q-item-label>
                <q-item-label caption>CPU核数</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.CPUName }}</q-item-label>
                <q-item-label caption>CPU</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.OSSName }}</q-item-label>
                <q-item-label caption>系统</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.OS }}</q-item-label>
                <q-item-label caption>平台</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.MMInfo }}</q-item-label>
                <q-item-label caption>内存</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.IP }}</q-item-label>
                <q-item-label caption>IP</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.UPtime }}</q-item-label>
                <q-item-label caption>运行时间</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col">
          <q-card-section>
            <div class="text-h6 text-center">版本信息</div>
          </q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.ClusterInfo?.GoVersion }}</q-item-label>
                <q-item-label caption>OPQ版本</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{ data.OPQVersion }}</q-item-label>
                <q-item-label caption>GOSDK</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <v-chart class="chart" :option="option" />
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { CanvasRenderer } from 'echarts/renderers';
import { use } from 'echarts/core';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import WidgetCard from '../components/widget/card.vue';
import { LineChart } from 'echarts/charts';
import VChart from 'vue-echarts';
import { GridComponent } from 'echarts/components';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts';
import { date } from 'quasar';

export interface SystemInfo {
  CPUH: number;
  CPUName: string;
  ClusterInfo: ClusterInfo;
  IP: string;
  MMInfo: string;
  MoneyCount: string;
  OPQVersion: string;
  OS: string;
  OSSName: string;
  Plugins: number;
  QQUsersCounts: number;
  RunTime: string;
  SystemUsage: SystemUsage;
  TotalMoney: string;
  UPtime: string;
}

export interface ClusterInfo {
  Alloc: string;
  CpuNum: number;
  FreesTimes: number;
  GCTime: string;
  GoArch: string;
  GoVersion: string;
  GoroutineNum: number;
  LastGCTime: string;
  MallocsTimes: number;
  NextGC: string;
  Platform: string;
  ServerRuntime: string;
  Sys: string;
  TotalAlloc: string;
}

export interface SystemUsage {
  CpuUsage: string;
  MemUsage: string;
  NetReceive: number;
  NetSend: number;
}

use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const data = ref<Partial<SystemInfo>>({});

const ws = inject('ws') as SocketIOClient.Socket;

const option = ref({
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['CPU占用', '内存占用', '网络收包', '网络发包'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'CPU占用',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)',
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: '内存占用',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)',
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: '网络收包',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)',
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: '网络发包',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)',
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
  ],
});

const timer = setInterval(
  () =>
    ws.emit('SystemInfo', (info: SystemInfo) => {
      data.value = info;
      (option.value.xAxis[0].data as string[]).push(
        date.formatDate(Date.now(), 'HH:mm:ss')
      );
      (option.value.series[0].data as number[]).push(
        Number(data.value.SystemUsage?.CpuUsage) ?? 0
      );
      (option.value.series[1].data as number[]).push(
        Number(data.value.SystemUsage?.MemUsage) ?? 0
      );
      (option.value.series[2].data as number[]).push(
        Number(data.value.SystemUsage?.NetReceive) ?? 0
      );
      (option.value.series[3].data as number[]).push(
        Number(data.value.SystemUsage?.NetSend) ?? 0
      );
    }),
  3000
);

onMounted(() => {
  ws.emit('SystemInfo', (info: SystemInfo) => {
    data.value = info;
  });
});

onUnmounted(() => clearInterval(timer));
</script>
<style scoped>
.chart {
  height: 400px;
}
</style>
