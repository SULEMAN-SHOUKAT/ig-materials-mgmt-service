const multer = require("multer");

const textureDomain = require("../../../domain/texture");

const uploadTextureImage = multer();

module.exports = (app) => {
  app.get(`/`, async (req, res) => {
    try {
      const textures = await textureDomain.getTextures();
      res.status(200).json({ textures });
    } catch (error) {
      console.error("Failed to get textures", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.get(`/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const texture = await textureDomain.findTextureByName(name);
      res.status(200).json({ texture });
    } catch (error) {
      console.error("Failed to get texture", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, uploadTextureImage.array("images"), async (req, res) => {
    try {
      const { name } = req.body;
      const images = req.files;
      const newTexture = await textureDomain.createTexture(name, images);
      res
        .status(200)
        .json({ message: "texture is created", texture: newTexture });
    } catch (error) {
      console.error("Failed to create new texture", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.post(`/update`, async (req, res) => {
    try {
      const { name, update } = req.body;
      const queryResponse = await textureDomain.updateTexture(name, update);
      if (queryResponse.modifiedCount == 0) {
        throw new Error(`no texture found with name=${name}`);
      }
      res.status(200).json({ message: "texture is updated" });
    } catch (error) {
      console.error("Failed to update texture", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { name } = req.body;
      const queryResponse = await textureDomain.deleteTexture(name);
      if (queryResponse.deletedCount == 0) {
        throw new Error(`no texture found with name=${name}`);
      }
      res.status(200).json({ message: "texture is deleted" });
    } catch (error) {
      console.error("Failed to delete texture", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete-many`, async (req, res) => {
    try {
      const { names } = req.body;
      const queryResponse = await textureDomain.deleteMultipleTextures(names);
      if (queryResponse.deletedCount !== names.length) {
        throw new Error(
          `some textures in given list are not found. Total deleted textures are ${queryResponse.deletedCount}`
        );
      }
      res.status(200).json({ message: "textures are deleted" });
    } catch (error) {
      console.error("Failed to delete textures", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};
