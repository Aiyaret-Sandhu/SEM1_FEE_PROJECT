const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})

const getName = document.getElementsByClassName("addName");
const uname = getName.value;
const getId = document.getElementsByClassName("addId");
const id = getId.value;
const getReview = document.getElementsByClassName("addReview");
const review = getReview.value;

function addReview() {
	let nameInput = document.getElementsByClassName("userName");
	let idInput = document.getElementsByClassName("userId");
	let reviewInput = document.getElementsByClassName("userReview");
	nameInput.innerHTML = uname;
	idInput.innerHTML = id;
	reviewInput.innerHTML = review;
}