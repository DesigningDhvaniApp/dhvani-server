import { EventDao } from '../../dbutils/event.dao';
import { Event } from '../../entities/Event';
import { HttpError, ResponseConflict } from '../../utils/Response';
import { AddEventInput, GetEventDetails } from './Types';
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

  async getEvent(id: number): Promise<GetEventDetails> {
    const event = await this.eventDao.findById(id);
    if (!event) {
      throw new Error('Event with Id not found');
    }

    const today = DateTime.now().toFormat('yyyy-MM-dd');
    let status = '';

    if (today < event.eventStartDate) {
      status = 'UPCOMING';
    } else if (today > event.eventEndDate) {
      status = 'COMPLETED';
    } else {
      status = 'ONGOING';
    }

    return {
      id: event.id,
      eventName: event.eventName,
      eventType: event.eventType,
      eventDescription: event.eventDescription,
      eventStartDate: event.eventStartDate,
      eventEndDate: event.eventEndDate,
      eventOrganisers: event.eventOrganisers,
      eventCost: event.eventCost,
      eventVenue: event.eventVenue,
      maxPlayers: event.maxPlayers,
      status: status,
    };
  }
}
