const fs = require('fs');
const xlsx = require('xlsx');
class upload {
    async convertExcelToJson(fileContent) {
        try {
            const dataBuffer = Buffer.isBuffer(fileContent) ? fileContent : Buffer.from(fileContent);


            const workbook = xlsx.read(dataBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Use { header: 1 } option to treat the first row as headers
            const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

            return jsonData;
        } catch (error) {
            throw error;
        }
    }
    process = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const filePath = req.file.path;
            const fileContent = fs.readFileSync(filePath);
            const jsonData = this.convertExcelToJson(fileContent);

            res.json({ jsonData: jsonData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new upload();
