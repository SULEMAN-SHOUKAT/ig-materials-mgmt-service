const parametersDomain = require("../../../domain/parameters");

module.exports = (app) => {
  app.get(`/`, async (req, res) => {
    try {
      const parameters = await parametersDomain.getParameters();
      res.status(200).json({ parameters });
    } catch (error) {
      console.error("Failed to get material parameters", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.get(`/:name`, async (req, res) => {
    try {
      const { name } = req.params;
      const parameters = await parametersDomain.findParametersByName(name);
      res.status(200).json({ parameters });
    } catch (error) {
      console.error("Failed to get material parameters", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, async (req, res) => {
    try {
      const parameters = req.body;
      const newParameters = await parametersDomain.createParameters(parameters);
      res
        .status(200)
        .json({ message: "parameters are created", parameters: newParameters });
    } catch (error) {
      console.error("Failed to create material parameters", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.post(`/update`, async (req, res) => {
    try {
      const { name, update } = req.body;
      const queryResponse = await parametersDomain.updateParameters(
        name,
        update
      );
      if (queryResponse.modifiedCount == 0) {
        throw new Error(`no parameters found with name=${name}`);
      }
      res.status(200).json({ message: "parameters are updated" });
    } catch (error) {
      console.error("Failed to update parameters", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { names } = req.body;
      const queryResponse = await parametersDomain.deleteParameters(names);
      if (queryResponse.deletedCount !== names.length) {
        throw new Error(
          `some parameters in given list are not found. Total deleted parameters are ${queryResponse.deletedCount}`
        );
      }
      res.status(200).json({ message: "material parameters are deleted" });
    } catch (error) {
      console.error("Failed to delete materials", { error: error });
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};
