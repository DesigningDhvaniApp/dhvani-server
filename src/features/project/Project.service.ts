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
    const {
      name,
      description,
      startDate,
      endDate,
      goalAmount,
      fundRaised,
      aboutTheCause,
      planOfAction,
      file,
    } = input;
    const project = new Project();
    project.name = name;
    project.description = description;
    project.startDate = startDate;
    project.endDate = endDate;
    project.aboutTheCause = aboutTheCause;
    project.goalAmount = goalAmount;
    project.fundRaised = fundRaised;
    project.planOfAction = planOfAction;
    project.flyer = file;
    const saveProject = await this.projectDao.save(project);

    const users = await this.memberDao.find();
    for (const user of users) {
      this.projectUtils.sendMailToUsers(user);
    }
    return { id: saveProject.id };
  }
}
