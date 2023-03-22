const mappingsDomain = require("../../../domain/mappings");

module.exports = (app) => {
  app.get(`/`, async (req, res) => {
    try {
      const mappings = await mappingsDomain.getMappings();
      res.status(200).json({ mappings });
    } catch (error) {
      console.error("Failed to get mappings", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.get(`/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const mapping = await mappingsDomain.findMappingByName(name);
      res.status(200).json({ mapping });
    } catch (error) {
      console.error("Failed to get mapping", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, async (req, res) => {
    try {
      const mapping = req.body;
      const newMapping = await mappingsDomain.createMapping(mapping);
      res
        .status(200)
        .json({ message: "mappings are created", mapping: newMapping });
    } catch (error) {
      console.error("Failed to create mappings", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.post(`/update`, async (req, res) => {
    try {
      const { name, update } = req.body;
      const queryResponse = await mappingsDomain.updateMapping(name, update);
      if (queryResponse.modifiedCount == 0) {
        throw new Error(`no mapping found with name=${name}`);
      }
      res.status(200).json({ message: "mapping is updated" });
    } catch (error) {
      console.error("Failed to update mapping", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { names } = req.body;
      const queryResponse = await mappingsDomain.deleteMappings(names);
      if (queryResponse.deletedCount !== names.length) {
        throw new Error(
          `some mappings in given list are not found. Total deleted mappings are ${queryResponse.deletedCount}`
        );
      }
      res.status(200).json({ message: "mappings are deleted" });
    } catch (error) {
      console.error("Failed to delete mappings", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};
