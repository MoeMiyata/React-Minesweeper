type playTimeForDisplayProps = {
  playTime: number;
};

// 画面に表示する時間用の関数
export const playTimeForDisplay = (props: playTimeForDisplayProps) => {
  const { playTime } = props;

  let timeHours = 0;
  let timeMinutes = 0;
  let timeSeconds = 0;

  timeSeconds = playTime % 60;
  timeMinutes = Math.floor(playTime / 60) % 60;
  timeHours = Math.floor(Math.floor(playTime / 60) / 60);

  const timeHoursDisplay =
    timeHours < 100 ? ("00" + timeHours).slice(-2) : timeHours;
  const timeMinutesDisplay = ("00" + timeMinutes).slice(-2);
  const timeSecondsDisplay = ("00" + timeSeconds).slice(-2);

  return { timeHoursDisplay, timeMinutesDisplay, timeSecondsDisplay };
};
