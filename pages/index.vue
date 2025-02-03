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

				<UContainer class="p-4 justify-center" v-if="!inviteSent">
					<UAlert
						description="If you agree to the terms & conditions, please enter your email
						address"
						:avatar="{
							src: 'https://avatars.githubusercontent.com/u/75729237?v=4',
						}"
						title="Hey there!"
					/>
					<UFormGroup
						label="Email"
						:error="emailError"
						help=""
						class="mt-4"
						required
					>
						<UInput
							v-model.lazy.trim="email"
							@blur="validateEmail"
							type="email"
							placeholder="Enter email"
							:trailing-icon="
								emailError
									? 'i-heroicons-exclamation-triangle-20-solid'
									: undefined
							"
						/>
					</UFormGroup>
					<div class="mt-2 text-right">
						<UButton
							type="submit"
							:loading="submitButton"
							@click="submitHandle()"
						>
							{{ submitLabel }}
						</UButton>
					</div>
				</UContainer>
				<UContainer class="p-4 justify-center" v-else>
					<UAlert
						icon="i-heroicons-envelope"
						description="Invitation sent successfully!"
						title="Alert!"
						color="primary"
					/>
				</UContainer>

				<template #footer>
					<code>Oxide PH @ {{ new Date().getFullYear() }}</code>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import items from "@/contents/terms";

definePageMeta({
	layout: "default",
});

const toast = useToast();
const joinModal = ref(true);
const submitButton = ref(false);
const submitLabel = ref("Submit Application");
const email = ref("");
const emailError = ref<string | null>(null);
const emailSchema = z.string().email("Invalid email format");
const inviteSent = ref(false);

const validateEmail = () => {
	const result = emailSchema.safeParse(email.value);
	emailError.value = result.success ? null : result.error.errors[0].message;
};

const submitHandle = async () => {
	const result = emailSchema.safeParse(email.value);
	if (!result.success) {
		emailError.value = result.error.errors[0].message;
		return;
	}

	submitButton.value = true;
	submitLabel.value = "Processing...";

	try {
		const response = await $fetch("/api/invite", {
			method: "POST",
			body: { email: email.value },
		});

		if (response.success) {
			inviteSent.value = !inviteSent.value;
			toast.add({ title: "Invitation sent successfully!" });
		} else {
			toast.add({ title: response.message, color: "red" });
		}
	} catch (error) {
		toast.add({ title: "Something went wrong!", color: "red" });
	}

	submitButton.value = false;
	submitLabel.value = "Submit Application";
};
</script>
