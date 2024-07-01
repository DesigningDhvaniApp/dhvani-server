import AppDataSource from "../../db/data-source";
import { Reference } from "../../entities/Reference";
import { ReferenceRequestBody } from "./Types";


export class ReferenceDao {
  private referenceRepository = AppDataSource.getRepository(Reference);

  async create(reference_data: ReferenceRequestBody) {
    const reference = this.referenceRepository.create(reference_data)
    return await this.referenceRepository.save(reference)
  }

  async findByName(name: string) {
    return await this.referenceRepository.findOneBy({ name: name })
  }

  async findById(id: number) {
    return await this.referenceRepository.findOneBy({ id: id })
  }

  async update(reference_data: ReferenceRequestBody) {
    return await this.referenceRepository.update(reference_data.id, reference_data)
  }

  async deleteById(id: number) {
    return await this.referenceRepository.delete(id)
  }
}