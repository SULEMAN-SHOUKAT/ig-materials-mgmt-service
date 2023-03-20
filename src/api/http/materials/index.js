const materialsDomain = require("../../../domain/materials");

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

  app.post(`/create`, async (req, res) => {
    try {
      const { name, Description, Resource, MetaMaterial } = req.body;
      const material = await materialsDomain.createMaterial({
        name,
        Description,
        Resource,
        MetaMaterial,
      });
      res.status(200).json({ material });
    } catch (error) {
      console.error("Failed to create material", { error: error });
      res.status(500).json({ message: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { name } = req.body;
      await materialsDomain.deleteMaterial(name);
      res.status(200).json("material is deleted");
    } catch (error) {
      console.error("Failed to delete material", { error: error });
      res.status(500).json({ message: error.message });
    }
  });

  app.delete(`/deleteMany`, async (req, res) => {
    try {
      const { names } = req.body;
      await materialsDomain.deleteMultipleMaterials(names);
      res.status(200).json("materials are deleted");
    } catch (error) {
      console.error("Failed to delete materials", { error: error });
      res.status(500).json({ message: error.message });
    }
  });

  return app;
};
