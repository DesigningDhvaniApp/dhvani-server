import AppDataSource from '../db/data-source';
import { Project } from '../entities/Project';

export class ProjectDao {
  private projectRepository = AppDataSource.getRepository(Project);

  async save(project: Project): Promise<Project> {
    const entity = Object.assign(new Project(), project);
    return await this.projectRepository.save(entity);
  }
}
