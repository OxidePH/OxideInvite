import { defineEventHandler, readBody } from "h3";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_API_URL = "https://api.github.com";

export default defineEventHandler(async (event) => {
	const { email } = await readBody(event);

	// Validate email format
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
		return { success: false, message: "Invalid email format" };
	}

	const inviteUrl = `${GITHUB_API_URL}/orgs/${GITHUB_ORG}/invitations`;

	try {
		const response = await axios.post(
			inviteUrl,
			{ email, role: "direct_member" },
			{
				headers: {
					Authorization: `Bearer ${GITHUB_TOKEN}`,
					Accept: "application/vnd.github.v3+json",
				},
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return {
			success: false,
			message: error.response?.data?.message || "An error occurred",
		};
	}
});
