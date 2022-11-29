/**
 * @jest-environment jsdom
 */
test('Sample', async function() {
  document.body.innerHTML=`        
  <button id="showForm">Show Form</button>
  <form id="application-form" class="application-form" style="display: none;" name="Application">
      <label for="jobid">Job ID<i class="redtext">*</i></label> &nbsp; &nbsp;
      <input type="text" id="jobid" name="Job ID"> <br>
      <span class="helper-text"></span> <br> <br>
                            
      <label for="cname">Company Name<i class="redtext">*</i></label> <br>
      <input type="text" id="cname" name="Company Name"> <br> 
      <span class="helper-text"></span> <br> <br>
                            
      <label for="jobtype">Job Type </label> &nbsp; &nbsp;
      <input type="radio" name="jobtype" id="jobtype" value="FullTime" checked>Full-Time</input> &nbsp;&nbsp;
      <input type="radio" name="jobtype" id="jobtype" value="PartTime">Part-Time</input> &nbsp;&nbsp;
      <input type="radio" name="jobtype" id="jobtype" value="Internship">Internship</input> &nbsp;&nbsp; <br>
      <span class="helper-text"></span> <br> <br>
  
      <label for="jobrole">Job Role </label> &nbsp; &nbsp;
      <input type="text" id="jobrole" name="JobRole"> <br>
      <span class="helper-text"></span> <br> <br>
                              
      <label for="DOA">Date of Application <i class="redtext">*</i></label> &nbsp; &nbsp;
      <input type="date" id="doa" name="DateOfApplication" min="2020-01-01" max="2024-12-31"> <br>
      <span class="helper-text"></span> <br> <br>

      <label for="ApplicationStatus">Application Status</label> &nbsp; &nbsp;
      <select id="status" name="ApplicationStatus">
      <option value="applied" selected>Applied</option>
      <option value="inProgress">In Progress</option>
      <option value="offer">Offer</option>
      <option value="reject">Reject</option>
      </select> <br> 
      <span class="helper-text"></span> <br> <br>

      <label for="description">Description</label> <br>
      <input type="text" id="desc" name="Description"> <br>
      <span class="helper-text"></span> <br> <br>

      <input id="save" type="submit" value="SAVE">
      <input id="cancel" type="submit" value="CANCEL"> <br>
      <span class="helper-text"></span>
  </form>`;
  require(`./index.js`);
  const button = document.getElementById('showForm');
  button.click();
});

test('Sample1', async function() {
  document.body.innerHTML=`        
  <form id="application-form" class="application-form" style="display: none;" name="Application">
      <label for="jobid">Job ID<i class="redtext">*</i></label> &nbsp; &nbsp;
      <input type="text" id="jobid" name="Job ID"> <br>
      <span class="helper-text"></span> <br> <br>
                            
      <label for="cname">Company Name<i class="redtext">*</i></label> <br>
      <input type="text" id="cname" name="Company Name"> <br> 
      <span class="helper-text"></span> <br> <br>
                            
      <label for="jobtype">Job Type </label> &nbsp; &nbsp;
      <input type="radio" name="jobtype" id="jobtype" value="FullTime" checked>Full-Time</input> &nbsp;&nbsp;
      <input type="radio" name="jobtype" id="jobtype" value="PartTime">Part-Time</input> &nbsp;&nbsp;
      <input type="radio" name="jobtype" id="jobtype" value="Internship">Internship</input> &nbsp;&nbsp; <br>
      <span class="helper-text"></span> <br> <br>
  
      <label for="jobrole">Job Role </label> &nbsp; &nbsp;
      <input type="text" id="jobrole" name="JobRole"> <br>
      <span class="helper-text"></span> <br> <br>
                              
      <label for="DOA">Date of Application <i class="redtext">*</i></label> &nbsp; &nbsp;
      <input type="date" id="doa" name="DateOfApplication" min="2020-01-01" max="2024-12-31"> <br>
      <span class="helper-text"></span> <br> <br>

      <label for="ApplicationStatus">Application Status</label> &nbsp; &nbsp;
      <select id="status" name="ApplicationStatus">
      <option value="applied" selected>Applied</option>
      <option value="inProgress">In Progress</option>
      <option value="offer">Offer</option>
      <option value="reject">Reject</option>
      </select> <br> 
      <span class="helper-text"></span> <br> <br>

      <label for="description">Description</label> <br>
      <input type="text" id="desc" name="Description"> <br>
      <span class="helper-text"></span> <br> <br>
      <button id="save">Save</button>
      <input id="cancel" type="submit" value="CANCEL"> <br>
      <span class="helper-text"></span>
  </form>`;
  require(`./index.js`);

  const jobIDElement = document.getElementById('jobid');
  jobIDElement.value = `1`;
  const companyNameElement = document.getElementById('cname');
  companyNameElement.value = `UCSD`;
  const jobTypeElement = document.getElementsByName('jobtype');
  jobTypeElement.value = `Full-time`;
  const jobRoleElement = document.getElementById('jobrole');
  jobRoleElement.value = `SDE`;
  const doaElement = document.getElementById('doa');
  doaElement.value = `2020-01-01`;
  const applicationStatusElement = document.getElementById('status');
  applicationStatusElement.value = `offer`;
  const descriptionElement = document.getElementById('desc');
  descriptionElement.value = `good`;

  const button = document.getElementById('save');
  console.log(button.innerHTML);
  button.click();
  expect(descriptionElement.innerHTML).toBe(``);
});
