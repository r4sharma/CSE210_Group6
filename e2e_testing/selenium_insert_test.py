import sys
import subprocess
# Install selenium and webdriver-manager
required_libraries = ['selenium', 'webdriver-manager']
for library in required_libraries:
    if(library not in sys.modules):
        subprocess.check_call([sys.executable, "-m", "pip", "install", library])
    else:
        print(library + " is already present")

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import os
import time
from webdriver_manager.chrome import ChromeDriverManager


options = webdriver.ChromeOptions()
options.add_argument("--disable-gpu")
options.add_argument("--disable-software-rasterizer")
driver = webdriver.Chrome(ChromeDriverManager().install())
parent_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
if os.name == 'nt':
    print(parent_path)
    page_link = parent_path + "\src\index.html"
elif os.name == 'posix':
    page_link = "file:///" + parent_path + "/src/index.html"
wait = None

def loadForm():
    # Load the page
    driver.get(page_link)
    
    global wait
    wait = WebDriverWait(driver, 10)
    #Wait for it to load
    driver.implicitly_wait(10)
    driver.maximize_window()
    # Get the button of the form and click it
    button_element = wait.until(EC.presence_of_element_located((By.ID,show_form_button_id)))
    button_element.click()
    assert(button_element != None)
    return wait
# Define the ids and tags here
show_form_button_id = "showForm"
jobid_id = "jobid"
jobid_name = "31023"

company_id = "cname"
company_name = "Amazon"

jobtype_id = "jobtype"
jobtype_name = "PartTime"

jobrole_id = "jobrole"
jobrole_name = "SDE"

date_of_application_id = "doa"
input_date = "11-30-2022"
input_date_verification = "2022-11-30"


application_status_id = "status"
application_status_name = "In Progress"
application_status_verification = "inProgress"

description_id = "desc"
description_name = "All good"

save_id = "save"
cancel_id = "cancel"
form_saved = True

def testAddForm(form_saved):
    wait = loadForm()
    # Access the job id first and set it to a given value
    jobid_field = wait.until(EC.presence_of_element_located((By.ID,jobid_id)))
    jobid_field.send_keys(jobid_name)
    
    # Access company field
    companyid_field = wait.until(EC.presence_of_element_located((By.ID,company_id)))
    companyid_field.send_keys(company_name)

    # Access radio button
    jobtype_field = driver.find_elements(By.CSS_SELECTOR, "input[name='" + jobtype_id +"']")
    for el in jobtype_field:
        if el.get_attribute("value") == jobtype_name:
            el.click()
    
    # Access job role field
    jobrole_field = wait.until(EC.presence_of_element_located((By.ID,jobrole_id)))
    jobrole_field.send_keys(jobrole_name)

    date_of_application_field = wait.until(EC.presence_of_element_located((By.ID,date_of_application_id)))
    date_of_application_field.send_keys(input_date)

    # Access application status dropdown
    application_status_field = wait.until(EC.presence_of_element_located((By.ID,application_status_id)))
    Select(application_status_field).select_by_visible_text(application_status_name)

    # Access job role field
    description_field = wait.until(EC.presence_of_element_located((By.ID,description_id)))
    description_field.send_keys(description_name)
    #time.sleep(5)
    # Click on the button as passed by the test
    if form_saved == True:
        save_button = wait.until(EC.presence_of_element_located((By.ID,save_id)))
        driver.execute_script("arguments[0].click();", save_button)
        time.sleep(5)
        driver.get(page_link)
        driver.find_element(By.TAG_NAME,'body').screenshot("test_copy.png")
        #assert(compare_images() == True)
    else:
        cancel_button = wait.until(EC.presence_of_element_located((By.ID,cancel_id)))
        driver.execute_script("arguments[0].click();", cancel_button)
    #time.sleep(5)
    # Check whether all the fields in the card have the same value as we input
    jobid_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[1]/div/p[1]/text[2]')))).text
    assert(jobid_verify == jobid_name)

    companyname_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[1]/div/h5')))).text
    assert(companyname_verify == company_name)

    jobtype_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[1]/div/p[2]/text[2]')))).text
    assert(jobtype_verify == jobtype_name)

    jobrole_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[1]/div/p[3]/text[2]')))).text
    assert(jobrole_verify == jobrole_name)

    date_of_application_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[1]/div/p[4]/text[2]')))).text
    assert(date_of_application_verify == input_date_verification)

    description_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[1]/div/p[5]/text[2]')))).text
    assert(description_verify == description_name)

    application_status_verify = (wait.until(EC.presence_of_element_located((By.XPATH,'//*[@id="app-card-container"]/div[1]/div/div[2]/div/div/h5')))).text
    assert(application_status_verify == application_status_verification)

    print("ALL ASSERTIONS PASSED")

def closeDriver():
    driver.quit()

def main():
    testAddForm(form_saved)
    closeDriver()
if __name__ == '__main__':
    main()
