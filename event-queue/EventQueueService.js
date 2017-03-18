import EventQueue from './EventQueue'

class EventQueueService {
  static createEventQueue () {
    return new EventQueue();
  }
}

export default EventQueueService
