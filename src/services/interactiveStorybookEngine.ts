import { KidsStoryItem, LanguageCode } from '../types/ilmizo';
import { getStoryCoverArtwork, getStorySceneArtwork } from './storyArtworkAndAudio';

export interface StoryInteractiveChoice {
  question: string;
  options: [
    {
      label: string;
      isBestChoice: boolean;
      feedback: string;
    },
    {
      label: string;
      isBestChoice: boolean;
      feedback: string;
    }
  ];
}

export interface InteractiveStoryScene {
  sceneIndex: number;
  sceneLabel: string;
  chapterTitle: string;
  illustrationUrl: string;
  /** Subtle focal crop framing so multi-scene progression feels cinematic */
  imageFocalClass: string;
  narrationParagraphs: string[];
  calloutBadge?: string;
  calloutText?: string;
  interactiveChoice?: StoryInteractiveChoice;
  isFinalQuizScene?: boolean;
}

export interface InteractiveStorybookModel {
  storyId: string;
  estimatedMinutes: number;
  totalScenes: number;
  scenes: InteractiveStoryScene[];
}

function getCategoryMoralChoice(
  story: KidsStoryItem,
  lang: LanguageCode
): StoryInteractiveChoice {
  const isHinglish = lang === 'hinglish' || lang === 'hi';
  const category = story.category;

  if (category === 'Honesty' || category === 'Truthfulness') {
    return {
      question: isHinglish
        ? 'Socho: Agar tumse galti se koi cheez toot jaye aur koi dekh nahi raha ho, toh tum kya karoge?'
        : 'What would you do if you accidentally broke something when nobody was watching?',
      options: [
        {
          label: isHinglish
            ? 'Sach bol do aur maafi maang lo — Allah hamesha dekh raha hai'
            : 'Tell the truth honestly and apologize — Allah always sees us',
          isBestChoice: true,
          feedback: isHinglish
            ? 'MashaAllah! Sachai aur amanat par Allah bahut khush hote hain aur dil sukoon se bhar jata hai.'
            : 'MashaAllah! Honesty pleases Allah and builds real courage and trust.',
        },
        {
          label: isHinglish
            ? 'Chhupa do aur kisi aur par ilzaam laga do'
            : 'Hide it quickly and blame someone else',
          isBestChoice: false,
          feedback: isHinglish
            ? 'Jhooth bolne se chhoti galti badi ban jati hai. Allah sach bolne walon ka saath deta hai!'
            : 'Hiding the truth turns a small mistake into a bigger worry. Try choosing honesty!',
        },
      ],
    };
  }

  if (category === 'Kindness' || category === 'Animals' || category === 'Helping') {
    return {
      question: isHinglish
        ? 'Socho: Agar raaste mein koi pyaasa parinda ya pareshan dost mile, toh sabse pehle kya karoge?'
        : 'If you see a thirsty animal or a friend struggling nearby, what will you choose?',
      options: [
        {
          label: isHinglish
            ? 'Ruk kar madad karo aur pyaar se pesh aao — yeh Sadaqah hai'
            : 'Pause to help gently with kindness — every act of mercy is Sadaqah',
          isBestChoice: true,
          feedback: isHinglish
            ? 'SubhanAllah! Allah un logon par reham karta hai jo doosron par reham karte hain.'
            : 'SubhanAllah! Allah shows mercy to those who are merciful to every creature.',
        },
        {
          label: isHinglish
            ? 'Nazar-andaaz karke apne khel mein lag jao'
            : 'Ignore them and keep playing right away',
          isBestChoice: false,
          feedback: isHinglish
            ? 'Thoda waqt nikaal kar madad karne se khel se bhi zyada khushi aur sawab milta hai!'
            : 'Taking a moment to help brings far more joy and reward from Allah.',
        },
      ],
    };
  }

  if (category === 'Parents' || category === 'Manners') {
    return {
      question: isHinglish
        ? 'Socho: Jab Ammi ya Abbu aapko kisi kaam ke liye bulayein jab aap khel rahe hon, toh aap kya karoge?'
        : 'When your parents call you while you are busy playing, how should you respond?',
      options: [
        {
          label: isHinglish
            ? 'Muskurakar foran "Ji Ammi / Ji Abbu" bol kar suno'
            : 'Smile, reply gently right away, and help with love',
          isBestChoice: true,
          feedback: isHinglish
            ? 'MashaAllah! Maa-baap ki izzat aur narmi se baat karna Allah ko sabse zyada pasand hai.'
            : 'MashaAllah! Speaking gently and obeying parents brings great barakah into our home.',
        },
        {
          label: isHinglish
            ? 'Gusse se bolo "Abhi nahi, baad mein!"'
            : 'Complain loudly and say "Not right now!"',
          isBestChoice: false,
          feedback: isHinglish
            ? 'Quran humein sikhata hai ki parents se hamesha narmi aur adab se baat karni chahiye.'
            : 'The Quran teaches us to speak to our parents with gentleness and respect.',
        },
      ],
    };
  }

  if (category === 'Patience' || category === 'Gratitude') {
    return {
      question: isHinglish
        ? 'Socho: Jab koi kaam mushkil lage ya cheez aapki marzi se na ho, toh sabse achha jawab kya hai?'
        : 'When something feels difficult or does not go your way, what helps the most?',
      options: [
        {
          label: isHinglish
            ? 'Sabr karo, "Alhamdulillah" kaho aur Allah se dua maango'
            : 'Stay patient, say "Alhamdulillah", and ask Allah for help in Dua',
          isBestChoice: true,
          feedback: isHinglish
            ? 'MashaAllah! Sabr aur shukr karne walon ke saath Allah hamesha hota hai.'
            : 'MashaAllah! Allah is always with the patient and increases blessings for the grateful.',
        },
        {
          label: isHinglish
            ? 'Himmat haar kar gussa karo aur shikayat karo'
            : 'Give up right away and complain angrily',
          isBestChoice: false,
          feedback: isHinglish
            ? 'Gusse se mushkil kam nahi hoti — ek gehri saans lo, Bismillah kaho, aur dobara koshish karo!'
            : 'Anger never solves a challenge — take a calm breath, make Dua, and try again with patience.',
        },
      ],
    };
  }

  // Prophets, Companions, Akhlaq, Responsibility
  return {
    question: isHinglish
      ? 'Socho: Is kisse se seekh kar aaj aap apni zindagi mein kaunsa nek kaam karoge?'
      : 'Inspired by this story, which choice reflects the best Islamic character today?',
    options: [
      {
        label: isHinglish
          ? 'Allah par bharosa rakhna, sabr karna aur doosron ke kaam aana'
          : 'Trust Allah, stay steadfast in goodness, and help someone around me',
        isBestChoice: true,
        feedback: isHinglish
          ? 'MashaAllah! Ambiya aur Sahaba ke kisse humein rozana nek amal karne ki himmat dete hain.'
          : 'MashaAllah! Stories of the Prophets and Companions guide us to live with courage and kindness.',
      },
      {
        label: isHinglish
          ? 'Sirf kahani sun kar bhool jana'
          : 'Just finish reading without practicing the lesson',
        isBestChoice: false,
        feedback: isHinglish
          ? 'Asli maza tab hai jab hum ek chhota sa achha amal aaj hi practice karein!'
          : 'A story shines brightest when we put even one small good deed into action today!',
      },
    ],
  };
}

