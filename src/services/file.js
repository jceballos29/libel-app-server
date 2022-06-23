/** @format */

const { File } = require('../models');
const { uploadFile } = require('../utils/storage');

class FileService {
  static async save(file) {
    try {
      const result = await uploadFile(file);
      if (result.success) {
        const newFile = await File.create({
          name: result.fileName,
          url: result.url,
        });
        return newFile;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FileService;
