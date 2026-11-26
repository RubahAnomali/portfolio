export type Motion = 'full' | 'reduced'

/**
 * Animation mode. Always on (decided in index.html before the first paint);
 * ?motion=reduced turns it off for one page view.
 */
export const getMotion = (): Motion => (document.documentElement.dataset.motion === 'reduced' ? 'reduced' : 'full')
export const isReduced = () => getMotion() === 'reduced'