/**
 * Expands any KidsStoryItem into a rich 6-Scene Interactive Storybook while preserving
 * 100% compatibility with existing localizedPages and offline Studio Voice caching.
 */
export function buildInteractiveStorybook(
  story: KidsStoryItem,
  lang: LanguageCode = 'en'
): InteractiveStorybookModel {
  const isHinglish = lang === 'hinglish' || lang === 'hi';
  const rawPages = story.localizedPages?.[lang] || story.pages || [];
  const summary = story.localizedSummaries?.[lang] || story.summary;
  const objective =
    story.localizedObjectives?.[lang] ||
    story.learningObjective ||
    'Grow closer to Allah with strong character and kindness.';
  const moral = story.localizedMorals?.[lang] || story.moral;
  const reflection =
    story.localizedReflectionActivities?.[lang] ||
    story.reflectionActivity ||
    `Share the lesson of "${story.localizedTitles?.[lang] || story.title}" with your parents today.`;

  const p0 = rawPages[0] || summary;
  const p1 = rawPages[1] || rawPages[0] || summary;
  const p2 = rawPages[2] || rawPages[rawPages.length - 1] || moral;

  const coverImg = getStoryCoverArtwork(story);
  const sceneImg2 = getStorySceneArtwork(story, 1);
  const sceneImg3 = getStorySceneArtwork(story, 2);
  const sceneImg4 = getStorySceneArtwork(story, 3);
  const sceneImg5 = getStorySceneArtwork(story, 4);

  const scenes: InteractiveStoryScene[] = [
    {
      sceneIndex: 0,
      sceneLabel: isHinglish ? 'Scene 1 · Shuruaat' : 'Scene 1 · Opening',
      chapterTitle: isHinglish ? 'Kahani Ki Shuruaat' : 'Setting the Scene',
      illustrationUrl: coverImg,
      imageFocalClass: 'object-center',
      narrationParagraphs: [p0, summary !== p0 ? summary : objective],
      calloutBadge: isHinglish ? 'Aaj Kya Seekhenge' : 'Today’s Discovery',
      calloutText: objective,
    },
    {
      sceneIndex: 1,
      sceneLabel: isHinglish ? 'Scene 2 · Safar' : 'Scene 2 · The Journey',
      chapterTitle: isHinglish ? 'Imtihan Aur Koshish' : 'Walking Through the Test',
      illustrationUrl: sceneImg2,
      imageFocalClass: 'object-left-top',
      narrationParagraphs: [
        p1,
        isHinglish
          ? 'Gaur se sochiye: mushkil waqt mein bhi sahi raasta chunna asli bahaduri hoti hai.'
          : 'Pause and imagine being right there — choosing what pleases Allah takes real courage.',
      ],
    },
    {
      sceneIndex: 2,
      sceneLabel: isHinglish ? 'Scene 3 · Aapka Faisla' : 'Scene 3 · Your Choice',
      chapterTitle: isHinglish ? 'Agar Aap Wahan Hote?' : 'What Would You Do?',
      illustrationUrl: sceneImg3,
      imageFocalClass: 'object-right-bottom',
      narrationParagraphs: [
        isHinglish
          ? 'Kahani ke is mod par, ek pal ruk kar apna faisla chuniye:'
          : 'At this turning point in the story, pause and choose what you would do:',
      ],
      interactiveChoice: getCategoryMoralChoice(story, lang),
    },
    {
      sceneIndex: 3,
      sceneLabel: isHinglish ? 'Scene 4 · Khaas Mod' : 'Scene 4 · Turning Point',
      chapterTitle: isHinglish ? 'Allah Ki Madad Aur Anjaam' : 'Allah’s Guidance Shines',
      illustrationUrl: sceneImg4,
      imageFocalClass: 'object-center',
      narrationParagraphs: [p2],
      calloutBadge: story.sourceReference ? 'Authentic Source' : 'Story Wisdom',
      calloutText: story.sourceReference
        ? `${story.authenticityLabel || 'Verified Source'} — ${story.sourceReference}`
        : moral,
    },
    {
      sceneIndex: 4,
      sceneLabel: isHinglish ? 'Scene 5 · Aaj Ka Amal' : 'Scene 5 · Action Challenge',
      chapterTitle: isHinglish ? 'Dil Ki Baat & Sunnah Challenge' : 'Heart Lesson & Sunnah Action',
      illustrationUrl: sceneImg5,
      imageFocalClass: 'object-bottom',
      narrationParagraphs: [moral, reflection],
      calloutBadge: isHinglish ? 'Family Talk Prompt' : 'Talk With Parents',
      calloutText: isHinglish
        ? 'Raat ke khane par Ammi ya Abbu ko is kahani ka sabse achha hissa sunaiye!'
        : 'Tell your parents your favorite moment from this story at dinner tonight!',
    },
    {
      sceneIndex: 5,
      sceneLabel: isHinglish ? 'Scene 6 · Quiz & Star' : 'Scene 6 · Quiz & Reward',
      chapterTitle: isHinglish ? 'Kahani Quiz & Waada' : 'Story Check & Sunnah Promise',
      illustrationUrl: coverImg,
      imageFocalClass: 'object-center',
      narrationParagraphs: [
        isHinglish
          ? 'Shabash! Aapne poori kahani dhyaan se padh li. Neeche diye gaye sawaal ka jawab dein aur +5 ★ jeetein!'
          : 'Well done! You explored every scene of the story. Answer the quick check below to earn +5 ★!',
      ],
      isFinalQuizScene: true,
    },
  ];

  return {
    storyId: story.id,
    estimatedMinutes: 4,
    totalScenes: scenes.length,
    scenes,
  };
}
