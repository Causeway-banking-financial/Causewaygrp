/**
 * Database Schema for CauseWay Website
 * Includes: users, newsletter_subscriptions, inquiries
 */

import { mysqlTable, int, varchar, text, timestamp, mysqlEnum, boolean } from 'drizzle-orm/mysql-core';

// Users table (existing)
export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  openId: varchar('openId', { length: 64 }).notNull().unique(),
  name: text('name'),
  email: varchar('email', { length: 320 }),
  loginMethod: varchar('loginMethod', { length: 64 }),
  role: mysqlEnum('role', ['user', 'admin']).notNull().default('user'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow().onUpdateNow(),
  lastSignedIn: timestamp('lastSignedIn').notNull().defaultNow(),
});

// Newsletter subscriptions table
export const newsletterSubscriptions = mysqlTable('newsletter_subscriptions', {
  id: int('id').autoincrement().primaryKey(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  status: mysqlEnum('status', ['pending', 'confirmed', 'unsubscribed']).notNull().default('pending'),
  confirmationToken: varchar('confirmationToken', { length: 64 }).notNull().unique(),
  language: varchar('language', { length: 5 }).notNull().default('en'),
  source: varchar('source', { length: 100 }), // Where they subscribed from (footer, popup, etc.)
  confirmedAt: timestamp('confirmedAt'),
  unsubscribedAt: timestamp('unsubscribedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow().onUpdateNow(),
});

// Service inquiries table
export const inquiries = mysqlTable('inquiries', {
  id: int('id').autoincrement().primaryKey(),
  serviceName: varchar('serviceName', { length: 200 }).notNull(),
  serviceNameAr: varchar('serviceNameAr', { length: 200 }),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 320 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 200 }),
  message: text('message'),
  language: varchar('language', { length: 5 }).notNull().default('en'),
  status: mysqlEnum('status', ['new', 'contacted', 'in_progress', 'completed', 'closed']).notNull().default('new'),
  notes: text('notes'), // Internal notes
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow().onUpdateNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type NewNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
