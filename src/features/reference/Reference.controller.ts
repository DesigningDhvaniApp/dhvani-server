import { ReferenceService } from "./Reference.service";
import { Request, Response } from 'express'

export class ReferenceController {
  private referenceService: ReferenceService

  constructor() {
    this.referenceService = new ReferenceService()
  }

  /**
   * @api {post} /references Create a new reference
   *
   * @apiBody {Object}
   * {
   *   name: string
   *   age: number
   *   isActive: boolean
   * }
   */
  public async create(req: Request, res: Response) {
    try {
      const reference_data = req.body
      const result = await this.referenceService.create(reference_data)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @api {put} /references Update a reference by id
   *
   * @apiBody {Object}
   * {
   *   id: number
   *   name: string
   *   age: number
   *   isActive: boolean
   * }
   */
  public async update(req: Request, res: Response) {
    try {
      const reference_data = req.body
      await this.referenceService.update(reference_data)
      return res.status(200).json("Reference updated!")
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @api {get} /references/:id Get a reference by id
   *
   * @apiParam `id` {number}
   */
  public async findReference(req: Request, res: Response) {
    try {
      const { id } = req.params
      console.log(id)
      const result = await this.referenceService.findReference(parseInt(id))
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @api {delete} /references/:id Delete a reference by id
   *
   * @apiParam `id` {number}
   */
  public async deleteReference(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.referenceService.deleteReference(parseInt(id))
      return res.status(200).json(`Reference with id = ${id} is deleted!`)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}