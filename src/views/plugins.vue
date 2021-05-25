<template>
	<v-card flat>
		<v-row>
			<v-col cols="12" sm="3">
				<v-card-text>
					<v-sheet class="overflow-y-auto fill-height" max-height="100vh" tile>
						<v-skeleton-loader
							type="list-item-two-line,list-item-two-line,list-item-two-line,list-item-two-line,list-item-two-line"
							:loading="!plugin.length === 0"
						>
							<v-list flat>
								<v-subheader>插件列表</v-subheader>
								<v-list-item-group v-model="selectedItem" color="primary">
									<v-list-item
										v-for="(item, index) in plugin"
										:key="index"
										@click="GetOnePlugin(item.name, index)"
									>
										<v-list-item-avatar>
											<v-icon>mdi-language-lua</v-icon>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title>{{ item.name }}</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-skeleton-loader>
					</v-sheet>
				</v-card-text>
			</v-col>
			<v-col cols="12" sm="9">
				<v-text-field
					v-if="LuaFileName"
					label="插件名"
					v-model="LuaFileName"
				></v-text-field>
				<codemirror v-if="LuaFileSrc" v-model="LuaFileSrc" :options="cmOptions" />
			</v-col>
		</v-row>
		<v-fab-transition>
			<v-btn
				v-if="LuaFileSrc"
				@click="EditOnePlugin()"
				color="pink"
				dark
				fixed
				bottom
				right
				fab
			>
				<v-icon>save</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'codemirror/mode/lua/lua.js'
import 'codemirror/theme/seti.css'
@Component<Plugins>({})
export default class Plugins extends Vue {
	selectedItem = -1
	plugin:{
    name: string
  }[] = []

	LuaFileName = ''
	LuaFileSrc = ''

	cmOptions = {
		tabSize: 4,
		mode: 'lua',
		theme: 'seti',
		lineNumbers: true,
		line: true
	}

	async created(): Promise<void> {
		await this.GetPluginsList()
	}

	async GetPluginsList(): Promise<void> {
		this.$socket.emit('GetPluginsList', (data: Record<'Plugins', string[]>) => {
			data.Plugins.forEach((element:any) => {
				this.plugin.push({ name: element })
			})
		})
	}

	async GetOnePlugin(name: string, k: number): Promise<void> {
		this.$socket.emit(
			'GetOnePlugin',
			name,
			(data: Record<'LuaFileName' | 'LuaFileSrc', string>) => {
				console.info(data)
				this.selectedItem = k
				this.LuaFileName = data.LuaFileName
				this.LuaFileSrc = data.LuaFileSrc
			}
		)
	}

	async EditOnePlugin(): Promise<void> {
		this.$socket.emit(
			'EditOnePlugin',
			{ LuaFileName: this.LuaFileName, LuaFileSrc: this.LuaFileSrc },
			(data: { Msg: string; Ret: number }) => {
				if (data.Ret === -1) {
					this.$snotify.error(data.Msg)
				} else {
					this.$snotify.success(data.Msg)
					this.LuaFileName = ''
					this.LuaFileSrc = ''
					this.GetPluginsList()
					this.selectedItem = -1
				}
			}
		)
	}
}
</script>
