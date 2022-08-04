import { TSortBy } from './TSortBy'
import { TSortOrder } from './TSortOrder'

export type THandleWinnersOrderCallback = (
  e: MouseEvent,
  { sortBy, sortOrder }: { sortBy: TSortBy; sortOrder: TSortOrder }
) => void
