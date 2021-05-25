<template>
	<v-app>
		<v-navigation-drawer app hide-overlay floating inverted-scroll v-model="drawer">
			<v-list dense nav shaped>
				<v-list-item>
					<v-list-item-avatar>
						<v-avatar>
							<v-icon>mdi-robot-outline</v-icon>
						</v-avatar>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title class="title">OPQ</v-list-item-title>
						<v-list-item-subtitle>panel</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<template v-for="item in menu">
					<v-subheader
						v-if="item.header"
						:key="item.header"
						v-text="item.header"
					></v-subheader>
					<v-list-item v-else :key="item.title" link :to="item.path">
						<v-list-item-icon>
							<v-icon :color="item.color">{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar app color="white" flat>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-github</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<transition>
					<router-view></router-view>
				</transition>
			</v-container>
		</v-main>
		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component<Layout>({
	sockets: {
		connect: () => {
			// TODO:
		}
	}
})
export default class Layout extends Vue {
	drawer = true
	menu = [
		{ icon: 'home', color: 'purple', title: '控制台', path: '/dashboard' },
		{ icon: 'mdi-eye-settings-outline', color: 'pink', title: '插件', path: '/plugins' }
	]
}
</script>
