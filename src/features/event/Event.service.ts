import { EventDao } from '../../dbutils/event.dao';
import { HttpError, ResponseConflict } from '../../utils/Response';
import { AddEventInput, GetEventDetails } from './Types';
import { DateTime } from 'luxon';
import { Event } from '../../entities/Event';
import { HttpError, Response404 } from '../../utils/Response';
import { EventWithIdAndName } from './Types';
import { DateTime } from 'luxon';
import { Event } from '../../entities/Event';
import { HttpError, ResponseConflict } from '../../utils/Response';
import { AddEventInput } from './Types';

export class EventService {
  private eventDao = new EventDao();

  async getEvents(category: string) {
    const events = await this.eventDao.find();
    const result = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i] as GetEventDetails;
      const today = DateTime.now().toFormat('yyyy-MM-dd');
      if (category == 'completed' && today > event.eventEndDate) {
        event.status = 'COMPLETED';
        result.push(event);
      } else if (category == 'upcoming' && today < event.eventStartDate) {
        event.status = 'UPCOMING';
        result.push(event);
      } else if (
        category == 'ongoing' &&
        today <= event.eventEndDate &&
        today >= event.eventStartDate
      ) {
        event.status = 'ONGOING';
        result.push(event);
      }
    }

    return result;
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
