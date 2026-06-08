export type SectionId =
  | 'heading'
  | 'introduction'
  | 'paragraph1'
  | 'paragraph2'
  | 'paragraph3'
  | 'conclusion'

export type HighlightType =
  | 'title'
  | 'topic-sentence'
  | 'definition'
  | 'technical'
  | 'connective'
  | 'fact'
  | 'comparison'
  | 'example'
  | 'summary'

export interface HighlightSegment {
  text: string
  highlight?: HighlightType
  popup?: {
    title: string
    body: string
  }
}

export interface SectionData {
  id: SectionId
  label: string
  structureLabel: string
  color: string
  colorLight: string
  icon: string
  exemplar: HighlightSegment[]
  guidance: {
    purpose: string
    whatToInclude: string[]
    writingTips: string[]
    sentenceStarters: string[]
    checklist: string[]
  }
  placeholder: string
  minWords: number
  maxWords: number
}

export const HIGHLIGHT_LABELS: Record<HighlightType, string> = {
  title: 'Title',
  'topic-sentence': 'Topic Sentence',
  definition: 'Definition',
  technical: 'Technical Language',
  connective: 'Connective',
  fact: 'Fact / Detail',
  comparison: 'Comparison',
  example: 'Australian Example',
  summary: 'Summary Statement',
}

