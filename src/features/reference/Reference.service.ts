import { Reference } from "../../entities/Reference";
import { ReferenceDao } from "./Reference.dao";
import { ReferenceRequestBody } from "./Types";


export class ReferenceService {
  private referenceDAO: ReferenceDao

  constructor() {
    this.referenceDAO = new ReferenceDao()
  }

  async create(reference_data: ReferenceRequestBody): Promise<Reference> {
    const { name } = reference_data
    const existingReference = await this.referenceDAO.findByName(name)
    if (existingReference) {
      throw new Error(`Reference with name = ${name} already exists`);
    }

    return this.referenceDAO.create(reference_data)
  }

  async update(reference_data: ReferenceRequestBody) {
    const { id } = reference_data
    const existingReference = await this.referenceDAO.findById(id)
    if (!existingReference) {
      throw new Error(`Reference with id = ${id} not found`);
    }

    await this.referenceDAO.update(reference_data)
  }

  async findReference(id: number): Promise<Reference> {
    const existingReference = await this.referenceDAO.findById(id)
    if (!existingReference) {
      throw new Error(`Reference with id = ${id} not found`);
    }

    return existingReference
  }

  async deleteReference(id: number) {
    const existingReference = await this.referenceDAO.findById(id)
    if (!existingReference) {
      throw new Error(`Reference with id = ${id} not found`);
    }

    await this.referenceDAO.deleteById(id)
  }
}