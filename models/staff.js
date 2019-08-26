const fs = require('fs')
const path = require('path')
const staffs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/staffs.json'), 'utf8'))

class Staff {
     async getStaffs() {
          return await staffs
     }

     async findStaff(id) {
          for (let i = 0; i < staffs.length; i++) {
               if (staffs[i].id == id) {
                    console
                    return { staff: staffs[i], index: i }
               }
          }
     }

     async addStaff(staff) {
          staffs.push(staff)
          await fs.writeFile("./data/staffs.json", JSON.stringify(staffs, null, 2), (err) => {
               if (err) console.log(err);
          });
          return staff
     }

     updateStaff(id, staff) {
          return new Promise((resolve, rej) => {
               this.findStaff(id)
                    .then((data) => {
                         console.log(data.index, "index")
                         if (data.index >= 0) {
                              staffs.splice(data.index, 1, staff)
                              fs.writeFile("./data/staffs.json", JSON.stringify(staffs, null, 2), (err) => { if (err) console.log(err); });
                              resolve(staffs[data.index])
                         }
                    })
          })
     }

     deleteStaff(id) {
          return new Promise((resolve, reject) => {
               this.findStaff(id)
                    .then((data) => {
                         try{
                              let staff = staffs[data.index]
                              staffs.splice(data.index, 1)
                              fs.writeFile("./data/staffs.json", JSON.stringify(staffs, null, 2), (err) => { if (err) console.log(err); });
                              return staff
                         }
                         catch(err){
                              return err
                         }
                    })
          })
     }
}
module.exports = new Staff()