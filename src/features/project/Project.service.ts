import { Project } from '../../entities/Project';
import { AddProjectInput, ProjectWithID } from './Types';
import { ProjectDao } from '../../dbutils/project.dao';
import { MemberDao } from '../../dbutils/member.dao';
import { ProjectUtils } from './Project.utils';
import AppDataSource from '../../db/data-source';
import { DateTime } from 'luxon';

export class ProjectService {
  private projectDao = new ProjectDao();
  private memberDao = new MemberDao();
  private projectUtils = new ProjectUtils();
  private projectRepository = AppDataSource.getRepository(Project);

  async addProject(input: AddProjectInput): Promise<ProjectWithID> {
    const project = Object.assign(new Project(), input);
    const now = DateTime.now().toFormat('yyyy-MM-dd');
    
    if (now < project.startDate) {
      project.status = 'UPCOMING';
    } else if (now > project.endDate) {
      project.status = 'COMPLETED';
    } else {
      project.status = 'ONGOING';
    }

    const saveProject = await this.projectDao.save(project);

    const users = await this.memberDao.find();
    for (const user of users) {
      this.projectUtils.sendMailToUsers(user);
    }
    return { id: saveProject.id };
  }

  async getProjects(id: number): Promise<Project | undefined> {
    return await this.projectDao.findById(id);
  }
}
