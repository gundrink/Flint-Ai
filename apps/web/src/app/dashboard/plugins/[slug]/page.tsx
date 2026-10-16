import { notFound } from "next/navigation";
import { PluginDetailView } from "@/components/plugin-detail-view";
import { fetchPluginBySlug } from "@/lib/orbit-contracts";

export const dynamic = "force-dynamic";

export default async function DashboardPluginDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = await fetchPluginBySlug(slug);
  if (!plugin) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <PluginDetailView
        plugin={plugin}
        backHref="/dashboard/plugins"
        backLabel="My plugins"
        showPublishAction
      />
    </div>
  );
}
