// Wolf component using the real wolf photo
// Props: running (bool), danger (bool for glow), size (number)
export default function Wolf({ running = false, danger = false, size = 1 }) {
  const width = Math.round(180 * size)
  const height = Math.round(120 * size)

  return (
    <img
      src="/wolf.jpeg"
      alt="wolf"
      className={danger ? 'animate-wolf-danger' : ''}
      style={{
        width: width,
        height: height,
        objectFit: 'contain',
        objectPosition: 'center bottom',
        display: 'block',
        // Remove the dark background by blending with the scene
        // The wolf image has a dark teal bg — 'darken' keeps the darker of
        // wolf or scene which effectively cuts out solid-color backgrounds
        // on a light sky/grass scene
        filter: danger
          ? 'drop-shadow(0 0 8px rgba(244, 67, 54, 0.9)) drop-shadow(0 0 16px rgba(244, 67, 54, 0.5))'
          : 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))',
        animation: running ? 'wolfBob 0.35s ease-in-out infinite' : 'none',
      }}
    />
  )
}
