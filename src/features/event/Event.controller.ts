import { Response200, SendErrorResponse } from '../../utils/Response';
import { Request, Response } from 'express';
import { EventService } from './Event.service';

interface MulterRequest extends Request {
  file: any;
}

export class EventController {
  private eventService = new EventService();

  async addEvent(req: MulterRequest, res: Response) {
    try {
      const result = await this.eventService.addEvent({ ...req.body, flyer: req.file?.filename });
      return res.status(Response200.code).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }
}
