export type LeaderPortraitVariant = 'avatar' | 'card' | 'advisor'

export type LocalLeaderPortrait = {
  src: string
  objectPositions: Record<LeaderPortraitVariant, string>
}

export type ResolvedLeaderPortrait = {
  src?: string
  fallbackSrc?: string
  objectPosition: string
  fallbackObjectPosition: string
}

export type LeaderPortraitCandidate = {
  src: string
  objectPosition: string
}

export function getLeaderPortraitCandidates(portrait: ResolvedLeaderPortrait) {
  const candidates: LeaderPortraitCandidate[] = []

  if (portrait.src) {
    candidates.push({ src: portrait.src, objectPosition: portrait.objectPosition })
  }

  if (portrait.fallbackSrc && portrait.fallbackSrc !== portrait.src) {
    candidates.push({ src: portrait.fallbackSrc, objectPosition: portrait.fallbackObjectPosition })
  }

  return candidates
}

export function getActiveLeaderPortraitCandidate(candidates: LeaderPortraitCandidate[], failedSources: string[]) {
  return candidates.find((candidate) => !failedSources.includes(candidate.src))
}

const portrait = (
  fileName: string,
  avatarPosition = '50% 50%',
  portraitPosition = avatarPosition,
): LocalLeaderPortrait => ({
  src: `/leaders/2026-2027/${fileName}`,
  objectPositions: {
    avatar: avatarPosition,
    card: portraitPosition,
    advisor: portraitPosition,
  },
})

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

const professorPortrait = portrait('prof-baraka-maiseli.avif', '50% 34%', '50% 38%')

export const localLeaderPortraits: Readonly<Record<string, LocalLeaderPortrait>> = {
  [normalizeLeaderName('Collince Sanare')]: portrait('collince-sanare.avif', '50% 30%', '50% 32%'),
  [normalizeLeaderName('Baraka Alex')]: portrait('baraka-alex.avif', '50% 24%', '50% 28%'),
  [normalizeLeaderName('Alexander Marwa')]: portrait('alexander-marwa.avif', '50% 24%', '50% 28%'),
  [normalizeLeaderName('Hefsibamakelle Mteri')]: portrait('hefsibamakelle-mteri.avif', '50% 40%', '50% 42%'),
  [normalizeLeaderName('Noreen Mrema')]: portrait('noreen-mrema.avif', '50% 30%', '50% 34%'),
  [normalizeLeaderName('Sifa Kamendu')]: portrait('sifa-kamendu.avif', '50% 34%', '50% 38%'),
  [normalizeLeaderName('Lutome Galila')]: portrait('lutome-galila.avif', '50% 30%', '50% 34%'),
  [normalizeLeaderName('Gadi Josephat')]: portrait('gadi-josephat.avif', '50% 28%', '50% 32%'),
  [normalizeLeaderName('Abdon Musa')]: portrait('abdon-musa.avif', '50% 30%', '50% 32%'),
  [normalizeLeaderName('Dorcas Laiser')]: portrait('dorcas-laiser.avif', '50% 18%', '50% 24%'),
  [normalizeLeaderName('Winifrida Masalu')]: portrait('winifrida-masalu.avif', '50% 32%', '50% 36%'),
  [normalizeLeaderName('Prof. Baraka J. Maiseli')]: professorPortrait,
  [normalizeLeaderName('Baraka Maiseli')]: professorPortrait,
}

export function getLocalLeaderPortrait(name: string) {
  return localLeaderPortraits[normalizeLeaderName(getCanonicalLeaderName(name))]
}

export function resolveLeaderPortrait(
  name: string,
  databaseImage?: string | null,
  variant: LeaderPortraitVariant = 'card',
): ResolvedLeaderPortrait {
  const databaseSrc = databaseImage?.trim() || undefined
  const localPortrait = getLocalLeaderPortrait(name)

  return {
    src: localPortrait?.src ?? databaseSrc,
    fallbackSrc: localPortrait ? databaseSrc : undefined,
    objectPosition: localPortrait?.objectPositions[variant] ?? '50% 50%',
    fallbackObjectPosition: '50% 50%',
  }
}

export function isGuardianLeaderName(name: string) {
  const normalizedName = normalizeLeaderName(name)
  return normalizedName === 'baraka maiseli'
    || normalizedName === 'prof baraka j maiseli'
    || normalizedName === 'professor baraka j maiseli'
}
