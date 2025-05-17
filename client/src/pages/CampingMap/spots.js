const top = 7;
const bottom = 78;

const generateSpots = (startLeft) => {
  const spots = [];
  let left = startLeft;
  const deltas = [6, 9];
  let deltaIndex = 0;

  for (let i = 1; i <= 10; i++) {
    spots.push({
      id: `D${i}`,
      top: top,
      left: left,
      status: "Liber",
    });

    left -= deltas[deltaIndex];
    deltaIndex = (deltaIndex + 1) % deltas.length;
  }

  left = startLeft;
  for (let i = 1; i <= 10; i++) {
    spots.push({
      id: `S${i}`,
      top: bottom,
      left: left,
      status: "Liber",
    });

    left -= deltas[deltaIndex];
    deltaIndex = (deltaIndex + 1) % deltas.length;
  }

  return spots;
};

const spots = generateSpots(73.5);

export default spots;
