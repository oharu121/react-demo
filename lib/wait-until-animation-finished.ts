export const waitUntilAnimationFinished = async (
  node: Animatable,
  ...rest: Parameters<Animatable["getAnimations"]>
) => {
  const animations = node.getAnimations(...rest);
  await Promise.all(animations.map((s) => s.finished));
};