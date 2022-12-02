from selenium_insert_test import testAddForm
from selenium_insert_test import closeDriver
from selenium_insert_test import driver, By
import time

cards_class_name = "card mb-3 mx-auto"
cards_class_name = cards_class_name.split(" ")
new_str = ""
for i in cards_class_name:
    new_str += (i+".")
cards_class_name = new_str[:-1]

def getCardInfo(card_element):
    # First 5 fields can be accessed using card-text as the class to be searched for
    # No need to be concerned by card-text in other cards since this function searches for card-text within a particular element
    card_text_elements = card_element.find_elements(By.CLASS_NAME, "card-text")
    expected = []
    for i in card_text_elements:
        expected.append(i.find_elements(By.CSS_SELECTOR, "text")[1].text)
    
    # Append the company name and application status
    expected.append(card_element.find_element(By.CLASS_NAME, "card-body").find_element(By.CSS_SELECTOR, "h5").text)
    expected.append(card_element.find_element(By.CLASS_NAME, "text-light").text)
    
    return expected

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
    original_second_card = getCardInfo(cards[2])
    
    # Now click on the delete button of the first card
    delete_button = cards[1].find_element(By.ID,'delete-app')
    driver.execute_script("arguments[0].click();", delete_button)

    updated_cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
    new_first_card = getCardInfo(updated_cards[1])

    new_number_cards = len(driver.find_elements(By.CLASS_NAME, cards_class_name))
    
    assert(new_number_cards == original_number_cards - 1)
    assert(len(original_second_card) == len(new_first_card))

    for i in range(len(original_second_card)):
        assert(original_second_card[i] == new_first_card[i])

    print("ALL ASSERTIONS FOR DELETE PASSED")

def main():
    testDelete()
    closeDriver()
if __name__ == '__main__':
    main()
