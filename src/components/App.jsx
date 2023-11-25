import React, { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notifications';

const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const options = Object.keys(state);

  const onLeaveFeedback = option => {
    setState(prevState => ({ ...prevState, [option]: prevState[option] + 1 }));
  };

  const countTotalFeedback = () => Object.values(state).reduce((acc, value) => acc + value, 0);

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((state.good / total) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div>
      <Section title="Leave Feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
};

export default App;
