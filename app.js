
//기술스택 화면 확장
const skills = document.querySelectorAll(".skills > figure");

skills.forEach((skill) => {
  skill.addEventListener("click", (e) => {
    const target = skill; // 클릭된 figure 요소

    const div = target.querySelector("div");
    if (div) {
      div.classList.toggle("hidden");
    }

    target.classList.toggle("expand");
  });
});


//빛나는 원
const btn = document.querySelector('#my-projects > a ');
const glowingcircle = document.querySelector('#my-projects > div')

btn.addEventListener("mouseover", () => {
  glowingcircle.classList.toggle("glowing-div");
})

btn.addEventListener("mouseout", () => {
  glowingcircle.classList.toggle("glowing-div");
})

//email 보내기
const form = document.querySelector(".contact-form");
const inputs = form.querySelectorAll("input, textarea");
const submitBtn = form.querySelector(".submit-btn");

let debounceTimer;

function updateMailto() {
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const website = form.querySelector('input[type="url"]').value;
  const message = form.querySelector('textarea').value;

  const body = `
Name: ${name}
Email: ${email}
Website: ${website}
Message: ${message}
  `;

  const encodedBody = encodeURIComponent(body);

  submitBtn.href = `mailto:khj32201270@dankook.ac.kr?body=${encodedBody}`;
}

function debounceUpdate() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateMailto, 500); // 1초 디바운스
}

// 각 input, textarea 입력 시 debounceUpdate 실행
inputs.forEach((input) => {
  input.addEventListener("input", debounceUpdate);
});

//좋아요 업데이트
$(document).ready(function() {

  const firebaseConfig = {
    apiKey: "*",
    authDomain: "ossmidterm.firebaseapp.com",
    databaseURL: "https://ossmidterm-default-rtdb.firebaseio.com",
    projectId: "ossmidterm",
    storageBucket: "*",
    messagingSenderId: "*",
    appId: "*"
  };

  firebase.initializeApp(firebaseConfig);

  const likesRef = firebase.database().ref('like');

  function getLikeCount() {
    likesRef.once('value', function(snapshot) {
      const count = snapshot.val();
      $("#update-num").text(count);
    });
  }

  function increaseCount() {
    likesRef.transaction(function(currentCount) {
      return (currentCount || 0) + 1;
    }, function(error, committed, snapshot) {
      if (error) {
        console.error("Transaction failed:", error);
      } else if (!committed) {
        console.log("Transaction aborted: Data could not be written to the database.");
      } else {
        console.log("Like count increased successfully.");
        getLikeCount();
      }
    });
  }

  getLikeCount();

  $(".contact-description").click(function() {
    increaseCount();
  });
});