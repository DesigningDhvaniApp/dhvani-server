import { Project } from '../../entities/Project';
import { AddProjectInput, GetProjectDetails, ProjectIdWithName, ProjectWithID } from './Types';
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
