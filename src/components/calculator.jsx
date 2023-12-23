
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


const betproCalc = (odds, steps, bankroll, profit)=>{
   const stakes = [ ]
   const p = profit || 1; // profit is the expected profit that must be ensured per stake
   
   for(let i=1; i<=steps; i++){
      const sum = stakes.reduce((accumulator, currentValue)=>accumulator + currentValue, 0)
      const nextStake = (i*p+sum)/(odds-1)
      stakes.push(nextStake)
   }

   let newStakes = [ ]
   if(!profit){
      const sum = stakes.reduce((accumulator, currentValue)=> accumulator + currentValue, 0)
      newStakes= stakes.map(stake => stake/sum * bankroll)
   }else{
      newStakes = stakes
   }
   
   return newStakes;
}

export const estimate = (odds, steps, bankroll, target)=>{

  // eslint-disable-next-line no-unused-vars
  bankroll = parseFloat(bankroll.toString().replace(/,/g, ''));
  target = {
    steps: parseInt(target.steps),
    profit: parseFloat(target.profit.toString().replace(/,/g, ''))
  }

  let newBankroll = bankroll;
  
  //  console.log('first',bankroll, 'odds', odds, 'steps', steps);
  //  let targetBankroll = bankroll + (bankroll*.01* targetProfit)
   let targetBankroll = bankroll + target.profit;
   
   let timesToDouble = 0;
   while (target.steps === 0? newBankroll < targetBankroll:timesToDouble < target.steps){
       const timeToAdd = Math.floor(Math.random() * parseInt(steps/2)) + 1;
       const stakes = betproCalc(odds, steps, newBankroll);
       const minProfit = stakes[0]*odds-stakes[0];
      
      newBankroll += minProfit*timeToAdd;
      timesToDouble += timeToAdd;
      
   }
   
   const formatNumber = value => new Intl.NumberFormat('en-US').format(value.toFixed(2))//Number(value).toLocaleString("en-US");
   
   const result =  {
     steps: target.steps == 0?timesToDouble:target.steps,
     profit: target.profit == 0?formatNumber(newBankroll-bankroll):formatNumber(target.profit)
  }
  
  // console.log('Steps: ',timesToDouble, 'profit: ',newBankroll)
  //  return {targetProfit, timesToDouble}
  // console.log(result);
  return result;
}