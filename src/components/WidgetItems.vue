<template>
	<v-col cols="12" xs="6" sm="6" md="3">
		<v-card class="mx-auto" flat>
			<v-list-item three-line>
				<v-list-item-avatar size="80">
					<v-icon size="64" :color="color">
						{{ icon }}
					</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title class="title font-weight-light">
						{{ title }}
					</v-list-item-title>
					<v-list-item-subtitle>
						<count-to
							:start-val="start"
							:end-val="end"
							:duration="duration"
							class="title font-weight-bold"
						/>
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-card>
	</v-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CountTo from 'vue-count-to'

@Component<WidgetItems>({
	components: {
		CountTo
	}
})
export default class WidgetItems extends Vue {
	@Prop({ type: String, required: true })
	title!: string

	@Prop({ type: String, required: true })
	icon!: string

	@Prop({ type: String, required: true })
	color!: string

	@Prop({ type: String, required: true })
	chart!: string

	@Prop({ type: Number, required: true })
	start!: number

	@Prop({ type: Number, required: true })
	end!: number

	@Prop({ type: Number, required: true })
	duration!: number
}
</script>
