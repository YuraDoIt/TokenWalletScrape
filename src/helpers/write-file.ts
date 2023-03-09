import fs from 'fs';
import path from 'path';

export function writeFileResult(fileName: string, obj: any, pathFile: string) {
  fs.writeFile(
      path.join(__dirname,`..`,`/files-result`,`${pathFile}`,`${fileName}.json`),
      JSON.stringify(obj),
      'utf-8',
      (err) => {
        if (err) {
          console.log(`Error create file`);
        } else {
          console.log(`Sucessfuly create File`);
      }
    },
  );
}