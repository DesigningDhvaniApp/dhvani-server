import { EventDao } from '../../dbutils/event.dao';
import { Event } from '../../entities/Event';
import { HttpError, Response404, ResponseConflict } from '../../utils/Response';
import { AddEventInput, EventWithIdAndName } from './Types';
import { DateTime } from 'luxon';

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

  async deleteEvent(id: number): Promise<EventWithIdAndName> {
    const existingEvent = await this.eventDao.findById(id);
    if (!existingEvent) {
      throw new HttpError('Event not found', Response404.code);
    }

    const today = DateTime.now().startOf('day');
    const eventStartDate = DateTime.fromISO(existingEvent.eventStartDate).startOf('day');

    if (eventStartDate <= today) {
      throw new Error('Cannot delete an event that has already started');
    }
    await this.eventDao.deleteEvent(id);
    return {
      id: existingEvent.id,
      name: existingEvent.eventName,
    };
  }
}
