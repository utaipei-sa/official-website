import { readFile, readItems } from "@directus/sdk";
import directus from "@/services/directus";

const directusUrl = import.meta.env.VITE_DIRECTUS_URL;

export async function fetchAnnouncements() {
  const posts = await directus.request(
    readItems("posts", {
      sort: ["-updated_at"],
    })
  );

  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      attachments: await resolvePostAttachments(post.attachments),
    }))
  );
}

async function resolvePostAttachments(attachmentIds = []) {
  const attachments = await Promise.all(
    (attachmentIds ?? []).map(async (attachmentId) => {
      const relation = await directus.request(
        readItems("posts_files", {
          filter: { id: { _eq: attachmentId } },
          fields: ["directus_files_id"],
        })
      );
      const fileId = relation[0]?.directus_files_id;

      if (!fileId) {
        return null;
      }

      const file = await directus.request(
        readFile(fileId, {
          fields: ["filename_download"],
        })
      );

      return {
        id: attachmentId,
        name: file.filename_download,
        url: `${directusUrl}/assets/${fileId}`,
      };
    })
  );

  return attachments.filter(Boolean);
}

export function fetchUsefulLinks() {
  return directus.request(
    readItems("useful_links", {
      sort: ["priority"],
    })
  );
}

export function fetchActivities() {
  return directus.request(readItems("activities"));
}

export function fetchHistoricalActivities() {
  return directus.request(
    readItems("activities", {
      fields: ["title", "start_time", "end_time", "description", "url"],
      filter: {
        end_time: {
          _lte: new Date().toISOString(),
        },
      },
      sort: ["-start_time"],
      limit: 6,
    })
  );
}
