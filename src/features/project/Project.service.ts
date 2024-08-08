import { Project } from '../../entities/Project';
import { AddProjectInput, GetProjectDetails, ProjectWithID } from './Types';
import { ProjectDao } from '../../dbutils/project.dao';
import { MemberDao } from '../../dbutils/member.dao';
import { ProjectUtils } from './Project.utils';
import { DateTime } from 'luxon';

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

  async getProjects(category: string) {
    const projects = await this.projectDao.find();
    const result = [];

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i] as GetProjectDetails;
      const today = DateTime.now().toFormat('yyyy-MM-dd');
      if (category == 'previous' && today > project.endDate) {
        project.status = 'COMPLETED';
        result.push(project);
      } else if (category == 'upcoming' && today < project.startDate) {
        project.status = 'UPCOMING';
        result.push(project);
      } else if (category == 'current' && today <= project.endDate && today >= project.startDate) {
        project.status = 'ONGOING';
        result.push(project);
      }
    }

    return result;
  }
}
