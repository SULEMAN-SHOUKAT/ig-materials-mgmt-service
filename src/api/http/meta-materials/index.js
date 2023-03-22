const metaMaterialDomain = require("../../../domain/meta-materials");

module.exports = (app) => {
  app.get(`/`, async (req, res) => {
    try {
      const metaMaterials = await metaMaterialDomain.getMetaMaterials();
      res.status(200).json({ metaMaterials });
    } catch (error) {
      console.error("Failed to get meta materials", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.get(`/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const metaMaterial = await metaMaterialDomain.findMetaMaterialByName(
        name
      );
      res.status(200).json({ metaMaterial });
    } catch (error) {
      console.error("Failed to get meta material", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, async (req, res) => {
    try {
      const metaMaterial = req.body;
      const newMetaMaterial = await metaMaterialDomain.createMetaMaterial(
        metaMaterial
      );
      res.status(200).json({
        message: "meta material is created",
        metaMaterial: newMetaMaterial,
      });
    } catch (error) {
      console.error("Failed to create new meta material", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.post(`/update`, async (req, res) => {
    try {
      const { name, update } = req.body;
      const queryResponse = await metaMaterialDomain.updateMetaMaterial(
        name,
        update
      );
      if (queryResponse.modifiedCount == 0) {
        throw new Error(`no meta material found with name=${name}`);
      }
      res.status(200).json({ message: "meta material is updated" });
    } catch (error) {
      console.error("Failed to update meta material", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { names } = req.body;
      const queryResponse = await metaMaterialDomain.removeMetaMaterials(names);
      if (queryResponse.deletedCount !== names.length) {
        throw new Error(
          `some meta materials in given list are not found. Total deleted meta materials are ${queryResponse.deletedCount}`
        );
      }
      res.status(200).json({ message: "meta materials are deleted" });
    } catch (error) {
      console.error("Failed to delete meta materials", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};
