/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gaolkdndvzlx5yd")

  // remove
  collection.schema.removeField("3tphcrv9")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gaolkdndvzlx5yd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3tphcrv9",
    "name": "date",
    "type": "date",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