export const SECTIONS: SectionData[] = [
  {
    id: 'heading',
    label: 'Title',
    structureLabel: 'Title',
    color: '#7C3AED',
    colorLight: '#EDE9FE',
    icon: '◆',
    exemplar: [
      {
        text: 'Kryptonite',
        highlight: 'title',
        popup: {
          title: 'Clear, Specific Title',
          body: 'Your title tells the reader exactly what the report is about. Use the name of your renewable resource — no full sentences needed.',
        },
      },
    ],
    guidance: {
      purpose:
        'The title is the first thing your reader sees. It should name your renewable resource clearly and match the topic you will explain.',
      whatToInclude: [
        'The name of your renewable resource',
        'Correct capital letters for important words',
        'No full stop at the end',
      ],
      writingTips: [
        'Keep it short — usually 2–5 words',
        'Avoid questions in the title',
        'Make sure it matches what you write about in every paragraph',
      ],
      sentenceStarters: [],
      checklist: [
        'Names my renewable resource',
        'Uses capital letters correctly',
        'Is short and clear',
      ],
    },
    placeholder: 'e.g. Tidal Energy',
    minWords: 2,
    maxWords: 6,
  },
  {
    id: 'introduction',
    label: 'Introduction',
    structureLabel: 'What is it?',
    color: '#2563EB',
    colorLight: '#DBEAFE',
    icon: '◎',
    exemplar: [
      {
        text: 'Kryptonite is a rare green mineral that stores powerful radiation from distant stars. ',
        highlight: 'definition',
        popup: {
          title: 'Definition',
          body: 'Start by telling the reader what your topic IS. Use a formal definition that answers "What is it?"',
        },
      },
      {
        text: 'Unlike coal or oil, it does not need to be burned to release energy, ',
        highlight: 'comparison',
        popup: {
          title: 'Comparison',
          body: 'Compare your resource to something familiar. Words like "unlike", "compared to", or "whereas" help readers understand why it matters.',
        },
      },
      {
        text: 'and scientists believe new deposits form slowly over millions of years. ',
        highlight: 'technical',
        popup: {
          title: 'Technical Detail',
          body: 'Add one precise detail that shows you understand the science. Use subject-specific words that suit your topic.',
        },
      },
      {
        text: 'Researchers describe it as one of the most unusual energy sources ever discovered.',
        highlight: 'fact',
        popup: {
          title: 'Big-Picture Fact',
          body: 'End your introduction with a strong fact that shows why this resource is worth learning about. This hooks your reader before the body paragraphs.',
        },
      },
    ],
    guidance: {
      purpose:
        'Your introduction answers the question "What is it?" You define your renewable resource and give the reader enough background to understand the rest of your report.',
      whatToInclude: [
        'A clear definition of your renewable resource',
        'Where it comes from or what it is made from',
        'One or two important facts',
        'Formal, factual language',
      ],
      writingTips: [
        'Open with what it IS, not how you feel about it',
        'Use present tense ("is", "comes from", "provides")',
        'Keep it to 3–5 sentences — save details for later paragraphs',
        'Do not start with "Hi" or "Today I am going to tell you about…"',
      ],
      sentenceStarters: [
        '________ is a renewable source of energy that…',
        '________ is created when…',
        'Unlike fossil fuels, ________…',
        'Scientists believe that ________…',
      ],
      checklist: [
        'Defines what the resource is',
        'Uses formal language',
        'Includes at least one fact',
        'Is 3–5 sentences long',
      ],
    },
    placeholder:
      'Define your renewable resource. What is it? Where does it come from? Why is it important?',
    minWords: 40,
    maxWords: 75,
  },
  {
    id: 'paragraph1',
    label: 'Paragraph 1',
    structureLabel: 'How it works',
    color: '#059669',
    colorLight: '#D1FAE5',
    icon: '⚙',
    exemplar: [
      {
        text: 'Kryptonite works by releasing stored radiation when it is placed inside a sealed containment chamber. ',
        highlight: 'topic-sentence',
        popup: {
          title: 'Topic Sentence',
          body: 'The first sentence tells the reader what this paragraph is about — in this case, HOW kryptonite works. Every other sentence should support this idea.',
        },
      },
      {
        text: 'First, the mineral is crushed into fine fragments. ',
        highlight: 'technical',
        popup: {
          title: 'Process Step',
          body: 'Explain the steps in order. Use sequence words like "first", "then", "next", and "finally" to guide your reader through the process.',
        },
      },
      {
        text: 'Next, these fragments are exposed to focused light, which activates the radiation inside. ',
        highlight: 'fact',
        popup: {
          title: 'Middle Step',
          body: 'Show what happens in the middle of the process. Link each step clearly so the reader can follow the sequence.',
        },
      },
      {
        text: 'Finally, the energy is converted into electricity by special generators that capture the glow, ',
        highlight: 'technical',
        popup: {
          title: 'Final Step',
          body: 'Add the last step that shows what is produced. Words like "finally" signal the end of the process.',
        },
      },
      {
        text: 'making the system highly efficient.',
        highlight: 'connective',
        popup: {
          title: 'Closing Detail',
          body: 'End with a sentence that wraps up the process. Words ending in "-ing" (like "making") can link your last idea smoothly to the one before.',
        },
      },
    ],
    guidance: {
      purpose:
        'Paragraph 1 explains HOW your renewable resource works. Walk the reader through the process step by step, from start to finish.',
      whatToInclude: [
        'A topic sentence about how it works',
        'Steps in the correct order',
        'Technical words explained clearly',
        'Cause-and-effect links',
      ],
      writingTips: [
        'Use sequence words: First, Next, Then, Finally',
        'One main idea per paragraph — stick to HOW it works',
        'Imagine explaining it to someone who has never heard of it',
        'Use active verbs: spins, heats, converts, flows',
      ],
      sentenceStarters: [
        '________ works by…',
        'First, ________…',
        'Next, the energy is…',
        'This process creates…',
        'Finally, ________…',
      ],
      checklist: [
        'Has a clear topic sentence',
        'Explains steps in order',
        'Uses sequence words',
        'Stays focused on how it works',
      ],
    },
    placeholder:
      'Explain how your renewable resource works. What happens first? What happens next? What is produced at the end?',
    minWords: 50,
    maxWords: 90,
  },
  {
    id: 'paragraph2',
    label: 'Paragraph 2',
    structureLabel: 'Advantages',
    color: '#D97706',
    colorLight: '#FEF3C7',
    icon: '★',
    exemplar: [
      {
        text: 'One advantage of kryptonite is that a very small amount can produce a large amount of energy. ',
        highlight: 'topic-sentence',
        popup: {
          title: 'Topic Sentence',
          body: 'Signal that this paragraph is about ADVANTAGES. Phrases like "One advantage is…" or "A key benefit is…" tell the reader what to expect.',
        },
      },
      {
        text: 'Unlike solar panels, it can work at night and during cloudy weather. ',
        highlight: 'comparison',
        popup: {
          title: 'Comparison Advantage',
          body: 'Compare your resource to others to show why it is better in some ways. This strengthens your argument without using "I think".',
        },
      },
      {
        text: 'It also requires very little space compared to large wind farms. ',
        highlight: 'fact',
        popup: {
          title: 'Connective + Fact',
          body: '"Also", "Furthermore", and "In addition" link new advantages to previous ones. Each advantage should be a separate fact.',
        },
      },
      {
        text: 'Furthermore, kryptonite power stations do not release smoke or carbon dioxide like coal-fired plants.',
        highlight: 'connective',
        popup: {
          title: 'Strong Connective',
          body: '"Furthermore" is a formal connective that suits information reports. Use at least two connectives across your advantages paragraph.',
        },
      },
    ],
    guidance: {
      purpose:
        'Paragraph 2 lists the ADVANTAGES of your renewable resource. Explain why it is a good choice for producing energy.',
      whatToInclude: [
        'At least two clear advantages',
        'Facts to support each advantage',
        'Formal connectives (also, furthermore, in addition)',
        'Comparisons where helpful',
      ],
      writingTips: [
        'Each advantage should be a separate sentence',
        'Avoid "I think" — state advantages as facts',
        'Think: Why is this better than fossil fuels?',
        'Use strong adjectives: reliable, efficient, sustainable',
      ],
      sentenceStarters: [
        'One advantage of ________ is…',
        'A key benefit is that…',
        'Furthermore, ________…',
        'In addition, this resource…',
        'Compared to coal, ________…',
      ],
      checklist: [
        'Lists at least two advantages',
        'Uses connectives',
        'Supports ideas with facts',
        'Uses formal language',
      ],
    },
    placeholder:
      'What are the advantages of your renewable resource? Why is it a good way to produce energy?',
    minWords: 50,
    maxWords: 90,
  },
  {
    id: 'paragraph3',
    label: 'Paragraph 3',
    structureLabel: 'Interesting facts / use in Australia',
    color: '#0891B2',
    colorLight: '#CFFAFE',
    icon: '◉',
    exemplar: [
      {
        text: 'Australia has growing deposits of kryptonite, ',
        highlight: 'topic-sentence',
        popup: {
          title: 'Australian Focus',
          body: 'This paragraph connects your topic to AUSTRALIA. Open with how your resource relates to our country — potential, use, research, or location.',
        },
      },
      {
        text: 'particularly in remote parts of Western Australia and the Northern Territory. ',
        highlight: 'fact',
        popup: {
          title: 'Location Detail',
          body: 'Name specific places in Australia when you can. This shows research and makes your report more convincing.',
        },
      },
      {
        text: 'A pilot power station near Port Augusta in South Australia has been testing kryptonite as a clean energy source since 2024. ',
        highlight: 'example',
        popup: {
          title: 'Real-World Example',
          body: 'End with a real example of how the resource is used or studied in Australia. Names of states, cities, or projects add authority.',
        },
      },
      {
        text: 'One interesting fact is that the glowing green mineral can be safely transported in lead-lined containers across the outback without losing its stored energy.',
        highlight: 'fact',
        popup: {
          title: 'Interesting Fact',
          body: 'Include a surprising or memorable detail. This is the paragraph where you hook your reader with something they did not know.',
        },
      },
    ],
    guidance: {
      purpose:
        'Paragraph 3 shares interesting facts and explains how your renewable resource is used or could be used in Australia.',
      whatToInclude: [
        'At least one fact about Australia',
        'Names of states, cities, or projects if possible',
        'How the resource is used or being researched here',
        'An interesting detail that surprises the reader',
      ],
      writingTips: [
        'Search for Australian examples — this paragraph is unique to your class task',
        'Mix facts with real-world uses',
        'Use words like "currently", "research shows", "in the future"',
        'Make it interesting — what would surprise a Year 5 reader?',
      ],
      sentenceStarters: [
        'In Australia, ________…',
        'Research in ________ shows that…',
        'One interesting fact is that…',
        'Currently, ________ is used to…',
        'In the future, Australia could…',
      ],
      checklist: [
        'Mentions Australia',
        'Includes an interesting fact',
        'Describes use or potential use',
        'Uses specific place names if possible',
      ],
    },
    placeholder:
      'Share interesting facts about your resource. How is it used in Australia? Where does it have potential?',
    minWords: 50,
    maxWords: 90,
  },
  {
    id: 'conclusion',
    label: 'Conclusion',
    structureLabel: 'Brief summary',
    color: '#DB2777',
    colorLight: '#FCE7F3',
    icon: '◈',
    exemplar: [
      {
        text: 'In conclusion, kryptonite is a powerful and reliable renewable energy resource. ',
        highlight: 'topic-sentence',
        popup: {
          title: 'Conclusion Opener',
          body: 'Start with "In conclusion," or "To summarise," to signal you are wrapping up. Restate the main idea in fresh words — do not copy your introduction.',
        },
      },
      {
        text: 'As more deposits are discovered across Australia, ',
        highlight: 'connective',
        popup: {
          title: 'Looking Forward',
          body: 'A strong conclusion often looks to the future. Use "as", "when", or "in the future" to show what might happen next.',
        },
      },
      {
        text: 'it may become an important part of the nation\'s clean energy future.',
        highlight: 'summary',
        popup: {
          title: 'Final Summary',
          body: 'End with one clear sentence that sums up why your topic matters. Leave the reader with something memorable — no new facts here.',
        },
      },
    ],
    guidance: {
      purpose:
        'Your conclusion gives a brief summary of the whole report. Remind the reader of the main idea and why your renewable resource matters.',
      whatToInclude: [
        'A concluding phrase (In conclusion, / To summarise,)',
        'A restatement of the main idea',
        'A final thought about the future or importance',
        'No brand-new facts',
      ],
      writingTips: [
        'Keep it short — 2–3 sentences is enough',
        'Do not introduce new information',
        'Use different words from your introduction',
        'End on a positive, forward-looking note',
      ],
      sentenceStarters: [
        'In conclusion, ________…',
        'To summarise, this resource…',
        'Overall, ________ is…',
        'In the future, ________ could…',
      ],
      checklist: [
        'Starts with a concluding phrase',
        'Summarises the main idea',
        'Does not add new facts',
        'Is 2–3 sentences',
      ],
    },
    placeholder:
      'Summarise your report. What is the main idea? Why does this renewable resource matter for the future?',
    minWords: 30,
    maxWords: 55,
  },
]

export const TARGET_WORD_COUNT = SECTIONS.reduce((sum, s) => sum + s.minWords, 0)
