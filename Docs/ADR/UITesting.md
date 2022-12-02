# UI Testing

# Use Selenium as UI Testing

## Context and Problem Statement

As a developer, we need to find a test tool to simulate automate form submission, UI testing, and keyboard input. In addition, we need to use the test tool to create an automated testing environment using the latest JavaScript and browser features. However, the frontend testing is different from the backend testing. Therefore, we should find a different test tool rather than using the backend test framework.

The main problems that we want addressed are : 
 - Provide extensions to emulate user interaction with browsers, a distribution server for scaling browser allocation, and the infrastructure for implementations of the W3C WebDriver specification that lets us write interchangeable code for all major web browsers.

## Considered Options

* Selenium
* Puppeteer

## Decision Outcome

Chosen option: <b>"Selenium"</b>

### Consequences

* Good, a collection of open-source tools that support browser application testing.The community has over 632 contributors and over 140,000 users.
* Good, Selenium is a solution dedicated to testing applications that run in multiple browsers (Chrome, Firefox, Safari, etc.) on different operating systems (Windows, Linux, and Mac OS)
* Good, the parallel execution of test suites reduces the elapsed time required to complete application testing.
* Bad, Selenese is the language used to define Selenium test scripts. It is a high level language that developers need to learn to write and execute Selenium tests.
In conclusion, Selenium is a better choice becasue developers must test their apps for multiple browsers. Fortunately, our teammate, Mohammad Anas Mudassir, familiarizes it, so we do not have the issue.
## More Information
[Puppeteer vs Selenium: Main Differences](https://brightdata.com/blog/proxy-101/puppeteer-vs-selenium?kw=&cpn=14745430544&cam=aw_all_products-all_geos-search_dsa_blog-kw_en-desktop_blog-proxy-101__612826834975&utm_term=&utm_campaign=all_products-all_geos-search_dsa_blog-kw_en-desktop&utm_source=adwords&utm_medium=ppc&utm_content=blog-proxy-101&hsa_acc=1393175403&hsa_cam=14745430544&hsa_grp=136943772153&hsa_ad=612826834975&hsa_src=g&hsa_tgt=dsa-1649388331144&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&cq_src=google_ads&cq_cmp=14745430544&cq_term=&cq_plac=&cq_net=g&cq_plt=gp&gclid=Cj0KCQiAvqGcBhCJARIsAFQ5ke4W0mLy0juROjoYit50lwoJsSXuefuSx-rmO3g4FI0TsBF5s6Zu0_AaAgzYEALw_wcB)

[Selenium Tutorial]([https://jestjs.io/docs/getting-started](https://www.selenium.dev/documentation/))
