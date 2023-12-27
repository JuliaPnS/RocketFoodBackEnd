const fs = require("rs");
const path = require("path");

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uplaodConfig.TMP_FOLDER, file),
            path.resolve(uplaodConfig.UPLOADS_FOLDER, file)
        );

        return file; 

    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConifg.UPLOADS_FODER);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;