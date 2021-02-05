import { locales } from 'graphcms.config'

export const findActiveLocale = (locale) =>
  locales.find(({ value }) => value === locale)
