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

def testDelete():
    # We add 2 cards and then delete 1 to check
    testAddForm(True)
    time.sleep(1)
    testAddForm(True)
    time.sleep(3)
    # Access the cards
    cards = driver.find_elements(By.CLASS_NAME, cards_class_name)
    assert(len(cards) != 0)
    original_number_cards = len(cards)
    print("Original number: " + str(original_number_cards))
    # Now click on the delete button of the first card
    delete_button = cards[1].find_element(By.ID,'delete-app')
    driver.execute_script("arguments[0].click();", delete_button)
    
    new_number_cards = len(driver.find_elements(By.CLASS_NAME, cards_class_name))
    print("New number: " + str(new_number_cards))
    time.sleep(2)
    assert(new_number_cards == original_number_cards - 1)
    print("ALL ASSERTIONS FOR DELETE PASSED")

def main():
    testDelete()
    closeDriver()
if __name__ == '__main__':
    main()
