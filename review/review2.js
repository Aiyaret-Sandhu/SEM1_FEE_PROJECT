document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let id = document.getElementById('id').value;
    let comment = document.getElementById('comment').value;

    let output = `
        <h2>Submitted Comment</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Comment:</strong> ${comment}</p>
    `;

    let reviewBox = `
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
                    <strong class="userName">${name}</strong>
                    <span class="userId">${id}</span>
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
            <p class="userReview">${comment}</p>
        </div>
    </div>
    `;

    document.getElementById('display').innerHTML = output;
    document.getElementById('review').innerHTML = reviewBox;
});