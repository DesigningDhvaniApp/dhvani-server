import { Project } from '../../entities/Project';
import { AddProjectInput, ProjectIdWithName, ProjectWithID } from './Types';
import { ProjectDao } from '../../dbutils/project.dao';
import { MemberDao } from '../../dbutils/member.dao';
import { ProjectUtils } from './Project.utils';
import { DateTime } from 'luxon';
import { HttpError, Response404 } from '../../utils/Response';

export class ProjectService {
  private projectDao = new ProjectDao();
  private memberDao = new MemberDao();
  private projectUtils = new ProjectUtils();

  async addProject(input: AddProjectInput): Promise<ProjectWithID> {
    const project = Object.assign(new Project(), input);
    const saveProject = await this.projectDao.save(project);

    const users = await this.memberDao.find();
    for (const user of users) {
      this.projectUtils.sendMailToUsers(user);
    }
    return { id: saveProject.id };
  }

  async deleteProject(id: number): Promise<ProjectIdWithName> {
    const existingProject = await this.projectDao.findById(id);
    if (!existingProject) {
      throw new HttpError('Project not found', Response404.code);
    }

    const today = DateTime.now().startOf('day');
    const projectStartDate = DateTime.fromISO(existingProject.startDate).startOf('day');

    if (projectStartDate <= today) {
      throw new Error('Cannot delete a project that has already started');
    }
    await this.projectDao.deleteProject(id);
    return {
      id: id,
      name: existingProject.name,
    };
  }
}
