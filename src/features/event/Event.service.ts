import { EventDao } from '../../dbutils/event.dao';
import { Event } from '../../entities/Event';
import { HttpError, ResponseConflict } from '../../utils/Response';
import { AddEventInput } from './Types';

export class EventService {
  private eventDao = new EventDao();

  async addEvent(input: AddEventInput): Promise<Event> {
    const existingEvent = await this.eventDao.eventExists(input);
    if (existingEvent) {
      throw new HttpError(ResponseConflict.message, ResponseConflict.code);
    }

    const event = Object.assign(new Event(), input);
    await this.eventDao.save(event);

    return event;
  }
}
