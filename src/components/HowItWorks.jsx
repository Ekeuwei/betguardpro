
const HowItWorks = () => {
  return (
    <div className="howItWorks">
        <h2>How it Works</h2>
        <div className="card">
            <h3>Input Your Details:</h3>
            <ul>
                <li>Enter the odds: Specify the odds for your bet.</li>
                <li>Number of Steps: Decide how many steps you want in your staking strategy.</li>
                <li>Bankroll: Set the total amount of money you have for betting.</li>
            </ul>
        </div>

        <div className="card">
            <h3>Calculate Stakes:</h3>
            <ul>
                <li>Click the "Calculate" button to generate a stepwise staking plan.</li>
                <li>BetGuard Pro uses a proven progressive staking strategy to determine your stake for each bet.</li>
            </ul>
        </div>

        <div className="card">
            <h3>Stepwise Approach:</h3>
            <ul>
                <li>For each step, the calculator calculates the recommended stake based on the odds and your bankroll.</li>
                <li>The stake increases progressively with each step, optimizing the recovery of lost amounts when a win occurs.</li>
                <li>The first stake amount is maintained until a bet is lost before progressing to the next stake amount.</li>
            </ul>
        </div>

        <div className="card won">
            <h3>Winning Bet:</h3>
            <ul>
                <li>When a bet is won, the stakes are recalculated, and you reset to the first stake amount.</li>
            </ul>
        </div>

        <div className="card lost">
            <h3>Lost Bet:</h3>
            <ul>
                <li>If a bet is lost, the next stake amount in the progression is used for the next bet.</li>
            </ul>
        </div>

        <div className="card gold">
            <h3>Bankroll Management:</h3>
            <ul>
                <li>The strategy ensures effective bankroll management by adjusting stakes according to the betting progress.</li>
            </ul>
        </div>

        <div className="card">
            <h3>Example:</h3>
            <ul>
                <li>Let's say you start with a $100 bankroll, set the odds at 2.00, and choose 5 steps.</li>
                <li>The calculator will generate a plan for your first five bets, with increasing stakes for each step.</li>
                <li>If you lose a bet at Step 1, the stake amount for Step 2 is used for the next bet.</li>
                <li>If you win at Step 2, the stakes are recalculated, and you reset to the first stake amount.</li>
                <li>The strategy helps recover the loss when a win occurs due to the progressive increase in stakes.</li>
            </ul>
        </div>

        <div className="card">
            <h3>Key Benefits:</h3>
            <ul>
                <li><strong>Risk Mitigation:</strong> Minimize the impact of losses on your bankroll.</li>
                <li><strong>Optimized Recovery:</strong> Increase stake gradually to recover losses efficiently.</li>
                <li><strong>Consistent Approach:</strong> BetGuard Pro ensures a systematic and calculated betting approach.</li>
            </ul>
        </div>
    </div>
  )
}

export default HowItWorks