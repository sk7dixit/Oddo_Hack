import React from 'react';
import { SharedJourneyHero } from '@/components/shared-journey/SharedJourneyHero';
import { TravelCrew } from '@/components/shared-journey/TravelCrew';
import { CollaborativePlanner } from '@/components/shared-journey/CollaborativePlanner';
import { ActivityFeed } from '@/components/shared-journey/ActivityFeed';
import { VotingPanel, SharedExpenses } from '@/components/shared-journey/VotingPanel';
import { GroupChatPreview } from '@/components/shared-journey/GroupChatPreview';
import { sharedJourneyData } from '@/data/sharedJourneyData';

const SharedJourney = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      {/* 1. Hero */}
      <SharedJourneyHero />

      {/* 2. Crew Section */}
      <TravelCrew crew={sharedJourneyData.crew} />

      {/* 3. Main Collaboration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Planner & Feed */}
        <div className="lg:col-span-8 space-y-16">
          <CollaborativePlanner tasks={sharedJourneyData.tasks} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VotingPanel votes={sharedJourneyData.votes} />
            <SharedExpenses expenses={sharedJourneyData.expenses} />
          </div>
        </div>

        {/* Right: Social Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          <ActivityFeed feed={sharedJourneyData.activityFeed} />
          <GroupChatPreview messages={sharedJourneyData.messages} />
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-cyan-400/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default SharedJourney;
