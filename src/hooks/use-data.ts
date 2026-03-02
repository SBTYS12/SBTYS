import { projects, resumes } from "../lib/data";

export function useProjects() {
  return { data: projects, isLoading: false };
}

export function useResumes() {
  return { data: resumes, isLoading: false };
}
