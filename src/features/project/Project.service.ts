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

  async getProject(id: number): Promise<GetProjectDetails> {
    const project = await this.projectDao.findById(id);
    if (!project) {
      throw new Error('Project with Id not found');
    }

    const today = DateTime.now().toFormat('yyyy-MM-dd');
    let status = '';

    if (today < project.startDate) {
      status = 'UPCOMING';
    } else if (today > project.endDate) {
      status = 'COMPLETED';
    } else {
      status = 'ONGOING';
    }

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      goalAmount: project.goalAmount,
      fundRaised: project.fundRaised,
      aboutTheCause: project.aboutTheCause,
      planOfAction: project.planOfAction,
      status: status,
    };
  }
}
