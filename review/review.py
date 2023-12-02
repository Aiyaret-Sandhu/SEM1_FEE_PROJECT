from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        id = request.form['id']
        comment = request.form['comment']

        output = f'''
            <h2>Submitted Comment</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Comment:</strong> {comment}</p>
        '''

        review_box = f'''
            <div class="testimonial-box" id="display">
            <!--top------------------------->
            <div class="box-top">
                <!--profile----->
                <div class="profile">
                    <!--img---->
                    <div class="profile-img">
                        <img src="images/c-1.jpg" />
                    </div> 
                    <!--name-and-username-->
                    <div class="name-user">
                        <strong class="userName">{name}</strong>
                        <span class="userId">{id}</span>
                    </div>
                </div>
                <!--reviews------>
                <div class="reviews">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i><!--Empty star-->
                </div> 
            </div>
            <!--Comments---------------------------------------->
            <div class="client-comment">
                <p class="userReview">{comment}</p>
            </div>
        </div>
        '''

        return render_template('index.html', output=output, review_box=review_box)
    return render_template('index.html')

from selenium import webdriver

driver = webdriver.Chrome()
driver.get("your_website_url")

allStar = driver.find_elements_by_css_selector('.rating .star')
ratingValue = driver.find_element_by_css_selector('.rating input')

for idx, item in enumerate(allStar):
    item.click()
    click = 0
    ratingValue.send_keys(str(idx + 1))
    for i in range(len(allStar)):
        if i <= idx:
            driver.execute_script("arguments[0].classList.replace('bx-star', 'bxs-star')", allStar[i])
            driver.execute_script("arguments[0].classList.add('active')", allStar[i])
        else:
            driver.execute_script("arguments[0].style.setProperty('--i', arguments[1])", allStar[i], click)
            click += 1

getName = driver.find_elements_by_class_name("addName")
uname = getName[0].text
getId = driver.find_elements_by_class_name("addId")
id = getId[0].text
getReview = driver.find_elements_by_class_name("addReview")
review = getReview[0].text

def addReview():
    nameInput = driver.find_elements_by_class_name("userName")
    idInput = driver.find_elements_by_class_name("userId")
    reviewInput = driver.find_elements_by_class_name("userReview")
    nameInput[0].text = uname
    idInput[0].text = id
    reviewInput[0].text = review



if __name__ == '__main__':
    app.run(debug=True)

