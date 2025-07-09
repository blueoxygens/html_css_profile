
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
