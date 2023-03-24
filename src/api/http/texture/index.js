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
  app.get(`/texture-images/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const textureImages = await textureDomain.getTextureImages(name);
      res.status(200).json({ textureImages });
    } catch (error) {
      console.error("Failed to get texture images", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, async (req, res) => {
    try {
      const texture = req.body;
      const newTexture = await textureDomain.createTexture(texture);
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

  app.post(
    `/add-image`,
    uploadTextureImage.single("image"),
    async (req, res) => {
      try {
        const { name, mode } = req.body;
        const image = req.file;
        const updatedTexture = await textureDomain.addImageToTexture(
          name,
          mode,
          image
        );
        res
          .status(200)
          .json({ message: "texture is updated", texture: updatedTexture });
      } catch (error) {
        console.error("Failed to update texture", { error: error });
        res.status(500).json({ error: error.message });
      }
    }
  );

  app.delete(`/delete/images`, async (req, res) => {
    try {
      const { name, imagesIds } = req.body;
      const updatedTexture = await textureDomain.deleteImageFromTexture(
        name,
        imagesIds
      );
      res.status(200).json({
        message: "images are removed from texture",
        texture: updatedTexture,
      });
    } catch (error) {
      console.error("Failed to remove images from texture", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { names } = req.body;
      const queryResponse = await textureDomain.deleteTextures(names);
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
