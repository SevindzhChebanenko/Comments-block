const declOfNum = (number, words) =>
  words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
const getCountYear = (num, time) =>
  `${num} ${declOfNum(num, ["год", "года", "лет"])} назад, ${time.hours}:${
    time.minutes
  }`;
const getCountMonth = (num, time) =>
  `${num} ${declOfNum(num, ["месяц", "месяца", "месцев"])} назад, ${
    time.hours
  }:${time.minutes}`;
const getCountDays = (num, time) =>
  `${num} ${declOfNum(num, ["день", "дня", "дней"])} назад, ${time.hours}:${
    time.minutes
  }`;

const dateWhenCreateCommet = (dateCreatedComent) => {
  const ms = new Date() - new Date(dateCreatedComent),
    days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 30),
    months = Math.floor((ms / (1000 * 60 * 60 * 24 * 30)) % 12),
    years = Math.floor(ms / (1000 * 60 * 60 * 24 * 30 * 12));
  const time = {
    hours: dateCreatedComent.getHours(),
    minutes: dateCreatedComent.getMinutes(),
  };
  if (days == 0) {
    return `сегодня, ${time.hours}:${time.minutes}`;
  } else if (isNaN(days)) {
    return new Date().toLocaleString();
  } else if (days == 1) {
    return `вчера, ${time.hours}:${time.minutes}`;
  } else if (days <= 31 && months === 0) {
    return getCountDays(days, time);
  } else if (months <= 12 && years === 0) {
    return getCountMonth(months, time);
  } else if (years >= 1) {
    return getCountYear(years, time);
  }
};

const form = document
  .getElementById("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let currentDate = new Date().toLocaleString();

    document.createElement("div");
    div = `
    <div id="commentsForm" class="comments__form">
        <div>${document.getElementById("comment").value}</div>
        <div>${document.getElementById("author").value} </div>
        <div>${dateWhenCreateCommet(
          new Date(document.getElementById("localdate").value)
        )} </div>
        <button id="btn" class="btn"><i class="fa-solid fa-heart"></i></button>
    </div>`;

    asd.insertAdjacentHTML("afterend", div);

    const btn = document.getElementById("btn");

    function toggle() {
      if (btn.style.color == "red") {
        btn.style.color = "grey";
      } else {
        btn.style.color = "red";
      }
    }
    btn.onclick = toggle;

    const divDeletes = document.querySelectorAll(".comments__form");
    for (let divDelete of divDeletes) {
      divDelete.insertAdjacentHTML(
        "afterbegin",
        '<button id="btn2" class="btn2"><i class="fa-solid fa-trash"></i></button>'
      );
      divDelete.firstChild.onclick = () => divDelete.remove();
    }

    e.target.reset();
  });
