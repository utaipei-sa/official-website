import { createDirectus, rest } from "@directus/sdk";
const directus = createDirectus(import.meta.env.VITE_DIRECTUS_URL).with(rest());

export default directus;
