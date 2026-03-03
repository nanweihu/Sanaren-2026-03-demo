const dashboardPage = document.getElementById("dashboardPage");
const playerPage = document.getElementById("playerPage");
const feedbackPage = document.getElementById("feedbackPage");
const loadingOverlay = document.getElementById("loadingOverlay");

const playButtons = document.querySelectorAll(".play-btn");
const actionName = document.getElementById("actionName");
const rehabVideo = document.getElementById("rehabVideo");
const muteToggleBtn = document.getElementById("muteToggleBtn");
const doneBtn = document.getElementById("doneBtn");
const returnBtn = document.getElementById("returnBtn");

const taskMap = {
  neck: "Neck Stretch (1/3)",
  shoulder: "Shoulder Rotation (1/3)",
  leg: "Leg Raise (1/3)"
};

const videoMap = {
  neck: "neck.mp4",
  shoulder: "shoulder.mp4",
  leg: "leg.mp4"
};

const posterMap = {
  neck: "https://images.pexels.com/photos/4587690/pexels-photo-4587690.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1280&h=560",
  shoulder: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=1280&h=560&q=80",
  leg: "https://images.pexels.com/photos/6303435/pexels-photo-6303435.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1280&h=560"
};

function showPage(page) {
  [dashboardPage, playerPage, feedbackPage].forEach((el) => el.classList.remove("is-active"));
  page.classList.add("is-active");
}

function showLoading(show) {
  loadingOverlay.classList.toggle("is-active", show);
  loadingOverlay.setAttribute("aria-hidden", String(!show));
}

playButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const taskCard = event.currentTarget.closest(".task-card");
    const taskKey = taskCard?.dataset.task || "neck";
    const taskCover = taskCard?.querySelector(".cover img")?.getAttribute("src");
    actionName.textContent = taskMap[taskKey] || taskMap.neck;
    rehabVideo.src = videoMap[taskKey] || videoMap.neck;
    rehabVideo.poster = taskCover || posterMap[taskKey] || posterMap.neck;
    rehabVideo.load();

    showLoading(true);
    window.setTimeout(() => {
      showLoading(false);
      showPage(playerPage);
      rehabVideo.currentTime = 0;
      rehabVideo.muted = true;
      muteToggleBtn.textContent = "Unmute";
      rehabVideo.play().catch(() => {
        // Autoplay may be blocked by browser policies.
      });
    }, 500);
  });
});

muteToggleBtn.addEventListener("click", () => {
  rehabVideo.muted = !rehabVideo.muted;
  muteToggleBtn.textContent = rehabVideo.muted ? "Unmute" : "Mute";
});

doneBtn.addEventListener("click", () => {
  rehabVideo.pause();
  showPage(feedbackPage);
});

returnBtn.addEventListener("click", () => {
  showPage(dashboardPage);
});
