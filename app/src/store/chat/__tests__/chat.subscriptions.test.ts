// @ts-nocheck
import { fakeSubscriptionChatMessage } from '../../../../test/fixtures/chat/subscriptionMessages/subscriptionChatMessage';
import MockStomp from '../../../../test/utils/MockStomp';
import { chatSubscription } from '../chat.subscriptions';
import { fakeChatId } from '../../../../test/fixtures/chat/chatId';
import { RootAction } from '../../rootAction';

const mockDispatchedActions = [];

jest.mock('./../../../App', () => ({
  store: {
    dispatch: (action: RootAction) => mockDispatchedActions.push(action),
  },
}));

beforeEach(() => {
  mockDispatchedActions.length = 0;
});

describe('chatSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const subscriptionMessages = [fakeSubscriptionChatMessage];

    const mockStomp = new MockStomp(subscriptionMessages);
    chatSubscription(mockStomp, fakeChatId);

    expect(mockDispatchedActions.length).toBe(1);
  });
});
