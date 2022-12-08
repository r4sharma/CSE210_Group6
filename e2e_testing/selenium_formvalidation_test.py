'''
Approach will be to input incorrect data or leave fields empty and ensure that the form doesn't accept the data
'''
from selenium_insert_test import testAddForm
from selenium_insert_test import closeDriver
from selenium_insert_test import driver, By
import time

company_name_error = "Please enter the Company Name"

def testFormValidation():
    application = {
        'jobid_name' : "31023",
        'jobtype_name': "PartTime",
        'jobrole_name': "SDE",
        'company_name': "",
        'application_status_name': "Applied",
        'input_date': "30-11-2022",
        'description_name': "All good",
    }
    testAddForm(True, application, checkAssert = False)

    # Assert the error shows when company name isn't entered
    assert(driver.find_element(By.ID, "validation-message").text == company_name_error)
    print("ALL ASSERTIONS PASSED FOR FORM VALIDATION")

def main():
    testFormValidation()
    closeDriver()
if __name__ == '__main__':
    main()