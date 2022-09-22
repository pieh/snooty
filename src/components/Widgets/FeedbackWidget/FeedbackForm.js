import React from 'react';
import Loadable from '@loadable/component';
import useScreenSize from '../../../hooks/useScreenSize';
import { useFeedbackContext } from './context';
import FeedbackFullScreen from './FeedbackFullScreen';
import FeedbackCard from './FeedbackCard';
import FeedbackModal from './FeedbackModal';
import SentimentView from './views/SentimentView';
import SubmittedView from './views/SubmittedView';
const CommentView = Loadable(() => import('../FeedbackWidget/views/CommentView'));

export const FeedbackContent = ({ view }) => {
  const View = {
    sentiment: SentimentView,
    comment: CommentView,
    submitted: SubmittedView,
  }[view];
  return <View className={`view-${view}`} />;
};

const FeedbackForm = () => {
  const { isMobile, isTabletOrMobile } = useScreenSize();
  const { view } = useFeedbackContext();
  const isOpen = view !== 'waiting';

  const displayAs = isMobile ? 'fullscreen' : isTabletOrMobile ? 'modal' : 'floating';
  const Container = {
    // If big screen, render a floating card
    floating: FeedbackCard,
    // If small screen, render a card in a modal
    modal: FeedbackModal,
    // If mini screen, render a full screen app
    fullscreen: FeedbackFullScreen,
  }[displayAs];

  return (
    isOpen && (
      <div className={fwFormId} hidden={!isOpen}>
        <Container isOpen={isOpen}>
          <FeedbackContent view={view} />
        </Container>
      </div>
    )
  );
}

export const feedbackId = 'feedback-card';
export const fwFormId = 'feedback-form';

export default FeedbackForm;