const STORY_IDS = [
  "phone",
  "skate",
  "account",
  "concert",
  "trip",
  "scooter",
];

export function resetGame() {
  localStorage.removeItem("userName");
  localStorage.removeItem("isAgreed");

  STORY_IDS.forEach((id) => {
    localStorage.removeItem(`story_${id}_choice`);
    localStorage.removeItem(`story_${id}_completed`);
    localStorage.removeItem(`story_${id}_success`);
  });
}