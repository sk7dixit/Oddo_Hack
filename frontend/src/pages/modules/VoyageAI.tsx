import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIInputPanel } from '@/components/voyage-ai/AIInputPanel';
import { AISuggestionGrid } from '@/components/voyage-ai/AISuggestionGrid';
import { AILoadingStep } from '@/components/voyage-ai/AILoadingStep';
import { AIResponsePanel } from '@/components/voyage-ai/AIResponsePanel';
import { AITravelerProfile } from '@/components/voyage-ai/AITravelerProfile';
import { ItineraryTimeline } from '@/components/voyage-ai/ItineraryTimeline';
import { VoyageCinematicHero } from '@/components/voyage-ai/VoyageCinematicHero';
import { TravelMoodboard } from '@/components/voyage-ai/TravelMoodboard';
import { GroupWorkspace } from '@/components/voyage-ai/GroupWorkspace';
import { LiveIntelligencePanel, AgentInsights } from '@/components/voyage-ai/AgentSystems';
import { travelKnowledge } from '@/data/ai/knowledge';
import { emotionKeywords, personalityKeywords, personalizedKnowledge } from '@/data/ai/personalization';
import { moderationRules, itineraryTemplates } from '@/data/ai/engine';
import { destinationAtmospheres } from '@/data/ai/visuals';
import { ShieldCheck, RefreshCw, History, Sparkles, Users, Zap } from 'lucide-react';

