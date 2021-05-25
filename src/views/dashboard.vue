<template>
	<v-card flat>
		<v-row>
			<WidgetItems
				chart="工作线程"
				color="orange"
				:duration="2000"
				:end="Info.isLoading ? Number(Info.ClusterInfo.GoroutineNum) : 0"
				icon="mdi-server-network"
				:start="1"
				title="工作线程"
			/>
			<WidgetItems
				chart="插件数量"
				color="blue"
				:duration="3000"
				:end="Info.isLoading ? Number(Info.Plugins) : 0"
				icon="mdi-power-plug-outline"
				:start="1"
				title="插件数量"
			/>
			<WidgetItems
				chart="在线用户"
				color="pink"
				:duration="3000"
				:end="Info.isLoading ? Number(Info.QQUsersCounts) : 0"
				icon="mdi-qqchat"
				:start="1"
				title="在线用户"
			/>
			<WidgetItems
				chart="稳定运行"
				color="indigo"
				:duration="3000"
				:end="Info.isLoading ? Number(Info.RunTime) : 0"
				icon="mdi-timeline-plus"
				:start="1"
				title="稳定运行"
			/>
			<v-col cols="12" xs="6" sm="6" md="5">
				<v-skeleton-loader
					type="list-item-two-line,list-item-two-line,list-item-two-line,list-item-two-line,list-item-two-line,list-item-two-line"
					:loading="!System.isLoading"
				>
					<v-card flat :loading="!System.isLoading">
						<v-card-title>系统信息</v-card-title>
						<v-list dense>
							<v-list-item
								v-show="index !== 'isLoading'"
								v-for="(data, index) in System"
								:key="index"
							>
								<v-list-item-content>{{ index }}</v-list-item-content>
								<v-list-item-content>
									{{ data }}
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-card>
				</v-skeleton-loader>
			</v-col>
			<v-col cols="12" xs="6" sm="6" md="7">
				<v-skeleton-loader :loading="!Info.isLoading" type="card,card">
					<v-card flat>
						<v-card-title>仪表盘</v-card-title>
						<v-card-text>
							<v-list-item three-line>
								<v-list-item-avatar size="80">
									<v-icon size="64" color="purple">mdi-tag</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="title font-weight-light">
										OPQ版本
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ Info.OPQVersion }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-list-item three-line>
								<v-list-item-avatar size="80">
									<v-icon size="64" color="info">info</v-icon>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title class="title font-weight-light">
										GOSDK
									</v-list-item-title>
									<v-list-item-subtitle v-if="Info.ClusterInfo">
										{{ Info.ClusterInfo.GoVersion }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-card-text>
					</v-card>
				</v-skeleton-loader>
			</v-col>
			<v-col cols="12">
				<v-skeleton-loader :loading="!Info.isLoading" type="card">
					<v-card flat>
						<v-card-text><ve-line :data="chartData"></ve-line></v-card-text>
					</v-card>
				</v-skeleton-loader>
			</v-col>
		</v-row>
	</v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WidgetItems from '@/components/WidgetItems.vue'
import { SystemInfo } from '@/models/SystemInfo'
import dayjs from 'dayjs'

export interface chartData {
	columns: string[]
	rows: Row[]
}

export interface Row {
	date: string
	CPU占用: string
	内存占用: string
	网络收包: number
	网络发包: number
}

export interface SystemRoot {
	isLoading?: boolean
	CPU核数?: number
	CPU?: string
	系统?: string
	平台?: string
	内存?: string
	IP?: string
	运行时间?: string
}

@Component<Dashboard>({
	components: {
		WidgetItems
	}
})
export default class Dashboard extends Vue {
	time = 0

	Info: SystemInfo = {
		isLoading: false
	}

	System: SystemRoot = {
		isLoading: false
	}

	chartData: chartData = {
		columns: ['date', 'CPU占用', '内存占用', '网络收包', '网络发包'],
		rows: []
	}

	async created(): Promise<void> {
		this.$socket.emit('SystemInfo', (data: SystemInfo) => {
			this.Info = data
			this.Info.isLoading = true
			this.chartData.rows.push(<Row>{
			  date: dayjs(new Date()).format('H:m:s'),
			  CPU占用: data.SystemUsage?.CpuUsage,
			  内存占用: data.SystemUsage?.MemUsage,
			  网络收包: data.SystemUsage?.NetReceive,
			  网络发包: data.SystemUsage?.NetSend
			})
			Object.assign(this.System, <SystemRoot>{
				isLoading: true,
				CPU核数: data.CPUH,
				CPU: data.CPUName,
				系统: data.OSSName,
				平台: data.OS,
				内存: data.MMInfo,
				IP: data.IP,
				运行时间: data.UPtime
			})
		})
		this.time = setInterval(() => {
			this.SystemInfo()
		}, 5000)
	}

	async SystemInfo(): Promise<void> {
		this.$socket.emit('SystemInfo', (data: SystemInfo) => {
			this.Info = data
			this.Info.isLoading = true
			this.chartData.rows.push(<Row>{
			  date: dayjs(new Date()).format('H:m:s'),
			  CPU占用: data.SystemUsage?.CpuUsage,
			  内存占用: data.SystemUsage?.MemUsage,
			  网络收包: data.SystemUsage?.NetReceive,
			  网络发包: data.SystemUsage?.NetSend
			})
			Object.assign(this.System, {
				CPU核数: data.CPUH,
				CPU: data.CPUName,
				系统: data.OSSName,
				平台: data.OS,
				内存: data.MMInfo,
				IP: data.IP
				// 运行时间: data.UPtime
			})
		})
	}

	async destroyed(): Promise<void> {
		if (this.time) {
			clearInterval(this.time)
		}
	}
}
</script>
