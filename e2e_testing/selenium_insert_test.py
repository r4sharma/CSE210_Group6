import sys
import subprocess
import pkg_resources
# Install selenium and webdriver-manager
required_libraries = ['selenium', 'webdriver-manager']
installed_packages = pkg_resources.working_set
installed_packages_list = [i.key for i in installed_packages]

for library in required_libraries:
    if(library not in installed_packages_list):
        subprocess.check_call([sys.executable, "-m", "pip", "install", library])

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

company_id = "cname"

jobtype_id = "jobtype"

jobrole_id = "jobrole"

date_of_application_id = "doa"
input_date__verification = "2022-11-30"


application_status_id = "status"
application_status_verification = "inProgress"

description_id = "desc"

save_id = "save"
cancel_id = "cancel"
form_saved = True

cards_class_name = "card mb-3 mx-auto"
cards_class_name = cards_class_name.split(" ")
new_str = ""
for i in cards_class_name:
    new_str += (i+".")
cards_class_name = new_str[:-1]
card_text_class = "card-text"


def getCardInfo(card_element):
    # First 5 fields can be accessed using card-text as the class to be searched for
    # No need to be concerned by card-text in other cards since this function searches for card-text within a particular element
    card_text_elements = card_element.find_elements(By.CLASS_NAME, card_text_class)
    expected = []
    for i in card_text_elements:
        expected.append(i.find_elements(By.CSS_SELECTOR, "text")[1].text)
    
    # Append the company name and application status
    expected.append(card_element.find_element(By.CLASS_NAME, "navbar-brand").text)
    expected.append(card_element.find_element(By.CSS_SELECTOR, "h5").text)
    
    return expected

def testAddForm(form_saved, application, checkAssert = True):
    wait = loadForm()

    # Access the job id first and set it to a given value
    jobid_field = wait.until(EC.presence_of_element_located((By.ID,jobid_id)))
    jobid_field.send_keys(application['jobid_name'])
    
    # Access company field
    companyid_field = wait.until(EC.presence_of_element_located((By.ID,company_id)))
    companyid_field.send_keys(application['company_name'])

    # Access radio button
    jobtype_field = driver.find_elements(By.CSS_SELECTOR, "input[name='" + jobtype_id +"']")
    for el in jobtype_field:
        if el.get_attribute("value") == application['jobtype_name']:
            el.click()
    
    # Access job role field
    jobrole_field = wait.until(EC.presence_of_element_located((By.ID,jobrole_id)))
    jobrole_field.send_keys(application['jobrole_name'])

    date_of_application_field = wait.until(EC.presence_of_element_located((By.ID,date_of_application_id)))
    date_of_application_field.send_keys(application['input_date'])

    # Access application status dropdown
    application_status_field = wait.until(EC.presence_of_element_located((By.ID,application_status_id)))
    Select(application_status_field).select_by_visible_text(application['application_status_name'])

    # Access job role field
    description_field = wait.until(EC.presence_of_element_located((By.ID,description_id)))
    description_field.send_keys(application['description_name'])
    #time.sleep(5)
    # Click on the button as passed by the test
    if form_saved == True:
        save_button = wait.until(EC.presence_of_element_located((By.ID,save_id)))
        driver.execute_script("arguments[0].click();", save_button)
        time.sleep(2)
    else:
        cancel_button = wait.until(EC.presence_of_element_located((By.ID,cancel_id)))
        driver.execute_script("arguments[0].click();", cancel_button)
    #time.sleep(5)
    if checkAssert == True:
        # Check whether all the fields in the card have the same value as we input
        # Load the first card which has the class
        cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
        assert(len(cards) != 0)


        desired_card = cards[1]
        obtained_output = getCardInfo(desired_card)
        expected_output = [application['jobid_name'], application['jobtype_name'], application['jobrole_name'], input_date__verification, application['description_name'], application['company_name'], application_status_verification]
        assert(len(obtained_output) == len(expected_output))
        
        for i in range(len(obtained_output)):
            # Date and application status hasnt been finalized so dont check their assertions
            if (i != 3 and i != 6):
                assert(obtained_output[i] == expected_output[i])

        print("ALL ASSERTIONS PASSED FOR INSERT")

def closeDriver():
    driver.quit()

def main():
    application = {
        'jobid_name' : "31023",
        'jobtype_name': "PartTime",
        'jobrole_name': "SDE",
        'company_name': "Amazon",
        'application_status_name': "In Progress",
        'input_date': "30-11-2022",
        'description_name': "All good",
    }
    testAddForm(form_saved, application, checkAssert = True)
    closeDriver()
if __name__ == '__main__':
    main()
