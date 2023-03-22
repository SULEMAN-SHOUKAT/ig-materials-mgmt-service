const metaMaterialParametersDomain = require("../../../domain/meta-materials-parameters");

module.exports = (app) => {
  app.get(`/`, async (req, res) => {
    try {
      const metaMaterialParameters =
        await metaMaterialParametersDomain.getAll();
      res.status(200).json({ metaMaterialParameters });
    } catch (error) {
      console.error("Failed to get meta material parameters", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.get(`/:name`, async (req, res) => {
    try {
      const { pk } = req.params;
      const metaMaterialParameter =
        await metaMaterialParametersDomain.findByKey(pk);
      res.status(200).json({ metaMaterialParameter });
    } catch (error) {
      console.error("Failed to get meta material parameter", { error: error });
      res.status(404).json({ error: error.message });
    }
  });

  app.post(`/create`, async (req, res) => {
    try {
      const metaMaterialParameters = req.body;
      const newMetaMaterialParameters =
        await metaMaterialParametersDomain.create(metaMaterialParameters);
      res.status(200).json({
        message: "meta material parameters are created",
        metaMaterialParameters: newMetaMaterialParameters,
      });
    } catch (error) {
      console.error("Failed to create new meta material parameters", {
        error: error,
      });
      res.status(500).json({ error: error.message });
    }
  });

  app.post(`/update`, async (req, res) => {
    try {
      const { pk, update } = req.body;
      const queryResponse = await metaMaterialParametersDomain.update(
        pk,
        update
      );
      if (queryResponse.modifiedCount == 0) {
        throw new Error(`no meta material parameters found with pk=${pk}`);
      }
      res.status(200).json({ message: "meta material parameters is updated" });
    } catch (error) {
      console.error("Failed to update meta material parameters", {
        error: error,
      });
      res.status(500).json({ error: error.message });
    }
  });

  app.delete(`/delete`, async (req, res) => {
    try {
      const { pks } = req.body;
      const queryResponse = await metaMaterialParametersDomain.remove(pks);
      if (queryResponse.deletedCount !== pks.length) {
        throw new Error(
          `some meta materials parameters in given list are not found. Total deleted meta materials parameters are ${queryResponse.deletedCount}`
        );
      }
      res
        .status(200)
        .json({ message: "meta materials parameters are deleted" });
    } catch (error) {
      console.error("Failed to delete meta materials parameters", {
        error: error,
      });
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};
