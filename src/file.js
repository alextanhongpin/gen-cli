import fs from "fs";
import path from "path";

const cwd = process.cwd();

export const resolve = (...paths) => path.resolve(cwd, ...paths);

export const folderName = file => resolve(path.dirname(file));

export const createFolder = folder =>
  fs.promises.mkdir(folder, {
    recursive: true
  });

export const open = async (path, flag = "w+") => {
  return fs.promises.open(resolve(path), flag);
};

export const load = file => require(resolve(file));

export const ext = file => path.extname(path.basename(file));
