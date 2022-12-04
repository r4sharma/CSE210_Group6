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
import time



