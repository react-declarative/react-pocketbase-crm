/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tm47p5yosqd7g0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lklo4fjs",
    "name": "visibility",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tm47p5yosqd7g0")

  // remove
  collection.schema.removeField("lklo4fjs")

  return dao.saveCollection(collection)
})
