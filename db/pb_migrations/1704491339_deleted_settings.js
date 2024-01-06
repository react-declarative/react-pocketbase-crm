/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ilr05syd8k42wfp");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ilr05syd8k42wfp",
    "created": "2024-01-05 21:46:46.948Z",
    "updated": "2024-01-05 21:47:57.475Z",
    "name": "settings",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
