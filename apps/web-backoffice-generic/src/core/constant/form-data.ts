import FormData from "form-data";
import formidable from "formidable";
import { NextApiRequest } from "next";
import { isJSON } from "core-library/types";

type RequestFormData = { fields: formidable.Fields; files: formidable.Files };

export const reqBodyToFormData = async (req: NextApiRequest) => {
  const formData = new FormData();
  const fs = require("fs");
  const data = await new Promise<RequestFormData>((resolve, reject) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) =>
      err ? reject({ err }) : resolve({ fields, files })
    );
  });

  Object.keys(data.fields).forEach((key) => {
    const field = data.fields[key];
    const fieldValue = field instanceof Array ? field[0] : field;

    if (typeof fieldValue === "string" && isJSON(fieldValue)) {
      const json = JSON.parse(fieldValue);
      Object.keys(json).forEach((jsonKey) => {
        const jsonValue = json[jsonKey];
        formData.append(`${key}[]`, jsonValue);
      });
      return;
    }

    formData.append(key, fieldValue);
  });

  Object.keys(data.files).forEach((key) => {
    const files = data.files[key];
    const file = files instanceof Array ? files[0] : files;
    formData.append(key, fs.createReadStream(file?.filepath), {
      filename: file!.originalFilename!,
      contentType: file!.mimetype!,
    });
  });

  return formData;
};
