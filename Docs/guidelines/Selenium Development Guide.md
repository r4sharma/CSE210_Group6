
# Selenium Documentation

## Context

Writing unit tests for HTML code may become unfeasible, for example, due to lack of functions that return a variable. Thus we took the professor's advice where he suggested that tools like Puppeteer, Playwright, or Selenium could be used. In our project, Selenium has been utilized for end-to-end testing of the HTML code. This document explains the process of writing the test in the Selenium

## Approach
Selenium simulates a web-browser interaction by using a .exe file called the "WebDriver" to open a new window and then the page to be tested in that window. The WebDriver differs for each browser, and for each version of the chosen browser as well.

To ensure consistency, we assume that everyone has Google Chrome on their computers. In addition, a library called "webdriver-management" is used to ensure that the correct WebDriver is installed corresponding to the version of Google Chrome on each developer's machine.

The approach can be summarized in the following points:

 - Initialize the driver which loads and tracks the changes in the webpage
 - Access the elements to be tested
 - Modify the elements to be tested
 - Check that the changes made in the elements correspond with the expected behaviour

### 1. Initializing the driver
Simply put, the driver is our means of communicating with the elements present in the webpage. It is used to access the elements in our tests and it is used to execute any custom JS code if we wish so. In this project, we use Python for writing the scripts.

`driver  = webdriver.Chrome(ChromeDriverManager().install())`
The above line establishes the connection of the script with the executable file for our test Chrome environment. This is followed by the `get()` method that loads the webpage in the simulated browser:
`driver.get(page_link)`
Here, the page_link can either be a reference to HTML file on local computer or any https or http link.
At this stage, our driver for accessing the elements is ready.

### 2. Accessing the elements
Before jumping straight to the methods, it is important to understand and prioritize the criteria for accessing the elements in the HTML code. The suggestions below are written in decreasing priority order, with the required explanation.

- ID: Since id is used for specifying a unique HTML element, it is always preferred that the elements to be tested are accessible using id. This ensures greater flexibility for the developer writing the HTML too, as it means they can change the position, class, name or any other attribute of the element without worrying about breaking the test. This is especially **useful for accessing buttons and input fields**.
- Class: At times, there are requirements where a list or group of elements need to be accessed, and the size of such lists can change dynamically. For example, consider the job application tracker where adding a new application increases the size of the list. In such cases, if all the job cards have a common class, which should be the case if ideal HTML practices are adhered to, then the **class name can be used to access the list of elements.**
- CSS Selector: In some cases, an element may not have an id and accessing by class name would return a lot of elements. The developer would then have to hardcode the index of the element they want which isn't ideal. However, **sometimes** there are attributes which are unique to the element, such as "name=" or the "value=". In such cases, using the CSS Selector is helpful
- XPATH: This should be the last resort, as it **relies on the exact position of the element**. For example, if the desired element is present within two other div tags, then the query could look like `\body\div[1]\div\element`. As you may have inferred, using the exact location of the element makes the code extremely susceptible to any changes in the HTML code as any minor shift may cause the element to not be found.

Now that there is a general understanding of which selectors to be used depending on the requirements, lets dive into some of the code examples.

The driver is our primary tool to access elements, however we will see later how to access elements within an element itself only.

With the latest version of Selenium, we thankfully have to contend with only three methods:
- `driver.find_element(parameter1, parameter2)`
- `driver.find_elements(parameter1, parameter2)`
- `get_attribute()`

The utility of the second function is for accessing group of elements that share a common attribute such as a class name, while the first method finds the unique or the first occurence of the attribute. The third function is best understood by example as we'll see at the end of this section.

parameter1 refers to the attribute **by** which we need to access the element. The Selenium library requires a module called 'By' to be imported.
parameter2 is the string which we expect the attribute to have as the value.

Consider a button, that has the **id** as "saveButton", then the query for such an element will be:
`save_button = driver.find_element(By.ID, "saveButton")`
An alternative approach is to use the 'Expected Conditions' module called **EC** in Python which has the `presence_of_element_located` method to search for an element. This is optional, but can come in handy when the website is sluggish and new elements take time to load. This method thus needs to **wait**, and the code for the above scenario is as follows:
`wait = WebDriverWait(driver, 10) #Here 10 is the time interval in seconds
save_btn = wait.until(EC.presence_of_element_located((By.ID,"saveButton")))`

