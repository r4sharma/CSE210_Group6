console.log('scripts.js successfully loaded');

function showApplications() {
  console.log('applications is currently being displayed');
  document.getElementById('applications').style.display = '';
  document.getElementById('reminders').style.display = 'none';
  document.getElementById('statistics').style.display = 'none';
}

function showReminders() {
  console.log('reminders is currently being displayed');
  document.getElementById('applications').style.display = 'none';
  document.getElementById('reminders').style.display = '';
  document.getElementById('statistics').style.display = 'none';
}

function showStatistics() {
  console.log('statistics is currently being displayed');
  document.getElementById('applications').style.display = 'none';
  document.getElementById('reminders').style.display = 'none';
  document.getElementById('statistics').style.display = '';
}
