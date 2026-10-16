import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { PluginDetailView } from "@/components/plugin-detail-view";
import { fetchPluginBySlug } from "@/lib/orbit-contracts";

export const dynamic = "force-dynamic";

export default async function PluginDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = await fetchPluginBySlug(slug);
  if (!plugin) notFound();

  return (
    <div className="flex flex-1 flex-col text-sw-fg">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <PluginDetailView plugin={plugin} backHref="/plugins" backLabel="All plugins" />
      </main>
    </div>
  );
}
