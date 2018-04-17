import { SortedByDatePipe } from './sorted-by-date.pipe';
import * as moment from 'moment';

describe('SortedByDatePipe', () => {
  const today = {
    'title': 'Swim Club',
    'image_url': 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_68460491.jpg',
    'date': moment().add(1, 'hours').toISOString(),
    'location': 'Brisbane',
    'available_seats': 14
  };

  const todayAgain = {
    'title': 'Swim Club Again',
    'image_url': 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_68460491.jpg',
    'date': moment().add(1, 'hours').toISOString(),
    'location': 'Brisbane',
    'available_seats': 14
  };


  const yesterday = {
    'title': 'Cat Nap Group',
    'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxut4j98oB6CBzDKoLjvUy-mSlXvdOAprM3-vAB5uHrR2I81pz',
    'date': moment().subtract(1, 'days').toISOString(),
    'location': 'Sydney',
    'available_seats': 16
  };

  const tomorrow = {
    'title': 'Let\'s Find Wally',
    'image_url': 'http://d1vzko4h6qahek.cloudfront.net/images/2/books/large/ST2711.jpg',
    'date': moment().add(1, 'days').toISOString(),
    'location': 'Melbourne',
    'available_seats': 29
  };

  const twoDaysAgo = {
    'title': 'Cat Club',
    'image_url': 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_68460491.jpg',
    'date': moment().subtract(2, 'days').toISOString(),
    'location': 'Brisbane',
    'available_seats': 14
  };

  const twoDayslater = {
    'title': 'Dog Club',
    'image_url': 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_68460491.jpg',
    'date': moment().add(2, 'days').toISOString(),
    'location': 'Brisbane',
    'available_seats': 14
  };

  it('create an instance', () => {
    const pipe = new SortedByDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null when no events', () => {
    const pipe = new SortedByDatePipe();
    const sortedEvents = pipe.transform(null);
    expect(sortedEvents).toBeNull();
  });

  it('should return events in order', () => {
    const pipe = new SortedByDatePipe();
    const sortedEvents = pipe.transform([twoDaysAgo, tomorrow, today, todayAgain, yesterday, twoDayslater]);
    expect(sortedEvents).toEqual([twoDaysAgo, yesterday, today, todayAgain, tomorrow, twoDayslater]);
  });
});
