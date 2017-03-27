const eventResponse = require('../../jobs/event_response');

const data = [{ 
  kind: 'calendar#event',
  etag: '2981297382086930000',
  id: '55dc9s8c1kq4e60vm4p4cu5tr4@d2a',
  status: 'confirmed',
  created: '2017-03-27T21:04:51.000Z',
  updated: '2017-03-27T21:04:51.043Z',
  summary: 'Test Event',
  location: 'Accra Mall, Spintex Rd, Accra, Ghana',
  creator: { 
    email: 'test@example.com',
    displayName: 'Test Runner' 
  },
  organizer: { 
    email: 'test@example.com',
    displayName: 'Ghana\'s Tech Calendar',
    self: true
  },
  start: { 
    dateTime: '2017-03-28T09:00:00Z' 
  },
  end: { 
    dateTime: '2017-03-28T13:00:00Z' 
  },
  sequence: 0
}];

describe('test event response', () => {
  it('should have a response with at least 1 event', () => {
    let response = eventResponse(data, 'today');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should have a start date for an event', () => {
    let response = eventResponse(data, 'today');
    expect(response[0].fields[1].title).toBe('Start At');
  });

  it('should format the start date to a human readable format', () => {
    let response = eventResponse(data, 'today');
    expect(response[0].fields[1].value).toBe('Tue, Mar 28, 2017 at 09:00am');
  });
});