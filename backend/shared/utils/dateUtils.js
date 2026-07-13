exports.formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 10);
};

exports.getCurrentDateStr = () => {
  return new Date().toISOString().slice(0, 10);
};