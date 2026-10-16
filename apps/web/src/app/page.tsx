import { HomeLanding } from "@/components/landing/home-landing";
import { SiteHeader } from "@/components/site-header";
import { getCachedOrbitPlugins } from "@/lib/orbit-data";
import {
  latestPluginsForHome,
  orbitPluginToSkillPreview,
  popularPluginsForHome,
} from "@/lib/skills-from-orbit";

export default async function Home() {
  const { plugins } = await getCachedOrbitPlugins();
  const latest = latestPluginsForHome(plugins, 3).map(orbitPluginToSkillPreview);
  const popular = popularPluginsForHome(plugins, 4).map(orbitPluginToSkillPreview);

  return (
    <div className="flex flex-1 flex-col text-sw-fg">
      <SiteHeader />
      <HomeLanding latest={latest} popular={popular} />
    </div>
  );
}
