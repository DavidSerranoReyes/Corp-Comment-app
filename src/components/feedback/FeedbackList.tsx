import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import Errormessage from '../Errormessage';
import { useFeedbackItemsStore } from '../../stores/feedbackitemsStore';

export default function FeedbackList() {
  // const { isLoading, errorMessage, filteredFeedbackItems } =
  //   useFeedbackitemsContext();

  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const filteredFeedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  );

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <Errormessage message={errorMessage} />}
      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
