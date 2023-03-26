import {
  TopicContent,
  ChannelTopicsList,
  TopicHeader,
  ChannelList,
  FooterInput,
} from "@/components-features";
import { useGlobalStore } from "@/store";

export const ChatContainer = () => {
  const { activeChannel, activeTopic } = useGlobalStore((state) => ({
    activeTopic: state.activeTopic,
    activeChannel: state.activeChannel,
  }));
  return (
    <div className="relative">
      <aside className="fixed left-0 top-0 bottom-0 flex overflow-hidden">
        <ChannelList />
        {activeChannel ? <ChannelTopicsList /> : null}
      </aside>
      {activeTopic !== undefined ? (
        <div className="flex flex-1 flex-col overflow-hidden ml-80 h-screen">
          <TopicHeader />
          <TopicContent />
          <FooterInput />
        </div>
      ) : null}
    </div>
  );
};
