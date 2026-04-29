import { NextRequest, NextResponse } from "next/server";
import { getProjectById, updateProject } from "@/db/repositories/projects";
import { updateProjectSchema } from "@/lib/schemas";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ item: project });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const existing = await getProjectById(id);

  if (!existing) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = updateProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await updateProject(id, parsed.data);
  return NextResponse.json({ item: updated });
}
