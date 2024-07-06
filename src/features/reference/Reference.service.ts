import { Reference } from '../../entities/Reference';
import { MailService } from '../mail-service/MailService';
import { MailData } from '../mail-service/Types';
import { ReferenceDao } from './Reference.dao';
import { ReferenceRequestBody } from './Types';

export class ReferenceService {
  private referenceDAO: ReferenceDao;
  private mailService: MailService;

  constructor() {
    this.referenceDAO = new ReferenceDao();
    this.mailService = new MailService();
  }

  async create(reference_data: ReferenceRequestBody): Promise<Reference> {
    const { name } = reference_data;
    const existingReference = await this.referenceDAO.findByName(name);
    if (existingReference) {
      throw new Error(`Reference with name = ${name} already exists`);
    }

    return this.referenceDAO.create(reference_data);
  }

  async update(reference_data: ReferenceRequestBody) {
    const { id } = reference_data;
    const existingReference = await this.referenceDAO.findById(id);
    if (!existingReference) {
      throw new Error(`Reference with id = ${id} not found`);
    }

    await this.referenceDAO.update(reference_data);
  }

  async findReference(id: number): Promise<Reference> {
    const existingReference = await this.referenceDAO.findById(id);
    if (!existingReference) {
      throw new Error(`Reference with id = ${id} not found`);
    }

    return existingReference;
  }

  async deleteReference(id: number) {
    const existingReference = await this.referenceDAO.findById(id);
    if (!existingReference) {
      throw new Error(`Reference with id = ${id} not found`);
    }

    await this.referenceDAO.deleteById(id);
  }

  async sendMailExample() {
    const mailData: MailData = {
      to: ['anjireddy12382@gmail.com', 'satishreddysr777@gmail.com'],
      subject: 'This is Nodemailer',
      text: 'Nodemailer development test',
    };
    await this.mailService.send(mailData);
  }
}
