const url = "http://localhost:3030/staffs"

async function getStaffs() {
     let staffs = await fetch(url).then(data => data.json())
     let staffDivs = ''
     staffs.forEach(staff => {
          staffDivs +=
               `<div class="card">
                    <div class="card-header">
                         <img src="./assests/logo.png" class="logo" alt="">
                         <div>
                              <a href=""><img src="./assests/edit.png" class="card-top-but"></a>
                              <a href=""><img src="./assests/delete.png" class="card-top-but" onclick="deleteStaff(${staff.id})"></a>
                         </div>
                    </div>
                    <div class="card-content">
                         <div class="card-c-name">
                              <span>Name</span>
                              <h1>${staff.name}</h1>
                         </div>
                         <div class="card-c-details">
                              <div class="card-c-country">
                                   <span>Dept</span>
                                   <h3>${staff.dept}</h3>
                              </div>
                              <div class="card-c-position">
                                   <span>Phone no</span>
                                   <h3>${staff.phone}</h3>
                              </div>
                         </div>
                    </div>
               </div>`
     });

     document.getElementById('container').innerHTML = staffDivs
}

function deleteStaff(id) {
     return fetch(url + `?id=${id}`, { 
          method: 'DELETE'
     })
}

getStaffs()