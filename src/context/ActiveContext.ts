import { createContext } from 'react'

/** Slides currently on (or about to enter) the screen; drives entrance animations. */
export const ActiveContext = createContext<ReadonlySet<string>>(new Set(['home']))
