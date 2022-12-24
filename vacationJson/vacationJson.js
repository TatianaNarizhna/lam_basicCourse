import fs from 'fs';
import path from 'path';
import * as url from 'url';


const __dirname = url.fileURLToPath(new URL('./data.json', import.meta.url));

let jsonData = fs.readFileSync(__dirname)
let parsedData = JSON.parse(jsonData)
// console.log(parsedData);

function editJsonFile () {
    parsedData.map((el, indx, arr) => {
        let container = {}
        container[`userId`] = el.user._id;
        container.name = el.user.name;
        container[`weekendDates`] = [[`${el.startDate} - ${el.endDate}`]]

        if(arr.indexOf(el._id) !== indx._id) {
            container[`weekendDates`].push([`${el.startDate} - ${el.endDate}`]) 
          
        }

        console.log(container)
        return container
    }
    )
}

editJsonFile();


// let finalJsonData = JSON.stringify('finaldata', null, 2);
// fs.writeFileSync('jsonrepo', finalJsonData)
   