const mongoose = require("mongoose");

const ParametersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    diffuse: { type: String, required: true, default: null },
    specular: { type: String, required: true, default: null },
    emission: { type: String, required: true, default: null },
    shininess: { type: Number, required: true, default: 0 },
    ambient: { type: String, required: true, default: null },
    transparency: { type: Number, required: true, default: 0 },
    texture: { type: String, default: null },
    mapping: { type: String, default: null },
  },
  { timestamps: true, strict: true }
);

ParametersSchema.index({ name: 1 }, { unique: true });

const ParametersModel = mongoose.model("parameters", ParametersSchema);

module.exports = ParametersModel;
