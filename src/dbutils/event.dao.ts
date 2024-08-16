import AppDataSource from '../db/data-source';
import { Event } from '../entities/Event';

export class EventDao {
  private eventRepository = AppDataSource.getRepository(Event);

  async findByName(name: string): Promise<Event | null> {
    if (!name) return null;
    return await this.eventRepository.findOneBy({ eventName: name });
  }

  async eventExists(event: Partial<Event>): Promise<boolean> {
    if (await this.findByName(event.eventName)) return true;
    return false;
  }

  async save(event: Event): Promise<Event> {
    const entity = Object.assign(new Event(), event);
    return await this.eventRepository.save(entity);
  }

  async update(event: Partial<Event>) {
    const entity = Object.assign(new Event(), event);
    return await this.eventRepository.update(entity.id, entity);
  }

  async find() {
    return await this.eventRepository.find();
  }

  async findById(id: number): Promise<Event | null> {
    if (!id) return null;
    return await this.eventRepository.findOneBy({ id: id });
  }

  async deleteEvent(id: number) {
    return await this.eventRepository.delete(id);
  }
}
