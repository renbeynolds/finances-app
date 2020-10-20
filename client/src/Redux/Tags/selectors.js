export const selectTagsArray = (state) => {
  return Object.values(state.tags);
};

export const selectTagOptions = (state, currentTags) => {
  const ids = currentTags.map(t => t.id) || [];
  return Object.values(state.tags).filter(t => !ids.includes(t.id)).map(t => ({ value: t.name, id: t.id }));
};