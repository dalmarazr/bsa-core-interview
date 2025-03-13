const {parse} = require('csv-parse')
const fs = require('fs');
const path = require('path')
class Database {
    temporalDatabase = []
    getOne(id) {  
       return this.temporalDatabase.find((currentElement)=> currentElement.id == id)
    }
    getElementsByFields(query) {
      return this.temporalDatabase.filter((currentElement)=> {
        for (const key in query) {
          if (currentElement[key] !== query[key]) {
            return false;
          }
        }
        return true;
      });

    }
    getAll() {  
        return this.temporalDatabase
    }
    update(id, body) {  
      const result = this.getElementById(id)
      if(result.error) {
        console.log("Element not found")
        return {error: "Element not found"}
      }
      const currentBody = {...body, id}
      this.temporalDatabase[result] = currentBody

    }
    partialUpdate(id, body) {
      const result = this.getElementById(id)
      if(result.error) {
        console.log("Element not found")
        return {error: "Element not found"}
      }
      const currentBody = {...body, id}
      this.temporalDatabase[result] = {...this.temporalDatabase[result], ...currentBody}
    } 
    delete(id) {  
      const result = this.getElementById(id)
      if(result.error) {
        console.log("Element not found")
        return {error: "Element not found"}
      }

      this.temporalDatabase.splice(result, 1)
    }
    create(body) {  
        const newId = this.temporalDatabase.length + 1
        body.id = newId
        this.temporalDatabase.push(body)
        return newId
    }
    getElementById(id) {
      const element = this.temporalDatabase.findIndex((currentElement)=> currentElement.id == id)
      if(element === -1) {
        console.log("Element not found")
        return {error: "Element not found"}
      }
      return element
    }
    async initDatabase() {  
      console.log("Initializing database")
        const mockDataCsvFilePath = path.join(__dirname, 'MOCK_DATA.csv')
        const data = await readCSVFile(mockDataCsvFilePath);
        data.forEach((record, index) => {
            record.id = index + 1;
        });
        this.temporalDatabase = data;
    }

}

async function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
      const records = [];
      fs.createReadStream(filePath)
          .pipe(parse({ columns: true, trim: true }))
          .on('data', (row) => {
              records.push(row);
          })
          .on('end', () => {
              resolve(records);
          })
          .on('error', (error) => {
              reject(error);
          });
  });
}


module.exports = {
    database: new Database()
}