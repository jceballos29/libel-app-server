const { FileService } = require('../services');
const responses = require('../utils/responses');


const upload = async (req, res) => {
  try {
    const file = await FileService.save(req.file);
    if (file) {
      return responses.success(res, file, 'File uploaded');
    }
    return responses.error(res, 'File not uploaded', 500);
  } catch (error) {
    return responses.error(res, error, 500);
  }
}


module.exports = { upload };