/* eslint-disable camelcase */
// eslint-disable-next-line object-curly-newline
const mapDBToModel = ({ id, title, body, tags, created_at, updated_at }) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAat: updated_at,
});

module.exports = { mapDBToModel };
