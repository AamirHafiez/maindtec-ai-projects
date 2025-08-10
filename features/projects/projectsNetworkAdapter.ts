import { networkApiAdapter } from "@/data/adapters";
import projectRepository from "@/data/repositories/projectRepository";

const projectsNetworkAdapter = projectRepository(networkApiAdapter);

export default projectsNetworkAdapter;