const VoyageAI = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [itinerary, setItinerary] = useState<any[] | null>(null);
  const [isModerated, setIsModerated] = useState(false);
  const [moderationMessage, setModerationMessage] = useState("");
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [isGroupMode, setIsGroupMode] = useState(false);
  
  const [scores, setScores] = useState<Record<string, number>>({
    adventure: 20, luxury: 20, backpacker: 20, romantic: 20, cultural: 20
  });

  useEffect(() => {
    const savedScores = localStorage.getItem('voyage_scores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
      setIsReturningUser(true);
    }
  }, []);

  const saveToMemory = (newScores: Record<string, number>, country: string) => {
    localStorage.setItem('voyage_scores', JSON.stringify(newScores));
    localStorage.setItem('voyage_last_country', country);
  };

  const processAIRequest = (query: string) => {
    setHasStarted(true);
    setIsThinking(true);
    setResponse(null);
    setItinerary(null);
    setIsModerated(false);
    setActiveCountry(null);

    const queryLower = query.toLowerCase();
    if (queryLower.includes("group") || queryLower.includes("we") || queryLower.includes("friends")) {
      setIsGroupMode(true);
    }

    for (const [type, rule] of Object.entries(moderationRules)) {
      if (rule.keywords.some(w => queryLower.includes(w))) {
        setTimeout(() => {
          setIsThinking(false);
          setIsModerated(true);
          setModerationMessage(rule.response);
        }, 1500);
        return;
      }
    }

    let country = "Japan";
    if (queryLower.includes("italy")) country = "Italy";
    if (queryLower.includes("bali")) country = "Bali";

    const newScores = { ...scores };
    Object.entries(personalityKeywords).forEach(([key, words]) => {
      if (words.some(w => queryLower.includes(w))) {
        newScores[key] = Math.min(newScores[key] + 15, 100);
      }
    });
    setScores(newScores);
    saveToMemory(newScores, country);

    const baseData = travelKnowledge[country];
    const atmosphere = destinationAtmospheres[country];
    const topPersonality = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const personalizedData = personalizedKnowledge[country]?.[topPersonality] || personalizedKnowledge[country]?.default;

    const narrativeOpening = atmosphere.description;
    const moodGreeting = `Thinking about ${country}? It's a journey that ${atmosphere.moods[0].toLowerCase()} and ${atmosphere.moods[1].toLowerCase()}.`;

    setTimeout(() => {
      setIsThinking(false);
      setActiveCountry(country);
      setResponse({
        overview: `${moodGreeting} ${narrativeOpening}`,
        highlights: baseData.topCities,
        budget: baseData.avgBudget,
        bestTime: baseData.bestSeason,
        experiences: baseData.experiences,
        personalityMatch: topPersonality.charAt(0).toUpperCase() + topPersonality.slice(1),
        matchReason: `Matches your travel style. I've prioritized ${personalizedData.highlight.toLowerCase()} for this journey.`,
        personalizedPlan: {
          Stay: personalizedData.stay,
          Transit: personalizedData.transit,
          Food: personalizedData.food
        },
        suggestions: [
          `Optimal travel window: ${baseData.bestSeason.split('(')[0]}.`,
          `Pace optimization: High-speed transit between ${baseData.topCities[0]} and ${baseData.topCities[1]}.`
        ],
        atmosphere
      });

      if (itineraryTemplates[country]) {
        setItinerary(itineraryTemplates[country][5]);
      }
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden pt-12 selection:bg-cyan-500/30">
      <div className="max-w-[980px] mx-auto px-6 space-y-12 pb-40">
        
        {/* 1. HERO HEADER - Controlled Proportion */}
        {!activeCountry && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Zap className="h-3 w-3 text-cyan-400" />
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Autonomous Intelligence</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Users className="h-3 w-3 text-purple-400" />
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Collaborative Mode</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="title-hero text-white">
                The New Era of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic">Voyage Intelligence</span>
              </h1>
              <p className="body-premium max-w-2xl mx-auto leading-relaxed">
                A world-class travel operating system. Collaborative planning, real-time conditions, and autonomous agentic guidance.
              </p>
            </div>
          </motion.div>
        )}

        {/* 2. DYNAMIC HERO (PHASE 8) */}
        {activeCountry && response && (
          <div className="space-y-12 pt-6">
            <VoyageCinematicHero 
              country={activeCountry} 
              title={response.atmosphere.title} 
              image={response.atmosphere.visuals[0]} 
            />
            <LiveIntelligencePanel country={activeCountry} />
            {isGroupMode && <GroupWorkspace />}
          </div>
        )}

        {/* 3. INPUT PANEL - Integrated Stack */}
        <div className="relative z-50 -mt-8">
          <AIInputPanel onPrompt={processAIRequest} />
        </div>

        {/* 4. DYNAMIC CONTENT AREA */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {!hasStarted ? (
              <motion.div key="suggestions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-4">
                <AISuggestionGrid onSelect={processAIRequest} />
              </motion.div>
            ) : isThinking ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AILoadingStep />
              </motion.div>
            ) : isModerated ? (
              <motion.div 
                key="moderation" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                className="p-16 rounded-[32px] bg-red-500/5 border border-red-500/10 text-center space-y-6"
              >
                <ShieldCheck className="h-12 w-12 text-red-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Refined Redirection</h3>
                <p className="text-slate-400 leading-relaxed">{moderationMessage}</p>
                <button onClick={() => setHasStarted(false)} className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest">
                  <RefreshCw className="h-4 w-4" /> Reset Environment
                </button>
              </motion.div>
            ) : (
              <motion.div key="response" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-32">
                <AgentInsights />
                <AITravelerProfile scores={scores} />
                <div className="grid grid-cols-1 gap-20">
                  <AIResponsePanel data={response} isStreaming={false} />
                  <TravelMoodboard images={response.atmosphere.visuals} country={activeCountry!} />
                </div>
                {itinerary && (
                  <div className="mt-20">
                    <div className="flex items-center gap-3 mb-12">
                      <Sparkles className="h-5 w-5 text-cyan-400" />
                      <h2 className="title-section italic">Autonomous Journey</h2>
                    </div>
                    <ItineraryTimeline itinerary={itinerary} />
                  </div>
                )}

                {/* Premium Closure Summary */}
                <div className="p-16 rounded-[48px] bg-white/5 border border-white/5 text-center space-y-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">The Horizon Awaits</h3>
                    <p className="text-slate-400 text-lg font-medium italic opacity-80 max-w-xl mx-auto">
                      "Travel is the discovery of something more than just a destination."
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                      <button className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl">
                        Confirm Journey
                      </button>
                      <button className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                        Share Strategy
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient background lighting system */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[10%] left-[-20%] w-[80%] h-[80%] bg-cyan-900/5 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/5 blur-[150px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default VoyageAI;
