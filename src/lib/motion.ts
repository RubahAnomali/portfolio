export type Motion = 'full' | 'reduced'

/**
 * Animation mode. It starts from the system "reduce motion" setting (decided in index.html before the
 * first paint) but the visitor can override it with the Animations switch in the nav.
 */
export const getMotion = (): Motion => (document.documentElement.dataset.motion === 'reduced' ? 'reduced' : 'full')
export const isReduced = () => getMotion() === 'reduced'
