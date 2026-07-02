import { sql, relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  preferences: text('preferences', { mode: 'json' }).$type<{
    theme?: 'light' | 'dark' | 'system';
    timerDefault?: number;
    graceDaysEnabled?: boolean;
  }>(),
});

// Plans table
export const plans = sqliteTable('plans', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title', { length: 200 }).notNull(),
  description: text('description'),
  status: text('status', { enum: ['active', 'completed', 'archived'] })
    .default('active')
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
});

// Steps table
export const steps = sqliteTable('steps', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  planId: text('plan_id')
    .references(() => plans.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer('order').notNull(),
  text: text('text', { length: 500 }).notNull(),
  status: text('status', {
    enum: ['pending', 'in_progress', 'done', 'skipped'],
  })
    .default('pending')
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
});

// Focus sessions table
export const focusSessions = sqliteTable('focus_sessions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  stepId: text('step_id').references(() => steps.id, { onDelete: 'set null' }),
  durationSeconds: integer('duration_seconds').notNull(),
  actualDurationSeconds: integer('actual_duration_seconds'),
  energyLevel: text('energy_level', { enum: ['low', 'medium', 'high'] }),
  focusQuality: text('focus_quality', {
    enum: ['distracted', 'ok', 'locked_in'],
  }),
  notes: text('notes'),
  startedAt: integer('started_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  endedAt: integer('ended_at', { mode: 'timestamp' }),
});

// Parked thoughts (brain dumps) table
export const parkedThoughts = sqliteTable('parked_thoughts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  sessionId: text('session_id')
    .references(() => focusSessions.id, { onDelete: 'set null' }),
  text: text('text').notNull(),
  voiceTranscription: integer('voice_transcription', { mode: 'boolean' })
    .default(false)
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
});

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Plan = typeof plans.$inferSelect;
export type NewPlan = typeof plans.$inferInsert;

export type Step = typeof steps.$inferSelect;
export type NewStep = typeof steps.$inferInsert;

export type FocusSession = typeof focusSessions.$inferSelect;
export type NewFocusSession = typeof focusSessions.$inferInsert;

export type ParkedThought = typeof parkedThoughts.$inferSelect;
export type NewParkedThought = typeof parkedThoughts.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  plans: many(plans),
  focusSessions: many(focusSessions),
  parkedThoughts: many(parkedThoughts),
}));

export const plansRelations = relations(plans, ({ one, many }) => ({
  user: one(users, {
    fields: [plans.userId],
    references: [users.id],
  }),
  steps: many(steps),
}));

export const stepsRelations = relations(steps, ({ one, many }) => ({
  plan: one(plans, {
    fields: [steps.planId],
    references: [plans.id],
  }),
  focusSessions: many(focusSessions),
}));

export const focusSessionsRelations = relations(focusSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [focusSessions.userId],
    references: [users.id],
  }),
  step: one(steps, {
    fields: [focusSessions.stepId],
    references: [steps.id],
  }),
  parkedThoughts: many(parkedThoughts),
}));

export const parkedThoughtsRelations = relations(parkedThoughts, ({ one }) => ({
  user: one(users, {
    fields: [parkedThoughts.userId],
    references: [users.id],
  }),
  session: one(focusSessions, {
    fields: [parkedThoughts.sessionId],
    references: [focusSessions.id],
  }),
}));
