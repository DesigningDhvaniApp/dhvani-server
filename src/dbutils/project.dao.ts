import AppDataSource from '../db/data-source';
import { Project } from '../entities/Project';

export class ProjectDao {
  private projectRepository = AppDataSource.getRepository(Project);

  async save(project: Project): Promise<Project> {
    const entity = Object.assign(new Project(), project);
    return await this.projectRepository.save(entity);
  }

  async find() {
    return await this.projectRepository.find();
  }
  
  async findById(id: number): Promise<Project | null> {
    if (!id) return null;
    return await this.projectRepository.findOneBy({ id: id });
  }

  async deleteProject(id: number) {
    return await this.projectRepository.delete(id);
  }
}
