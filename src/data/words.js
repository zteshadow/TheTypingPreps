export const words = {
  easy: [
    'hop', 'run', 'fox', 'wolf', 'deer', 'bird', 'tree', 'leaf',
    'fast', 'jump', 'flee', 'dash', 'race', 'hide', 'rest',
  ],
  medium: [
    'bunny', 'chase', 'quick', 'field', 'grass', 'bloom', 'swift',
    'woods', 'clover', 'meadow', 'spring', 'flower', 'rabbit', 'escape', 'forest', 'breeze',
  ],
  hard: [
    'quickly', 'gallop', 'blossom', 'hopping', 'running', 'chasing',
    'meadows', 'flowers', 'rainbow', 'sprinting', 'adventure', 'blossoms', 'grassland',
  ],
}

export function getWord(score, usedWord) {
  let pool
  if (score < 5) {
    pool = words.easy
  } else if (score < 15) {
    pool = [...words.easy, ...words.medium]
  } else {
    pool = [...words.medium, ...words.hard]
  }

  // Filter out the last used word to avoid immediate repeats
  const filtered = pool.filter(w => w !== usedWord)
  const source = filtered.length > 0 ? filtered : pool
  return source[Math.floor(Math.random() * source.length)]
}
