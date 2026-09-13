export type LocalLeaderPortrait = {
  src: string
  objectPosition: string
}

export type ResolvedLeaderPortrait = {
  src?: string
  fallbackSrc?: string
  objectPosition: string
  fallbackObjectPosition: string
}

const portrait = (fileName: string, objectPosition = '50% 50%'): LocalLeaderPortrait => ({
  src: `/leaders/2026-2027/${fileName}`,
  objectPosition,
})

const correctedPortrait = (fileName: string) => portrait(`${fileName}?v=2`)

export function normalizeLeaderName(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function getCanonicalLeaderName(name: string) {
  const trimmedName = name.trim()
  return normalizeLeaderName(trimmedName) === 'sifa ramendu' ? 'Sifa Kamendu' : trimmedName
}

const professorPortrait = portrait('prof-baraka-maiseli.webp')

export const localLeaderPortraits: Readonly<Record<string, LocalLeaderPortrait>> = {
  [normalizeLeaderName('Winifrida Masalu')]: correctedPortrait('winifrida-masalu.webp'),
  [normalizeLeaderName('Lutome Galila')]: correctedPortrait('lutome-galila.webp'),
  [normalizeLeaderName('Hefsibamakelle Mteri')]: correctedPortrait('hefsibamakelle-mteri.webp'),
  [normalizeLeaderName('Sifa Kamendu')]: correctedPortrait('sifa-kamendu.webp'),
  [normalizeLeaderName('Abdon Musa')]: correctedPortrait('abdon-musa.webp'),
  [normalizeLeaderName('Alexander Marwa')]: correctedPortrait('alexander-marwa.webp'),
  [normalizeLeaderName('Noreen Mrema')]: correctedPortrait('noreen-mrema.webp'),
  [normalizeLeaderName('Dorcas Laiser')]: correctedPortrait('dorcas-laiser.webp'),
  [normalizeLeaderName('Gadi Josephat')]: correctedPortrait('gadi-josephat.webp'),
  [normalizeLeaderName('Prof. Baraka J. Maiseli')]: professorPortrait,
  [normalizeLeaderName('Baraka Maiseli')]: professorPortrait,
}

export function getLocalLeaderPortrait(name: string) {
  return localLeaderPortraits[normalizeLeaderName(getCanonicalLeaderName(name))]
}

export function resolveLeaderPortrait(name: string, databaseImage?: string | null): ResolvedLeaderPortrait {
  const databaseSrc = databaseImage?.trim() || undefined
  const localPortrait = getLocalLeaderPortrait(name)

  return {
    src: databaseSrc ?? localPortrait?.src,
    fallbackSrc: databaseSrc ? localPortrait?.src : undefined,
    objectPosition: databaseSrc ? '50% 50%' : (localPortrait?.objectPosition ?? '50% 50%'),
    fallbackObjectPosition: localPortrait?.objectPosition ?? '50% 50%',
  }
}

export function isGuardianLeaderName(name: string) {
  const normalizedName = normalizeLeaderName(name)
  return normalizedName === 'baraka maiseli'
    || normalizedName === 'prof baraka j maiseli'
    || normalizedName === 'professor baraka j maiseli'
}
