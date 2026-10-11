import {
  bigint,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const lotes = pgTable('lotes', {
  id: bigint('id', { mode: 'number' }).generatedAlwaysAsIdentity().primaryKey(),

  nome: varchar('nome', { length: 150 }).notNull(),
  descricao: text('descricao'),

  valorTotal: numeric('valor_total', {
    precision: 14,
    scale: 2,
  }).notNull(),

  metaCaptacao: numeric('meta_captacao', {
    precision: 14,
    scale: 2,
  }).notNull(),

  valorCaptado: numeric('valor_captado', {
    precision: 14,
    scale: 2,
  })
    .notNull()
    .default('0'),

  status: varchar('status', { length: 30 }).notNull().default('em_captacao'),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
