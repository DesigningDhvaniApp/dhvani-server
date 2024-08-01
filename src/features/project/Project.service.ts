import { Member } from '../../entities/Member';
import AppDataSource from '../../db/data-source';
import { Project } from '../../entities/Project';
import { MailService } from '../mail-service/MailService';
import { ProjectDao } from './Project.dao';
import { AddProjectInput, ProjectWithID } from './Types';

export class ProjectService {
  private projectDao: ProjectDao;
  private projectRepository = AppDataSource.getRepository(Project);
  private memberRepository = AppDataSource.getRepository(Member);
  private mailService: MailService;

  constructor() {
    this.projectDao = new ProjectDao();
    this.mailService = new MailService();
  }

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
    const saveProject = await this.projectDao.saveProjectInDB(project);

    const users = await this.memberRepository.find();
    for (const user of users) {
      this.mailService.send({
        to: user.email,
        subject: 'Adding new project',
        templateName: 'add-project',
        replacements: {},
      });
    }
    return { id: saveProject.id };
  }
}
