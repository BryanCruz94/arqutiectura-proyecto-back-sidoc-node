const Manual = require('./manual.model');
const Categoria = require('./categoria.model');
const Subcategoria = require('./subcategoria.model');
const Tipo = require('./tipo.model');
const PreguntaChat = require('./preguntaChat.model');

Manual.belongsTo(Subcategoria, {
  foreignKey: 'subcategoriaId',
  as: 'subcategoria',
});

Manual.belongsTo(Tipo, {
  foreignKey: 'tipoId',
  as: 'tipo',
});

Manual.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria',
});

Subcategoria.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria',
});

Categoria.hasMany(Subcategoria, {
  foreignKey: 'categoriaId',
  as: 'subcategorias',
});

Tipo.hasMany(Manual, {
  foreignKey: 'tipoId',
  as: 'manuales',
});

module.exports = {
  Manual,
  Categoria,
  Subcategoria,
  Tipo,
  PreguntaChat,
};