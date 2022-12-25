import fs from 'fs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('./data.json', import.meta.url));

let jsonData = fs.readFileSync(__dirname)
let parsedData = JSON.parse(jsonData)

function editJsonFile () {
   const jsonResult = parsedData.reduce((acc, el) => {

     const periodOfVacation = [`${el.startDate} - ${el.endDate}`]
     const checkUser = acc.findIndex((indx) => indx.userId === el.user._id)

      if(checkUser !== -1) {
       acc[checkUser].weekendDates.push(...periodOfVacation)

        return acc;
       }

        const resultVacationsObj = {
        userId: el.user._id,
        name: el.user.name,
        weekendDates: [...periodOfVacation]
     }
      acc.push(resultVacationsObj)

      return acc;
       }, 
      []
     )
     return jsonResult;
}

 console.log(editJsonFile())
const finalJson = editJsonFile()


let finalJsonData = JSON.stringify(finalJson, null, 2);
fs.writeFileSync(__dirname, finalJsonData)
   