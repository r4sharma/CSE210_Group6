'''
APPROACH:

The approach here will be to simulate multiple changes and ensure that each gets reflected in the statistics bar
The changes are as follows:
1. Applied
2. In Progress
3. Offer
4. Reject

The first case will be tested by inserting the file and applied counter should be increased by 1
The second case will be tested by using the edit_test functionality and applied should reduce by 1 and inprogress should increase by 1

The third case and fourth cases would translate from inprogress to the decision, with the counter of inprogress decreasing by 1 and the decision increasing by 1

'''
from selenium_insert_test import testAddForm
from selenium_insert_test import closeDriver
from selenium_insert_test import driver, By
import selenium_edit_test
import time

def getAppliedCount():
    return int(driver.find_element(By.ID, "appliedCount").text)
def getInProgressCount():
    return int(driver.find_element(By.ID, "inProgressCount").text)
def getOfferCount():
    return int(driver.find_element(By.ID, "offerCount").text)
def getRejectedCount():
    return int(driver.find_element(By.ID, "rejectCount").text)

def getApplication(application_status):
    application = {
            'jobid_name' : "31023",
            'jobtype_name': "PartTime",
            'jobrole_name': "SDE",
            'company_name': "Amazon",
            'application_status_name': application_status,
            'input_date': "30-11-2022",
            'description_name': "All good",
        }
    return application

def getCardElement():
    # Access the cards
    cards = driver.find_elements(By.CLASS_NAME, selenium_edit_test.cards_class_name)
    assert(len(cards) != 0)

    # Now click on the edit button of the first card
    edit_button_prompt = cards[1].find_element(By.ID, selenium_edit_test.edit_form_button_id)
    driver.execute_script("arguments[0].click();", edit_button_prompt)
    time.sleep(2)

    form_element = driver.find_element(By.ID, selenium_edit_test.edit_form_id)
    return form_element

def testStatsBar():
    
    # We add only 1 card and click on the update button
    testAddForm(True, getApplication("Applied"), checkAssert = True)
    time.sleep(2)

    applied_count = 0
    in_progress_count = getInProgressCount()
    offer_count = getOfferCount()
    rejected_count = getRejectedCount()

    assert(getAppliedCount() == applied_count + 1)
    applied_count = getAppliedCount()

    selenium_edit_test.modifyForm(getCardElement(), getApplication("In Progress"))
    assert(getAppliedCount() == applied_count - 1)
    assert(getInProgressCount() == in_progress_count + 1)
    time.sleep(2)

    applied_count = getAppliedCount()
    in_progress_count = getInProgressCount()

    selenium_edit_test.modifyForm(getCardElement(), getApplication("Offer"))
    assert(getInProgressCount() == in_progress_count - 1)
    assert(getOfferCount() == offer_count + 1)
    time.sleep(2)
    
    offer_count = getOfferCount()
    in_progress_count = getInProgressCount()
    
    selenium_edit_test.modifyForm(getCardElement(), getApplication("Reject"))
    assert(getOfferCount() == offer_count - 1)
    assert(getRejectedCount() == rejected_count + 1)
    
    print("ALL ASSERTIONS FOR STATSBAR PASSED")
  

def main():
    testStatsBar()
    closeDriver()
if __name__ == '__main__':
    main()

