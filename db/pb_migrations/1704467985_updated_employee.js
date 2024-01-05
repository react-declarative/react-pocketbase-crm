/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ramsnf8u70fvwl0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbkzic9h",
    "name": "is_active",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ramsnf8u70fvwl0")

  // remove
  collection.schema.removeField("cbkzic9h")

  return dao.saveCollection(collection)
})
