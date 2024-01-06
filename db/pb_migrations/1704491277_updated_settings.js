/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ilr05syd8k42wfp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0jmxe72l",
    "name": "features",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "with_preview_modal",
        "with_employee_creat"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ilr05syd8k42wfp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0jmxe72l",
    "name": "features",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "with_preview_modal"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
