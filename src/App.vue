<template>
	<div>
		<vue-snotify></vue-snotify>
		<transition name="scroll-y-transition">
			<router-view />
		</transition>
	</div>
</template>
