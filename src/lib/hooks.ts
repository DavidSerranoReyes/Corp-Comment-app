import { useContext, useEffect, useState } from 'react';
import { FeedbackItemsContext } from '../contexts/FeedbackItemsContentProvider';
import { TFeedbackItem } from './types';

export function useFeedbackitemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      'FeedbackItemsContext must be used within a FeedbackItemsContextProvider'
    );
  }
  return context;
}

export function useFeedbackitems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();

        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later.');
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);
  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
  };
}
