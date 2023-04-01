const multer = require("multer");

const materialsDomain = require("../../../domain/materials");

const uploadMaterialImage = multer();

module.exports = (app) => {
  app.get(`/`, async (req, res) => {
    try {
      const materials = await materialsDomain.getMaterials();
      res.status(200).json({ materials });
    } catch (error) {
      console.error("Failed to get materials", { error: error });
      res.status(404).json({ message: error.message });
    }
  });

  app.get(`/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const material = await materialsDomain.findMaterialByName(name);
      res.status(200).json({ material });
    } catch (error) {
      console.error("Failed to get material", { error: error });
      res.status(404).json({ message: error.message });
    }
  });

  app.get(`/material-images/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const materialImages = await materialsDomain.getMaterialImages(name);
      res.status(200).json({ materialImages });
    } catch (error) {
      console.error("Failed to get material images", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, async (req, res) => {
    try {
      const material = req.body;
      const newMaterial = await materialsDomain.createMaterial(material);
      res.status(200).json({ material: newMaterial });
    } catch (error) {
      console.error("Failed to create material", { error: error });
      res.status(500).json({ message: error.message });
    }
  });

  app.post(`/update`, async (req, res) => {
    try {
      const { name, update } = req.body;
      const queryResponse = await materialsDomain.updateMaterial(name, update);
      if (queryResponse.modifiedCount == 0) {
        throw new Error(`no material found with name=${name}`);
      }
      res.status(200).json("material is updated");
    } catch (error) {
      console.error("Failed to create material", { error: error });
      res.status(500).json({ message: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { names } = req.body;
      const queryResponse = await materialsDomain.deleteMaterials(names);
      if (queryResponse.deletedCount !== names.length) {
        throw new Error(
          `some materials in given list are not found total updated materials are ${queryResponse.deletedCount}`
        );
      }
      res.status(200).json("materials are deleted");
    } catch (error) {
      console.error("Failed to delete materials", { error: error });
      res.status(500).json({ message: error.message });
    }
  });

  app.post(
    `/add-image`,
    uploadMaterialImage.single("image"),
    async (req, res) => {
      try {
        const { name, mode } = req.body;
        const image = req.file;
        const updatedMaterial = await materialsDomain.addImageToMaterial(
          name,
          mode,
          image
        );
        res
          .status(200)
          .json({ message: "material is updated", material: updatedMaterial });
      } catch (error) {
        console.error("Failed to update material", { error: error });
        res.status(500).json({ error: error.message });
      }
    }
  );

  app.delete(`/delete/images`, async (req, res) => {
    try {
      const { name, imagesIds } = req.body;
      const updatedMaterial = await materialsDomain.deleteImageFromMaterial(
        name,
        imagesIds
      );
      res.status(200).json({
        message: "images are removed from material",
        material: updatedMaterial,
      });
    } catch (error) {
      console.error("Failed to remove images from material", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};
