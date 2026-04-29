type MockProject = Record<string, unknown> & { id: string };

const store = new Map<string, MockProject>();

export function listMockProjects() {
  return Array.from(store.values()).sort((a, b) => {
    const aTime = String(a.updatedAt || "");
    const bTime = String(b.updatedAt || "");
    return aTime < bTime ? 1 : -1;
  });
}

export function getMockProject(id: string) {
  return store.get(id) || null;
}

export function saveMockProject(project: MockProject) {
  store.set(project.id, project);
  return project;
}
