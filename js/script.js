"use strict";
function navFunc() {
  document.querySelector("html").classList.toggle("open");
}

const numSteps = 20.0;
let targetElement;
let prevRatio = 0.0;
// Set things up
window.addEventListener(
  "load",
  (event) => {
    targetElement = document.querySelectorAll(".target");
    createObserver();
  },
  false
);
function createObserver() {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList(),
  };
  observer = new IntersectionObserver(handleIntersect, options);
  //対象となる要素が複数かどうかを判定
  for (let i = 0; i < targetElement.length; i++) {
    observer.observe(targetElement[i]);
  }
}
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.classList.add("move");
      // 以降、このターゲットの監視を停止
      observer.unobserve(entry.target);
    }
    prevRatio = entry.intersectionRatio;
  });
}
