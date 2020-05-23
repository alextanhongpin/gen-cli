import fs from "fs";
import path from "path";

const cwd = process.cwd();

export const resolve = (...paths) => path.resolve(cwd, ...paths);

export const open = async (file, flag = "w+") => {
  await fs.promises.mkdir(resolve(path.dirname(file)), {
    recursive: true
  });
  return fs.promises.open(resolve(file), flag);
};

export const load = file => require(resolve(file));

export const ext = file => path.extname(path.basename(file));
