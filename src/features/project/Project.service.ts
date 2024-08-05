import { Project } from '../../entities/Project';
import { AddProjectInput, ProjectWithID } from './Types';
import { ProjectDao } from '../../dbutils/project.dao';
import { MemberDao } from '../../dbutils/member.dao';
import { ProjectUtils } from './Project.utils';

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
}