However, in this document I will use the `find_element()` or `find_elements()` to avoid confusion.

Now, if we want to get a group of elements using class, an example can look like this:
`class_elements = driver.find_elements(By.CLASS_NAME, "class_name")`

Keep in mind, if the HTML looks like `class = "class1 class2 class3"` then the query in Selenium will need to be formatted as follows
`driver.find_elements(By.CLASS_NAME, "class1.class2.class3"` 

To show how to use CSS selector and demonstrate our final case of accessing element within an elements, consider the HTML snippet below:
`<div class="class1>
	<div class="class2"
		<text value="abc"> ABC </text>
	</div>
	<div class="class2"
		<text value="xyz"> XYZ </text>
	</div>
<\div>`
Assume that we have to access the text fields of all elements that have class as "class2", as well as the text of the attribute "value="

Our first step can be as follows:
`list_elements = driver.find_elements(By.CLASS_NAME, "class2")`
However,an alternative could be to use CSS selector as the criteria. Observe the query below carefully:
`list_elements = driver.find_elements(By.CSS_SELECTOR, "div[class='class2']")`
There are three things to unpack here:
- The tag is mentioned in the string first. In this case, it is the 'div' tag.
- The square brackets contain the values to be matched
- The values, here it is class2, are written in single quotes

Once we have the list of WebElements, we iterate over them to store text in a list called 'stored_text' and the text of the value attribute as 'stored_values' as follows:
`
stored_text = []
stored_values = []
for element in list_elements:
	text_tag = element.find_element(By.CSS_SELECTOR, "text")
	stored_text.append(text_tag.text) 
	stored_values.append(element.get_attribute("value"))
`
The lists will look like this after the code has executed:
`
stored_text = [ABC, XYZ]
stored_values = [abc, xyz]
`
The '.text' feature is elaborated in the next section, however I hope the utility of the `get_attribute()` function was clear, i.e., **it accesses the other attributes present within the tag itself**, and not what exists in the substructure of the HTML code.


### 3. Modifying the elements
There are quite a few methods or attributes present, but let's focus on those which have the most utility:
- send_keys()
- click()
- text

If we have accessed a text field in a variable called 'input_name' for example, then to send the data to the field we use the `send_keys()` method. Let's say if I want to add the name Alex to the text field, the code will be:
`input_name = driver.find_element(By.ID, "name")`
`input_name.send_keys("Alex")`

On the other hand, there might be a scenario where we have a button called 'save_button' and we want to simulate a click action after filling the form. This can be done as follows:
`save_button = driver.find_element(By.ID, "saveButton")`
`save_button.click()`

However, this approach sometimes gives the error "element could not be found". In such cases, I would recommend using the following code:
`save_button = driver.find_element(By.ID, "saveButton")`
`driver.execute_script("arguments[0].click();", save_button)`

The `execute_script()` method performs a Javascript code on the element that we have passed, since we passed only one argument called save_button, the code executes the click method on that. Unfortunately, this is a quirk of Selenium where there is no definite reason as to why the default `click()` method fails sometimes.

Finally, sometimes if we access an element, we want to obtain the text that is present, i.e., if there is HTML tag `<div id="companyName"> Amazon </div>`, then we access the text 'Amazon' as follows:
`company_name_element = driver.find_element(By.ID, "companyName")`
`company_name = company_name_element.text`

These are the main methods that are required for writing majority of the tests in Selenium. Refer to documentation for more specific methods.

### 4. Check that the changes made in the elements correspond with expected outcome

After having understood Selenium, and how to access and modify the data, the last step is to verify the changes made in the test environment correspond with expected behaviour. In Python, simply use the `assert` function to ensure that, for example, the data inserted using the form matches the input data.

## Summary

The entire process can be summarized as follows:
- Identify the function you want to test and make a separate file for it
- Identify the elements that a user interacts with during the test
- Attempt to access the elements in the priority order specified above
- Use the driver or WebElement specific method to either obtain the information or to send information (for example sending data in text field)
- Assert that the changes made are in-line with the expected behaviour