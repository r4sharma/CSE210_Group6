from selenium_insert_test import testAddForm, getCardInfo
from selenium_insert_test import closeDriver
from selenium_insert_test import driver, By
import time

cards_class_name = "card mb-3 mx-auto"
cards_class_name = cards_class_name.split(" ")
new_str = ""
for i in cards_class_name:
    new_str += (i+".")
cards_class_name = new_str[:-1]
card_text_class = "card-text"
delete_button_prompt_id = "delete-app"
delete_button_id = 'deleteAppButton'

def testDelete():
    application1 = {
        'jobid_name' : "31023",
        'jobtype_name': "PartTime",
        'jobrole_name': "SDE",
        'company_name': "Amazon",
        'application_status_name': "In Progress",
        'input_date': "30-11-2022",
        'description_name': "All good",
    }
    application2 = {
        'jobid_name' : "12421",
        'jobtype_name': "FullTime",
        'jobrole_name': "ML Engineer",
        'company_name': "Google",
        'application_status_name': "Applied",
        'input_date': "02-12-2022",
        'description_name': "Received referral",
    }
    # We add 2 cards and then delete 1 to check
    testAddForm(True, application1, checkAssert = True)
    time.sleep(1)
    testAddForm(True, application2, checkAssert = False)
    time.sleep(3)
    # Access the cards
    cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
    assert(len(cards) != 0)
    original_number_cards = len(cards)

    # Store the values of the second card
    # After deletion, the value of the new first card should match exactly with the values of the original second card
    original_second_card = getCardInfo(cards[3])
    
    # Now click on the delete button of the first card
    delete_button_prompt = cards[2].find_element(By.ID,delete_button_prompt_id)
    driver.execute_script("arguments[0].click();", delete_button_prompt)
    time.sleep(2)

    delete_button = driver.find_element(By.ID, delete_button_id)
    driver.execute_script("arguments[0].click();", delete_button)

    time.sleep(2)
    updated_cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
    new_first_card = getCardInfo(updated_cards[2])

    new_number_cards = len(driver.find_elements(By.CLASS_NAME, cards_class_name))
    
    assert(new_number_cards == original_number_cards - 1)
    assert(len(original_second_card) == len(new_first_card))

    for i in range(len(original_second_card)):
        assert(original_second_card[i] == new_first_card[i])

    print("ALL ASSERTIONS PASSED FOR DELETE")

def main():
    testDelete()
    closeDriver()
if __name__ == '__main__':
    main()
