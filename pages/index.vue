<template>
	<div>
		<UModal v-model="joinModal" :overlay="false" prevent-close>
			<UCard
				:ui="{
					ring: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				}"
			>
				<template #header>
					<h2>Join Oxide OpenSource Philippines</h2>
				</template>

				<UAccordion :items="items" />

				<UContainer class="p-4 justify-center">
					<UAlert
						description="If you agree to the terms & conditions, please enter your email
						address"
						:avatar="{
							src: 'https://avatars.githubusercontent.com/u/75729237?v=4',
						}"
						title="Hey there!"
					/>
					<UFormGroup label="Email" class="mt-4" required>
						<UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
						<div class="mt-2 text-right">
							<UButton loading>Submit Application</UButton>
						</div>
					</UFormGroup></UContainer
				>

				<template #footer>
					<code>Oxide PH @ {{ new Date().getFullYear() }}</code>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script lang="ts" setup>
import items from "@/components/texts/terms";

definePageMeta({
	layout: "default",
});

const joinModal = ref(true)
</script>

<style></style>
