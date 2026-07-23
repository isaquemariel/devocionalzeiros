import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const url = Deno.env.get("SUPABASE_URL")!;
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(url, key);

const BUCKETS = ["enoque-audio", "aulas-covers", "aulas-arquivos"];

async function emptyBucket(bucket: string, prefix = ""): Promise<number> {
  let total = 0;
  while (true) {
    const { data, error } = await admin.storage.from(bucket).list(prefix, { limit: 1000 });
    if (error) throw error;
    if (!data || data.length === 0) break;
    const files: string[] = [];
    const folders: string[] = [];
    for (const item of data) {
      const p = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) folders.push(p);
      else files.push(p);
    }
    if (files.length > 0) {
      const { error: delErr } = await admin.storage.from(bucket).remove(files);
      if (delErr) throw delErr;
      total += files.length;
    }
    for (const f of folders) total += await emptyBucket(bucket, f);
    if (files.length === 0 && folders.length === 0) break;
    if (data.length < 1000) break;
  }
  return total;
}

Deno.serve(async () => {
  const results: Record<string, unknown> = {};
  for (const b of BUCKETS) {
    try {
      const emptied = await emptyBucket(b);
      const { error } = await admin.storage.deleteBucket(b);
      results[b] = { emptied, deleted: !error, error: error?.message };
    } catch (e) {
      results[b] = { error: (e as Error).message };
    }
  }
  return new Response(JSON.stringify(results, null, 2), {
    headers: { "content-type": "application/json" },
  });
});
