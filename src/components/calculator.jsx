
export function getInvestmentSteps(steps, odds, bankroll) {
  //Method B: Maintains a steady profit based on the first realized profit
  bankroll = !bankroll || bankroll == 0 ? 100 : parseFloat(bankroll.replace(/,/g, ''));
  let all = [];

  for (let i = 1; i <= steps; i++) all.push(1);

  for (let i = 0; i < steps; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += all[j] / (odds - 1);
    }
    all[i] = (i + 1) + sum; //We can add a multiple here
  }

  const total = all.reduce((a, b) => a + b, 0);

  for (let i in all) all[i] = (all[i] / total) * bankroll;

  // const profit = ((all[all.length-1])*odds - all.reduce((a,b)=>a+b,0))/all.length;
  // console.log(all, all.reduce((a,b)=> a+b, 0),`profit per step: $${profit}`);
  let prevStakeAmounts = 0;
  const stakes = all.map((value, i) => {
    prevStakeAmounts += value;
    return ({ stake: value, sn: i, inv: prevStakeAmounts })
  });
  return stakes;

}
