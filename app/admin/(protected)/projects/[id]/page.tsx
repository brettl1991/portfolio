import { notFound } from "next/navigation";

import { ActionToast } from "@/components/admin/action-toast";
import { ProjectForm } from "@/components/admin/project-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMediaForAdmin, getProjectForAdmin } from "@/lib/data/admin";

import { saveProjectAction } from "@/app/admin/(protected)/actions";

interface ProjectEditorPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminProjectEditorPage({
  params,
  searchParams,
}: ProjectEditorPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);

  const [project, mediaAssets] = await Promise.all([
    getProjectForAdmin(id),
    getMediaForAdmin(),
  ]);

  if (id !== "new" && !project) {
    notFound();
  }

  const saved = query.saved === "1";
  const error = typeof query.error === "string" ? query.error : "";

  return (
    <div className="space-y-4">
      {saved ? <ActionToast message="Project saved." /> : null}
      {error ? (
        <ActionToast
          type="error"
          message={
            error === "create_failed"
              ? "Could not create project."
              : "Could not save project."
          }
        />
      ) : null}
      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader>
          <CardTitle className="font-mono text-xl">
            {id === "new" ? "New Project" : "Edit Project"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {saved ? (
            <p className="rounded-md border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              Project saved successfully.
            </p>
          ) : null}
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error === "create_failed"
                ? "Could not create project."
                : "Could not save project."}
            </p>
          ) : null}
          <ProjectForm
            key={id}
            project={
              project
                ? {
                    id: String(project.id),
                    title: String(project.title ?? ""),
                    slug: String(project.slug ?? ""),
                    excerpt: String(project.excerpt ?? ""),
                    body_md: String(project.body_md ?? ""),
                    tech_tags: Array.isArray(project.tech_tags)
                      ? project.tech_tags.filter(
                          (item: unknown): item is string =>
                            typeof item === "string",
                        )
                      : [],
                    cover_image_url: String(project.cover_image_url ?? ""),
                    thumbnail_url: String(project.thumbnail_url ?? ""),
                    gallery_images: Array.isArray(project.gallery_images)
                      ? project.gallery_images.filter(
                          (item: unknown): item is string =>
                            typeof item === "string",
                        )
                      : [],
                    demo_url: String(project.demo_url ?? ""),
                    github_url: String(project.github_url ?? ""),
                    role: String(project.role ?? ""),
                    timeline: String(project.timeline ?? ""),
                    published: Boolean(project.published),
                  }
                : null
            }
            mediaAssets={mediaAssets.map((asset) => ({
              id: String(asset.id),
              file_name: String(asset.file_name ?? ""),
              public_url: String(asset.public_url ?? ""),
            }))}
            action={saveProjectAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}
