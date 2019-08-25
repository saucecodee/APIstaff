const staff = require('../models/staff')
const routeHandler = {};

//============== Workers  ===============//
routeHandler.staffs = (data) => {
     return new Promise((resolve, reject) => {

          let dataObj = {
               status : 200
          }

          // Get all staffs
          if (data.method == 'get' && !data.query.id) {
               staff.getStaffs().then((data) => {
                    dataObj.payload = data || null
                    resolve(dataObj);
               })
          }    

          // Add a staff
          if (data.method == 'post') {
               staff.addStaff(data.payload).then((data) => {
                    dataObj.payload = data || null
                    resolve(dataObj);
               })
          }

          // Find a staff
          if (data.method == 'get' && data.query.id) {
               staff.findStaff(data.query.id).then((data) => {
                    dataObj.payload = data && data.staff || null;
                    resolve(dataObj);
               })
          }

          // Update a staff
          if (data.method == 'put') {
               staff.updateStaff(data.query.id, data.payload).then((data) => {
                    dataObj.payload = data || null;
                    resolve(dataObj);
               })
          }

          // Delete staff
          if (data.method == 'delete') {
               staff.deleteStaff(data.query.id).then((data) => {
                    console.log(data)
                    dataObj.payload = data || null
                    resolve(dataObj);
               })
          }
     })
}

routeHandler.notFound = () => {
     return new Promise((resolve, reject) => {
          resolve(404, "Not found");
     })
}

module.exports = routeHandler