import fs from 'fs';
import path from 'path';
import * as url from 'url';


const __dirname = url.fileURLToPath(new URL('./data.json', import.meta.url));

let jsonData = fs.readFileSync(__dirname)
let parsedData = JSON.parse(jsonData)
// console.log(parsedData);

function editJsonFile () {
    parsedData.map(el => {
        let container = {}
        container[`userId`] = el.user._id;

        console.log(container)
    }
    )
}

editJsonFile();


// let finalJsonData = JSON.stringify('finaldata', null, 2);
// fs.writeFileSync('jsonrepo', finalJsonData)
   