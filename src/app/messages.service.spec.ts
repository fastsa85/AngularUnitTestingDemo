import { MessageService } from './message.service';

describe('MessageService', () => {

  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should not have messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    service.add('new message 1');

    expect(service.messages.length).toBe(1);
  });

  it('should remove messages when clear is called', () => {
    service.add('new message 1');
    service.add('new message 2');

    service.clear();

    expect(service.messages.length).toBe(0);
  });

});
