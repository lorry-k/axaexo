/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bhqabz4vn6vq5nk")

  collection.name = "items"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bhqabz4vn6vq5nk")

  collection.name = "articles"

  return dao.saveCollection(collection)
})
