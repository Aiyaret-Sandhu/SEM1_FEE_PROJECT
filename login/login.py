from selenium import webdriver

driver = webdriver.Chrome()
container = driver.find_element_by_id('container')
registerBtn = driver.find_element_by_id('register')
loginBtn = driver.find_element_by_id('login')

registerBtn.click()
container.get_attribute('class').split().append('active')

loginBtn.click()
container.get_attribute('class').split().remove('active')

