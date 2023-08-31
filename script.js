import { englishMonths, englishWeekDays, alwaysTwoDigits } from "./utils.js";

// const calendar = document.querySelector(".calendar");
const today = new Date();
// let date = new Date();
const difIcons = {
  left: "fa-chevron-left",
  right: "fa-chevron-right",
};

function renderMonth(date) {
  // functions
  function handleClick(e) {
    const target = e.target.classList[1];
    if (target === difIcons.left) {
      date = new Date(date.getFullYear(), date.getMonth() - 1);
      calendar.innerHTML = "";
      renderMonth(date);
    } else {
      date = new Date(date.getFullYear(), date.getMonth() + 1);
      calendar.innerHTML = "";
      renderMonth(date);
    }
  }

  function createDay() {
    const day = document.createElement("div");
    day.classList.add("day");
    calendar.append(day);
  }

  // variables
  const dateWeekDay = date.getDay();
  const dateMonth = date.getMonth();
  const dateNumOfDay = date.getDate();
  const dateYear = date.getFullYear();
  const currentMonth = today.getMonth();
  const currrentYear = today.getFullYear();
  const body = document.querySelector("body");

  const calendarHeader = `
    <section>
    <div class="info">
      <h4><span id="monthDisplay"></span> <span id="yearDisplay"></span></h4>
      <div class="icon-container">
        <i class="fa-solid fa-chevron-left"></i>
        <i class="fa-solid fa-chevron-right"></i>
      </div>

      <p><span id="dayDisplay"></span> <span id="dateDisplay"></span>
    </div>
    <div class="calendarDays">
      <div class="dayName">Mon</div>
      <div class="dayName">Tue</div>
      <div class="dayName">Wed</div>
      <div class="dayName">Thu</div>
      <div class="dayName">Fri</div>
      <div class="dayName finde">Sat</div>
      <div class="dayName finde">Sun</div>
    </div>
    <div class="calendar"></div>
  </section>
  `;
  body.innerHTML = calendarHeader;
  const icons = document.querySelectorAll("i");

  // get elements
  const calendar = document.querySelector(".calendar");
  const monthDisplay = document.querySelector("#monthDisplay");
  const dayDisplay = document.querySelector("#dayDisplay");
  const dateDisplay = document.querySelector("#dateDisplay");
  const yearDisplay = document.querySelector("#yearDisplay");

  // set values
  monthDisplay.textContent = englishMonths[dateMonth];
  if (dateMonth === currentMonth && dateYear === currrentYear) {
    dayDisplay.textContent = englishWeekDays[dateWeekDay];
    // dateDisplay.textContent = alwaysTwoDigits(dateNumOfDay);
    dateDisplay.textContent = alwaysTwoDigits(new Date().getDate());
  } else {
    dayDisplay.textContent = "";
    dateDisplay.textContent = "";
  }

  yearDisplay.textContent = dateYear;

  // find position of first day of the month
  const firstDayOfMonth = new Date(`${dateYear}`, `${dateMonth}`, "1").getDay();

  // num of spaces until first day
  const prevDaysRef = [6, 0, 1, 2, 3, 4, 5];

  // create spaces until first day
  const amountOfPrev = prevDaysRef[firstDayOfMonth];
  for (let i = 0; i < amountOfPrev; i++) {
    createDay();
  }
  // find current month amount of days
  const monthNumOfDays = new Date(
    `${dateYear}`,
    `${dateMonth + 1}`,
    0
  ).getDate();

  // create days of the month
  for (let i = 1; i <= monthNumOfDays; i++) {
    // for (let i = 1; i <= 8; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.classList.add("active");
    day.textContent = i;
    calendar.append(day);
    if (
      i === today.getDate() &&
      today.getFullYear() === dateYear &&
      today.getMonth() === dateMonth
    ) {
      day.classList.add("current");
    }
  }

  // create extra spaces so calendar always have six rows
  if (amountOfPrev + monthNumOfDays < 41) {
    for (let i = amountOfPrev + monthNumOfDays; i <= 41; i++) {
      createDay();
    }
  }
  icons.forEach((i) => i.addEventListener("click", handleClick));
}

//init
renderMonth(new Date());
