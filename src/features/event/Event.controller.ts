import { Response200, SendErrorResponse } from '../../utils/Response';
import { Request, Response } from 'express';
import { EventService } from './Event.service';

export class EventController {
  private eventService = new EventService();

  async deleteEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.eventService.deleteEvent(parseInt(id));
      return res.status(Response200.code).json(result);
    } catch (error) {
      return SendErrorResponse(error, res);
    }
  }
}
