import { faker } from '@faker-js/faker';
import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin Topsky',
    email: 'admin@topsky.com',
    phone: '+6281234567890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-15',
    password: 'adminpassword', // In a real app, this would be hashed
    role: 'admin'
  },
  {
    id: '2',
    name: faker.person.fullName(),
    email: 'user@topsky.com',
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    joinDate: faker.date.past().toISOString(),
    password: 'userpassword',
    role: 'user'
  }
];

for (let i = 0; i < 10; i++) {
  users.push({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    joinDate: faker.date.past().toISOString(),
    password: faker.internet.password(),
    role: 'user'
  });
}
