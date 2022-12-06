'''
This is for editing the form

Approach is as follows:
1. Insert the data in a manner similar to deletion test
2. Access the edit button
3. Access the fields that appear and modify the data
4. Confirm the modifications after clicking the save button

'''

from selenium_insert_test import testAddForm, getCardInfo
from selenium_insert_test import closeDriver
from selenium_insert_test import driver, By, Select
import time

cards_class_name = "card mb-3 mx-auto"
cards_class_name = cards_class_name.split(" ")
new_str = ""
for i in cards_class_name:
    new_str += (i+".")
cards_class_name = new_str[:-1]

edit_form_button_id = "edit-app"
edit_button_id = "editAppButton"
edit_form_id = "edit-form"
jobid_id = "editJobid"
company_id = "editCname"
jobtype_id = "editJobtype"
jobrole_id = "editJobrole"
date_of_application_id = "editDoa"
input_date__verification = "2022-11-30"
application_status_id = "editApplicationStatus"
description_id = "editDescription"

def modifyForm(form_element, updated_application):
    # 7 changes
    jobid_field = form_element.find_element(By.ID,jobid_id)
    jobid_field.clear()
    jobid_field.send_keys(updated_application['jobid_name'])

    companyid_field = form_element.find_element(By.ID,company_id)
    companyid_field.clear()
    companyid_field.send_keys(updated_application['company_name'])

    jobtype_field = driver.find_elements(By.CSS_SELECTOR, "input[name='" + jobtype_id +"']")
    for el in jobtype_field:
        if el.get_attribute("value") == updated_application['jobtype_name']:
            el.click()

    jobrole_field = form_element.find_element(By.ID,jobrole_id)
    jobrole_field.clear()
    jobrole_field.send_keys(updated_application['jobrole_name'])

    date_of_application_field = form_element.find_element(By.ID,date_of_application_id)
    date_of_application_field.send_keys(updated_application['input_date'])

    # Access application status dropdown
    application_status_field = form_element.find_element(By.ID,application_status_id)
    Select(application_status_field).select_by_visible_text(updated_application['application_status_name'])

    # Access job role field
    description_field = form_element.find_element(By.ID,description_id)
    description_field.clear()
    description_field.send_keys(updated_application['description_name'])

    edit_button = driver.find_element(By.ID, edit_button_id)
    driver.execute_script("arguments[0].click();", edit_button)

def testEdit():
    application = {
        'jobid_name' : "31023",
        'jobtype_name': "PartTime",
        'jobrole_name': "SDE",
        'company_name': "Amazon",
        'application_status_name': "In Progress",
        'input_date': "30-11-2022",
        'description_name': "All good",
    }
    updated_application = {
        'jobid_name' : "12421",
        'jobtype_name': "Internship",
        'jobrole_name': "ML Engineer",
        'company_name': "Google",
        'application_status_name': "Offer",
        'input_date': "02-12-2022",
        'description_name': "Received referral"
    }
    # We add only 1 card and click on the update button
    testAddForm(True, application, checkAssert = True)
    time.sleep(3)
    # Access the cards
    cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
    assert(len(cards) != 0)

    # Now click on the edit button of the first card
    edit_button_prompt = cards[1].find_element(By.ID, edit_form_button_id)
    driver.execute_script("arguments[0].click();", edit_button_prompt)
    time.sleep(2)

    form_element = driver.find_element(By.ID, edit_form_id)
    modifyForm(form_element, updated_application)

    time.sleep(2)
    updated_cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
    new_first_card = getCardInfo(updated_cards[1])
    
    # DATE and Application status dont match waht I fetch
    assert(updated_application['jobid_name'] == new_first_card[0])
    assert(updated_application['jobtype_name'] == new_first_card[1])
    assert(updated_application['jobrole_name'] == new_first_card[2])
    assert(updated_application['description_name'] == new_first_card[4])
    assert(updated_application['company_name'] == new_first_card[5])
    
    print("ALL ASSERTIONS PASSED FOR EDIT")

def main():
    testEdit()
    closeDriver()
if __name__ == '__main__':
    main()
