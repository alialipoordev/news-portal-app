const { model, Schema } = require("mongoose");

const imageGallerySchema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "authors",
    },
    url: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("image-gallery", imageGallerySchema);
