import Folder from "@/components/ui/folder";
import projectsNetworkAdapter from "@/features/projects/projectsNetworkAdapter";
import Link from "next/link";
import React from "react";

async function Projects() {
  const projects = await projectsNetworkAdapter.getProjectList();

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <p className="text-gray-600">
          View all your projects on a single page.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}/files`}
            className="block"
          >
            <Folder data={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;
