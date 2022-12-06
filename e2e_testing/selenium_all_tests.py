'''
The test will be executed in the following order:
1. Insert
2. Delete
3. Edit
4. Statsbar

'''

import os
# import os
tests_directory_path = None
parent_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
if os.name == 'nt':
    tests_directory_path = parent_path + "\e2e_testing\\"
elif os.name == 'posix':
    tests_directory_path = "file:///" + parent_path + "/e2e_testing/"

os.system("python " + tests_directory_path + "selenium_insert_test.py")
os.system("python " + tests_directory_path + "selenium_delete_test.py")
os.system("python " + tests_directory_path + "selenium_edit_test.py")
os.system("python " + tests_directory_path + "selenium_statsbar_test.py")
