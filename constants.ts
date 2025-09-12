import type { Language, Level, Topic, Theme } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'အင်္ဂလိပ်', flag: '🇬🇧' },
  { code: 'zh', name: 'Chinese', nativeName: 'တရုတ်', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: 'ဂျပန်', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: 'ကိုရီးယား', flag: '🇰🇷' },
  { code: 'th', name: 'Thai', nativeName: 'ထိုင်း', flag: '🇹🇭' },
  { code: 'de', name: 'German', nativeName: 'ဂျာမန်', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'ပြင်သစ်', flag: '🇫🇷' },
];

export const LEVELS: Level[] = [
  { id: 'a1', cefr: 'A1', name: { en: 'Beginner', my: 'အခြေခံအစ' }, emoji: '🌱' },
  { id: 'a2', cefr: 'A2', name: { en: 'Elementary', my: 'အခြေခံ' }, emoji: '🌿' },
  { id: 'b1', cefr: 'B1', name: { en: 'Intermediate', my: 'အလယ်အလတ်' }, emoji: '🌳' },
  { id: 'b2', cefr: 'B2', name: { en: 'Upper-Intermediate', my: 'အလယ်အလတ်အထက်' }, emoji: '🔥' },
  { id: 'c1', cefr: 'C1', name: { en: 'Advanced', my: 'အဆင့်မြင့်' }, emoji: '🚀' },
  { id: 'c2', cefr: 'C2', name: { en: 'Proficient', my: 'ကျွမ်းကျင်' }, emoji: '🌌' },
];


export const TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'greetings', name: { en: 'Greetings & Introductions', native: 'နှုတ်ဆက်ခြင်းနှင့် မိတ်ဆက်ခြင်း' }, emoji: '👋', levels: ['a1'] },
  { id: 'time-and-date', name: { en: 'Numbers, Time & Dates', native: 'ဂဏန်း၊ အချိန်နှင့် နေ့စွဲများ' }, emoji: '🗓️', levels: ['a1'] },
  { id: 'family-personal', name: { en: 'Family & Personal Info', native: 'မိသားစုနှင့် ကိုယ်ရေးအချက်အလက်' }, emoji: '👨‍👩‍👧‍👦', levels: ['a1'] },
  { id: 'objects-places', name: { en: 'Objects, Clothes & Rooms', native: 'အရာဝတ္ထု၊ အဝတ်အစားနှင့် အခန်းများ' }, emoji: '🛋️', levels: ['a1'] },
  { id: 'daily-routines', name: { en: 'Daily Routines', native: 'နေ့စဉ်လုပ်ဆောင်မှုများ' }, emoji: '⏰', levels: ['a1'] },
  { id: 'food-shopping', name: { en: 'Food, Drinks & Shopping', native: 'အစားအစာ၊ အဖျော်ယမကာနှင့် စျေးဝယ်ခြင်း' }, emoji: '🛒', levels: ['a1'] },
  { id: 'directions-locations', name: { en: 'Directions & Locations', native: 'လမ်းညွှန်များနှင့် နေရာများ' }, emoji: '🗺️', levels: ['a1'] },
  { id: 'weather', name: { en: 'Weather & Seasons', native: 'ရာသီဥတုနှင့် ရာသီများ' }, emoji: '🌦️', levels: ['a1'] },
  { id: 'school-basics', name: { en: 'School Basics', native: 'ကျောင်းသုံးအခြေခံများ' }, emoji: '🏫', levels: ['a1'] },
  { id: 'polite-expressions', name: { en: 'Polite Expressions', native: 'ယဉ်ကျေးသော အသုံးအနှုန်းများ' }, emoji: '🙏', levels: ['a1'] },
  
  // A2 (Elementary)
  { id: 'hobbies-sports', name: { en: 'Hobbies & Sports', native: 'ဝါသနာနှင့် အားကစား' }, emoji: '⚽', levels: ['a2'] },
  { id: 'travel-tourism', name: { en: 'Travel & Tourism', native: 'ခရီးသွားခြင်းနှင့် ခရီးသွားလုပ်ငန်း' }, emoji: '✈️', levels: ['a2'] },
  { id: 'health-basics', name: { en: 'Health & Simple Medicine', native: 'ကျန်းမာရေးနှင့် ရိုးရှင်းသောဆေးဝါး' }, emoji: '🩺', levels: ['a2'] },
  { id: 'likes-dislikes', name: { en: 'Likes & Dislikes', native: 'ကြိုက်ခြင်းနှင့် မကြိုက်ခြင်း' }, emoji: '👍', levels: ['a2'] },
  { id: 'shopping-money', name: { en: 'Shopping & Money', native: 'စျေးဝယ်ခြင်းနှင့် ငွေကြေး' }, emoji: '🛍️', levels: ['a2'] },
  { id: 'short-stories', name: { en: 'Short Stories', native: 'ဇာတ်လမ်းတိုများ' }, emoji: '📖', levels: ['a2'] },
  { id: 'invitations-requests', name: { en: 'Invitations & Requests', native: 'ဖိတ်ကြားချက်များနှင့် တောင်းဆိုမှုများ' }, emoji: '💌', levels: ['a2'] },
  { id: 'past-experiences', name: { en: 'Past Experiences', native: 'အတိတ်အတွေ့အကြုံများ' }, emoji: '🕰️', levels: ['a2'] },
  { id: 'digital-communication', name: { en: 'Simple Digital Communication', native: 'ရိုးရှင်းသော ဒစ်ဂျစ်တယ်ဆက်သွယ်ရေး' }, emoji: '📧', levels: ['a2'] },
  { id: 'culture-festivals', name: { en: 'Culture & Festivals', native: 'ယဉ်ကျေးမှုနှင့် ပွဲတော်များ' }, emoji: '🎉', levels: ['a2'] },
  
  // B1 (Intermediate)
  { id: 'education-work', name: { en: 'Education & Work', native: 'ပညာရေးနှင့် အလုပ်' }, emoji: '🎓', levels: ['b1'] },
  { id: 'travel-experiences', name: { en: 'Travel Experiences', native: 'ခရီးသွားအတွေ့အကြုံများ' }, emoji: '🌍', levels: ['b1'] },
  { id: 'media-entertainment', name: { en: 'Media & Entertainment', native: 'မီဒီယာနှင့် ဖျော်ဖြေရေး' }, emoji: '🎬', levels: ['b1'] },
  { id: 'feelings-emotions', name: { en: 'Feelings & Emotions', native: 'ခံစားချက်များနှင့် စိတ်လှုပ်ရှားမှုများ' }, emoji: '😊', levels: ['b1'] },
  { id: 'opinions-arguments', name: { en: 'Opinions & Arguments', native: 'ထင်မြင်ချက်များနှင့် ငြင်းခုံမှုများ' }, emoji: '🗣️', levels: ['b1'] },
  { id: 'environment-society', name: { en: 'Environment & Social Issues', native: 'ပတ်ဝန်းကျင်နှင့် လူမှုရေးဆိုင်ရာကိစ္စများ' }, emoji: '🌳', levels: ['b1'] },
  { id: 'health-lifestyle', name: { en: 'Health & Lifestyle', native: 'ကျန်းမာရေးနှင့် လူနေမှုဘဝပုံစံ' }, emoji: '🥗', levels: ['b1'] },
  { id: 'technology-basics', name: { en: 'Technology Basics', native: 'နည်းပညာ အခြေခံများ' }, emoji: '📱', levels: ['b1'] },
  { id: 'cause-effect', name: { en: 'Cause & Effect', native: 'အကြောင်းနှင့် အကျိုး' }, emoji: '💡', levels: ['b1'] },
  { id: 'storytelling', name: { en: 'Storytelling', native: 'ပုံပြောခြင်း' }, emoji: '📚', levels: ['b1'] },
  { id: 'news-reporting', name: { en: 'News & Events', native: 'သတင်းနှင့် ဖြစ်ရပ်များ' }, emoji: '📰', levels: ['b1'] },
  { id: 'cultural-comparisons', name: { en: 'Cultural Comparisons', native: 'ယဉ်ကျေးမှု နှိုင်းယှဉ်ချက်များ' }, emoji: '🌐', levels: ['b1'] },

  // B2 (Upper Intermediate)
  { id: 'tech-culture', name: { en: 'Technology & Internet Culture', native: 'နည်းပညာနှင့် အင်တာနက်ယဉ်ကျေးမှု' }, emoji: '💻', levels: ['b2'] },
  { id: 'business-economics', name: { en: 'Business & Economics', native: 'စီးပွားရေးနှင့် ဘောဂဗေဒ' }, emoji: '💹', levels: ['b2'] },
  { id: 'politics-government', name: { en: 'Politics & Government', native: 'နိုင်ငံရေးနှင့် အစိုးရ' }, emoji: '🏛️', levels: ['b2'] },
  { id: 'advanced-education-work', name: { en: 'Advanced Education & Work', native: 'အဆင့်မြင့်ပညာရေးနှင့် အလုပ်' }, emoji: '📈', levels: ['b2'] },
  { id: 'environmental-issues', name: { en: 'Environmental Issues', native: 'ပတ်ဝန်းကျင်ဆိုင်ရာ ပြဿနာများ' }, emoji: '♻️', levels: ['b2'] },
  { id: 'arts-and-culture', name: { en: 'Arts & Culture', native: 'အနုပညာနှင့် ယဉ်ကျေးမှု' }, emoji: '🎭', levels: ['b2'] },
  { id: 'advanced-health', name: { en: 'Advanced Health & Fitness', native: 'အဆင့်မြင့် ကျန်းမာရေးနှင့် ကြံ့ခိုင်မှု' }, emoji: '🧠', levels: ['b2'] },
  { id: 'debate-argumentation', name: { en: 'Debate & Argumentation', native: 'ငြင်းခုံခြင်းနှင့် အငြင်းပွားခြင်း' }, emoji: '⚖️', levels: ['b2'] },
  { id: 'hypotheticals', name: { en: 'Hypothetical Situations', native: 'စိတ်ကူးယဉ် အခြေအနေများ' }, emoji: '🤔', levels: ['b2'] },
  { id: 'academic-discourse', name: { en: 'Academic Discourse', native: 'ပညာရပ်ဆိုင်ရာ ဆွေးနွေးမှု' }, emoji: '📜', levels: ['b2'] },
  { id: 'extended-writing', name: { en: 'Essays & Reports', native: 'အက်ဆေးနှင့် အစီရင်ခံစာများ' }, emoji: '✍️', levels: ['b2'] },
  
  // C1 (Advanced)
  { id: 'philosophy-psychology', name: { en: 'Philosophy & Psychology', native: 'ဒဿနိကဗေဒနှင့် စိတ်ပညာ' }, emoji: '🤔', levels: ['c1'] },
  { id: 'advanced-science-tech', name: { en: 'Advanced Science & Tech', native: 'အဆင့်မြင့်သိပ္ပံနှင့် နည်းပညာ' }, emoji: '🧬', levels: ['c1'] },
  { id: 'globalization-ir', name: { en: 'Globalization & Int. Relations', native: 'ဂလိုဘယ်လိုက်ဇေးရှင်းနှင့် နိုင်ငံတကာဆက်ဆံရေး' }, emoji: '🤝', levels: ['c1'] },
  { id: 'advanced-debate', name: { en: 'Advanced Debates', native: 'အဆင့်မြင့် ငြင်းခုံမှုများ' }, emoji: '🎤', levels: ['c1'] },
  { id: 'history-literature', name: { en: 'History & Literature', native: 'သမိုင်းနှင့် စာပေ' }, emoji: '🏺', levels: ['c1'] },
  { id: 'advanced-social-issues', name: { en: 'Advanced Social Issues', native: 'အဆင့်မြင့် လူမှုရေးပြဿနာများ' }, emoji: '⚖️', levels: ['c1'] },
  { id: 'critical-analysis', name: { en: 'Critical Analysis', native: 'ဝေဖန်ပိုင်းခြားစိတ်ဖြာခြင်း' }, emoji: '🧐', levels: ['c1'] },
  { id: 'professional-topics', name: { en: 'Professional Topics', native: 'ပညာชีพဆိုင်ရာ ခေါင်းစဉ်များ' }, emoji: '💼', levels: ['c1'] },
  { id: 'academic-skills', name: { en: 'Academic Skills', native: 'ပညာရပ်ဆိုင်ရာ ကျွမ်းကျင်မှုများ' }, emoji: '🧑‍🏫', levels: ['c1'] },
  { id: 'idioms-proverbs', name: { en: 'Idioms & Proverbs', native: 'စကားပုံများနှင့် ဆိုရိုးစကားများ' }, emoji: '😎', levels: ['c1'] },

  // C2 (Proficient)
  { id: 'academic-research', name: { en: 'Academic Research', native: 'ပညာရပ်ဆိုင်ရာ သုတေသန' }, emoji: '🔬', levels: ['c2'] },
  { id: 'specialized-fields', name: { en: 'Specialized Fields', native: 'အထူးပြုနယ်ပယ်များ' }, emoji: '🧑‍⚖️', levels: ['c2'] },
  { id: 'classical-literature', name: { en: 'Classical Literature', native: 'ဂန္ထဝင်စာပေ' }, emoji: '📜', levels: ['c2'] },
  { id: 'diplomacy-rhetoric', name: { en: 'Diplomacy & Rhetoric', native: 'သံတမန်ရေးရာနှင့် အပြောအဆိုပညာ' }, emoji: '🌐', levels: ['c2'] },
  { id: 'advanced-philosophy', name: { en: 'Advanced Philosophy', native: 'အဆင့်မြင့် ဒဿနိကဗေဒ' }, emoji: '💡', levels: ['c2'] },
  { id: 'literary-analysis', name: { en: 'Literary Analysis & Satire', native: 'စာပေပိုင်းခြားစိတ်ဖြာခြင်းနှင့် သရော်စာ' }, emoji: '🎭', levels: ['c2'] },
  { id: 'global-debates', name: { en: 'Global Issue Debates', native: 'ကမ္ဘာလုံးဆိုင်ရာ ပြဿနာများအပေါ် ငြင်းခုံမှုများ' }, emoji: '💥', levels: ['c2'] },
  { id: 'dialects-idioms', name: { en: 'Dialects & Advanced Idioms', native: 'ဒေသန္တရစကားနှင့် အဆင့်မြင့် ဆိုရိုးစကားများ' }, emoji: '🗺️', levels: ['c2'] },
  { id: 'professional-writing', name: { en: 'Professional Writing', native: 'ပညာชีพဆိုင်ရာ အရေးအသား' }, emoji: '✍️', levels: ['c2'] },
  { id: 'stylistic-mastery', name: { en: 'Stylistic Mastery', native: 'ရေးဟန်ကျွမ်းကျင်မှု' }, emoji: '🎨', levels: ['c2'] },
  { id: 'cultural-nuance', name: { en: 'Cultural Nuance & Humor', native: 'ယဉ်ကျေးမှုဆိုင်ရာ နက်နဲမှုနှင့် ဟာသ' }, emoji: '😉', levels: ['c2'] },
];

export const TRANSLATION_TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'tr-a1-intro', name: { en: 'Self-introduction', native: 'မိမိကိုယ်ကို မိတ်ဆက်ခြင်း' }, emoji: '👤', levels: ['a1'] },
  { id: 'tr-a1-greetings', name: { en: 'Greetings & Polite Expressions', native: 'နှုတ်ဆက်ခြင်းနှင့် ယဉ်ကျေးသောအသုံးအနှုန်းများ' }, emoji: '👋', levels: ['a1'] },
  { id: 'tr-a1-time', name: { en: 'Numbers, Dates & Time', native: 'ဂဏန်း၊ နေ့စွဲနှင့် အချိန်' }, emoji: '🗓️', levels: ['a1'] },
  { id: 'tr-a1-family', name: { en: 'Family Members', native: 'မိသားစုဝင်များ' }, emoji: '👨‍👩‍👧‍👦', levels: ['a1'] },
  { id: 'tr-a1-routine', name: { en: 'Daily Routine', native: 'နေ့စဉ်လုပ်ဆောင်မှုများ' }, emoji: '⏰', levels: ['a1'] },
  { id: 'tr-a1-food', name: { en: 'Food & Drinks', native: 'အစားအစာနှင့် အဖျော်ယမကာ' }, emoji: '🍔', levels: ['a1'] },
  { id: 'tr-a1-objects', name: { en: 'Colors, Clothes & Objects', native: 'အရောင်၊ အဝတ်အစားနှင့် အရာဝတ္ထုများ' }, emoji: '🎨', levels: ['a1'] },
  { id: 'tr-a1-weather', name: { en: 'Weather', native: 'ရာသီဥတု' }, emoji: '🌦️', levels: ['a1'] },
  { id: 'tr-a1-places', name: { en: 'Places & Directions', native: 'နေရာများနှင့် လမ်းညွှန်များ' }, emoji: '🗺️', levels: ['a1'] },
  
  // A2 (Elementary)
  { id: 'tr-a2-shopping', name: { en: 'Shopping & Money', native: 'စျေးဝယ်ခြင်းနှင့် ငွေကြေး' }, emoji: '🛍️', levels: ['a2'] },
  { id: 'tr-a2-ordering', name: { en: 'Ordering Food', native: 'အစားအစာ မှာကြားခြင်း' }, emoji: '🍜', levels: ['a2'] },
  { id: 'tr-a2-directions', name: { en: 'Giving Directions', native: 'လမ်းညွှန်ပေးခြင်း' }, emoji: '🧭', levels: ['a2'] },
  { id: 'tr-a2-likes', name: { en: 'Likes & Dislikes', native: 'ကြိုက်ခြင်းနှင့် မကြိုက်ခြင်း' }, emoji: '👍', levels: ['a2'] },
  { id: 'tr-a2-comparisons', name: { en: 'Simple Comparisons', native: 'ရိုးရှင်းသော နှိုင်းယှဉ်မှုများ' }, emoji: '📊', levels: ['a2'] },
  { id: 'tr-a2-past-activities', name: { en: 'Past Activities', native: 'အတိတ်က လုပ်ဆောင်မှုများ' }, emoji: '🕰️', levels: ['a2'] },
  { id: 'tr-a2-hobbies', name: { en: 'Hobbies & Free Time', native: 'ဝါသနာနှင့် အားလပ်ချိန်' }, emoji: '🎨', levels: ['a2'] },
  { id: 'tr-a2-health', name: { en: 'Basic Health', native: 'အခြေခံ ကျန်းမာရေး' }, emoji: '🩺', levels: ['a2'] },

  // B1 (Intermediate)
  { id: 'tr-b1-travel', name: { en: 'Travel Experiences', native: 'ခရီးသွားအတွေ့အကြုံများ' }, emoji: '🌍', levels: ['b1'] },
  { id: 'tr-b1-work', name: { en: 'Education & Work', native: 'ပညာရေးနှင့် အလုပ်' }, emoji: '💼', levels: ['b1'] },
  { id: 'tr-b1-media', name: { en: 'Entertainment & Media', native: 'ဖျော်ဖြေရေးနှင့် မီဒီယာ' }, emoji: '🎬', levels: ['b1'] },
  { id: 'tr-b1-feelings', name: { en: 'Feelings & Emotions', native: 'ခံစားချက်များနှင့် စိတ်လှုပ်ရှားမှုများ' }, emoji: '😊', levels: ['b1'] },
  { id: 'tr-b1-environment', name: { en: 'Environmental Basics', native: 'ပတ်ဝန်းကျင် အခြေခံများ' }, emoji: '🌳', levels: ['b1'] },
  { id: 'tr-b1-social', name: { en: 'Social Activities', native: 'လူမှုရေး လုပ်ဆောင်မှုများ' }, emoji: '🎉', levels: ['b1'] },
  { id: 'tr-b1-opinions', name: { en: 'Giving Opinions', native: 'ထင်မြင်ချက်ပေးခြင်း' }, emoji: '🗣️', levels: ['b1'] },

  // B2 (Upper Intermediate)
  { id: 'tr-b2-tech', name: { en: 'Technology', native: 'နည်းပညာ' }, emoji: '💻', levels: ['b2'] },
  { id: 'tr-b2-business', name: { en: 'Business & Economy', native: 'စီးပွားရေးနှင့် ဘောဂဗေဒ' }, emoji: '💹', levels: ['b2'] },
  { id: 'tr-b2-social', name: { en: 'Social Issues', native: 'လူမှုရေးဆိုင်ရာ ပြဿနာများ' }, emoji: '🤝', levels: ['b2'] },
  { id: 'tr-b2-politics', name: { en: 'Politics Basics', native: 'နိုင်ငံရေး အခြေခံများ' }, emoji: '🏛️', levels: ['b2'] },
  { id: 'tr-b2-arts', name: { en: 'Art & Literature', native: 'အနုပညာနှင့် စာပေ' }, emoji: '🎭', levels: ['b2'] },
  { id: 'tr-b2-health', name: { en: 'Health & Fitness', native: 'ကျန်းမာရေးနှင့် ကြံ့ခိုင်မှု' }, emoji: '💪', levels: ['b2'] },
  { id: 'tr-b2-cause-effect', name: { en: 'Cause & Effect', native: 'အကြောင်းနှင့် အကျိုး' }, emoji: '💡', levels: ['b2'] },

  // C1 (Advanced)
  { id: 'tr-c1-philosophy', name: { en: 'Philosophy', native: 'ဒဿနိကဗေဒ' }, emoji: '🤔', levels: ['c1'] },
  { id: 'tr-c1-globalization', name: { en: 'Globalization', native: 'ဂလိုဘယ်လိုက်ဇေးရှင်း' }, emoji: '🌐', levels: ['c1'] },
  { id: 'tr-c1-science', name: { en: 'Science & Research', native: 'သိပ္ပံနှင့် သုတေသန' }, emoji: '🔬', levels: ['c1'] },
  { id: 'tr-c1-psychology', name: { en: 'Psychology & Emotions', native: 'စိတ်ပညာနှင့် စိတ်လှုပ်ရှားမှုများ' }, emoji: '🧠', levels: ['c1'] },
  { id: 'tr-c1-debates', name: { en: 'Debates', native: 'ငြင်းခုံမှုများ' }, emoji: '🎤', levels: ['c1'] },
  { id: 'tr-c1-media-bias', name: { en: 'Media & Bias', native: 'မီဒီယာနှင့် ဘက်လိုက်မှု' }, emoji: '📰', levels: ['c1'] },
  { id: 'tr-c1-persuasion', name: { en: 'Persuasive Arguments', native: 'ဆွဲဆောင်နိုင်သော ငြင်းခုံမှုများ' }, emoji: '⚖️', levels: ['c1'] },

  // C2 (Mastery)
  { id: 'tr-c2-law', name: { en: 'Law & Justice', native: 'ဥပဒေနှင့် တရားမျှတမှု' }, emoji: '🧑‍⚖️', levels: ['c2'] },
  { id: 'tr-c2-economics', name: { en: 'Economics & Trade', native: 'စီးပွားရေးနှင့် ကုန်သွယ်မှု' }, emoji: '📈', levels: ['c2'] },
  { id: 'tr-c2-diplomacy', name: { en: 'Diplomacy', native: 'သံတမန်ရေးရာ' }, emoji: '🤝', levels: ['c2'] },
  { id: 'tr-c2-literature', name: { en: 'Literature & Philosophy', native: 'စာပေနှင့် ဒဿနိကဗေဒ' }, emoji: '📜', levels: ['c2'] },
  { id: 'tr-c2-idioms', name: { en: 'Idioms & Proverbs', native: 'စကားပုံများနှင့် ဆိုရိုးစကားများ' }, emoji: '😎', levels: ['c2'] },
  { id: 'tr-c2-culture', name: { en: 'Cultural Nuance', native: 'ယဉ်ကျေးမှုဆိုင်ရာ နက်နဲမှု' }, emoji: '😉', levels: ['c2'] },
  { id: 'tr-c2-essays', name: { en: 'Critical Essays', native: 'ဝေဖန်ပိုင်းခြားသော အက်ဆေးများ' }, emoji: '✍️', levels: ['c2'] },
];

export const READING_TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'rd-a1-info', name: { en: 'Personal Information', native: 'ကိုယ်ရေးအချက်အလက်' }, emoji: '📄', levels: ['a1'] },
  { id: 'rd-a1-dialogues', name: { en: 'Short Dialogues', native: 'စကားပြောတိုများ' }, emoji: '💬', levels: ['a1'] },
  { id: 'rd-a1-signs', name: { en: 'Menus & Signs', native: 'မီနူးများနှင့် ဆိုင်းဘုတ်များ' }, emoji: '🏷️', levels: ['a1'] },
  { id: 'rd-a1-routines', name: { en: 'Daily Routine Texts', native: 'နေ့စဉ်လုပ်ဆောင်မှု စာများ' }, emoji: '⏰', levels: ['a1'] },
  { id: 'rd-a1-messages', name: { en: 'Short Messages', native: 'စာတိုများ' }, emoji: '💌', levels: ['a1'] },
  { id: 'rd-a1-timetables', name: { en: 'Weather & Timetables', native: 'ရာသီဥတုနှင့် အချိန်ဇယားများ' }, emoji: '🌦️', levels: ['a1'] },
  { id: 'rd-a1-ads', name: { en: 'Simple Ads', native: 'ရိုးရှင်းသော ကြော်ငြာများ' }, emoji: '🖼️', levels: ['a1'] },

  // A2 (Elementary)
  { id: 'rd-a2-emails', name: { en: 'Short Emails & Letters', native: 'အီးမေးလ်နှင့် စာတိုများ' }, emoji: '📧', levels: ['a2'] },
  { id: 'rd-a2-stories', name: { en: 'Simple Stories', native: 'ရိုးရှင်းသော ဇာတ်လမ်းများ' }, emoji: '📖', levels: ['a2'] },
  { id: 'rd-a2-blogs', name: { en: 'Daily Life Blogs', native: 'နေ့စဉ်ဘဝ ဘလော့ဂ်များ' }, emoji: '✍️', levels: ['a2'] },
  { id: 'rd-a2-descriptions', name: { en: 'Descriptions', native: 'ဖော်ပြချက်များ' }, emoji: '🏞️', levels: ['a2'] },
  { id: 'rd-a2-guides', name: { en: 'Travel Guides', native: 'ခရီးသွားလမ်းညွှန်များ' }, emoji: '🗺️', levels: ['a2'] },
  { id: 'rd-a2-news', name: { en: 'Short News', native: 'သတင်းတိုများ' }, emoji: '📰', levels: ['a2'] },
  { id: 'rd-a2-instructions', name: { en: 'Instructions & Recipes', native: 'ညွှန်ကြားချက်များနှင့် ချက်ပြုတ်နည်းများ' }, emoji: '🍳', levels: ['a2'] },

  // B1 (Intermediate)
  { id: 'rd-b1-articles', name: { en: 'News Articles', native: 'သတင်းဆောင်းပါးများ' }, emoji: '🗞️', levels: ['b1'] },
  { id: 'rd-b1-magazine', name: { en: 'Magazine Articles', native: 'မဂ္ဂဇင်းဆောင်းပါးများ' }, emoji: '📚', levels: ['b1'] },
  { id: 'rd-b1-diaries', name: { en: 'Travel Diaries', native: 'ခရီးသွား ဒိုင်ယာရီများ' }, emoji: '✈️', levels: ['b1'] },
  { id: 'rd-b1-biographies', name: { en: 'Short Biographies', native: 'အတ္ထုပ္ပတ္တိတိုများ' }, emoji: '👤', levels: ['b1'] },
  { id: 'rd-b1-fiction', name: { en: 'Short Stories', native: 'ပုံပြင်တိုများ' }, emoji: '🏰', levels: ['b1'] },
  { id: 'rd-b1-opinions', name: { en: 'Opinion Texts', native: 'ထင်မြင်ချက်စာများ' }, emoji: '🗣️', levels: ['b1'] },
  { id: 'rd-b1-social-media', name: { en: 'Social Media Posts', native: 'ဆိုရှယ်မီဒီယာ ပို့စ်များ' }, emoji: '📱', levels: ['b1'] },
  { id: 'rd-b1-reviews', name: { en: 'Reviews', native: 'သုံးသပ်ချက်များ' }, emoji: '⭐', levels: ['b1'] },
  
  // B2 (Upper Intermediate)
  { id: 'rd-b2-editorials', name: { en: 'Opinion Columns', native: 'အယ်ဒီတာ့အာဘော်' }, emoji: '🧐', levels: ['b2'] },
  { id: 'rd-b2-essays', name: { en: 'Academic Essays', native: 'ပညာရပ်ဆိုင်ရာ အက်ဆေးများ' }, emoji: '🎓', levels: ['b2'] },
  { id: 'rd-b2-excerpts', name: { en: 'Fiction Excerpts', native: 'ဝတ္ထုရှည် ကောက်နုတ်ချက်များ' }, emoji: '📜', levels: ['b2'] },
  { id: 'rd-b2-research', name: { en: 'Research Articles', native: 'သုတေသနဆောင်းပါးများ' }, emoji: '🔬', levels: ['b2'] },
  { id: 'rd-b2-culture', name: { en: 'Cultural Comparisons', native: 'ယဉ်ကျေးမှု နှိုင်းယှဉ်ချက်များ' }, emoji: '🌐', levels: ['b2'] },
  { id: 'rd-b2-debates', name: { en: 'Debate Texts', native: 'ငြင်းခုံမှုဆိုင်ရာ စာများ' }, emoji: '⚖️', levels: ['b2'] },
  { id: 'rd-b2-manuals', name: { en: 'Manuals & Documents', native: 'လက်စွဲများနှင့် စာရွက်စာတမ်းများ' }, emoji: '⚙️', levels: ['b2'] },
  { id: 'rd-b2-interviews', name: { en: 'Interviews', native: 'အင်တာဗျူးများ' }, emoji: '🎤', levels: ['b2'] },

  // C1 (Advanced)
  { id: 'rd-c1-journals', name: { en: 'Academic Journals', native: 'ပညာရပ်ဆိုင်ရာ ဂျာနယ်များ' }, emoji: '🧑‍🏫', levels: ['c1'] },
  { id: 'rd-c1-opinion-articles', name: { en: 'Complex Opinion Articles', native: 'ရှုပ်ထွေးသော ထင်မြင်ချက်ဆောင်းပါးများ' }, emoji: '🧠', levels: ['c1'] },
  { id: 'rd-c1-literature', name: { en: 'Classic Literature', native: 'ဂန္ထဝင်စာပေ' }, emoji: '🏛️', levels: ['c1'] },
  { id: 'rd-c1-essays', name: { en: 'Abstract Essays', native: 'ဒဿနိက အက်ဆေးများ' }, emoji: '🤔', levels: ['c1'] },
  { id: 'rd-c1-reviews', name: { en: 'Critical Reviews', native: 'ဝေဖန်သုံးသပ်ချက်များ' }, emoji: '🎭', levels: ['c1'] },
  { id: 'rd-c1-science', name: { en: 'Scientific Articles', native: 'သိပ္ပံဆိုင်ရာ ဆောင်းပါးများ' }, emoji: '🧬', levels: ['c1'] },
  { id: 'rd-c1-legal', name: { en: 'Policy & Legal Texts', native: 'မူဝါဒနှင့် ဥပဒေစာများ' }, emoji: '⚖️', levels: ['c1'] },
  { id: 'rd-c1-history', name: { en: 'Historical Analysis', native: 'သမိုင်းပိုင်းခြားစိတ်ဖြာချက်' }, emoji: '🏺', levels: ['c1'] },

  // C2 (Mastery)
  { id: 'rd-c2-papers', name: { en: 'Academic Papers', native: 'ပညာရပ်ဆိုင်ရာ စာတမ်းများ' }, emoji: '🎓', levels: ['c2'] },
  { id: 'rd-c2-legal', name: { en: 'Legal Documents', native: 'ဥပဒေဆိုင်ရာ စာရွက်စာတမ်းများ' }, emoji: '🧑‍⚖️', levels: ['c2'] },
  { id: 'rd-c2-novels', name: { en: 'Classic Novels & Poetry', native: 'ဂန္ထဝင်ဝတ္ထုနှင့် ကဗျာ' }, emoji: '📜', levels: ['c2'] },
  { id: 'rd-c2-philosophy', name: { en: 'Advanced Philosophy', native: 'အဆင့်မြင့် ဒဿနိကဗေဒ' }, emoji: '💡', levels: ['c2'] },
  { id: 'rd-c2-professional', name: { en: 'Professional Texts', native: 'ပညာชีพဆိုင်ရာစာများ' }, emoji: '💼', levels: ['c2'] },
  { id: 'rd-c2-speeches', name: { en: 'Political Speeches', native: 'နိုင်ငံရေးမိန့်ခွန်းများ' }, emoji: '🎤', levels: ['c2'] },
  { id: 'rd-c2-dialects', name: { en: 'Idiomatic Literature', native: 'ဆိုရိုးစကား စာပေ' }, emoji: '🗺️', levels: ['c2'] },
  { id: 'rd-c2-satire', name: { en: 'Satire & Rhetoric', native: 'သရော်စာနှင့် အပြောအဆိုပညာ' }, emoji: '🎨', levels: ['c2'] },
];


export const GRAMMAR_TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'a1-parts-of-speech', name: { en: 'Parts of Speech', native: 'စကားလုံးအမျိုးအစားများ' }, emoji: '🧩', levels: ['a1'] },
  { id: 'a1-basic-sentence', name: { en: 'Basic Sentence Structure', native: 'အခြေခံဝါကျတည်ဆောက်ပုံ' }, emoji: '🧱', levels: ['a1'] },
  { id: 'a1-articles', name: { en: 'Articles (a, an, the)', native: 'Articles (a, an, the)' }, emoji: '🏷️', levels: ['a1'] },
  { id: 'a1-plurals', name: { en: 'Singular & Plural Nouns', native: 'နာမ် အနည်းနှင့် အများ' }, emoji: '🐈', levels: ['a1'] },
  { id: 'a1-be-verbs', name: { en: 'Be Verbs (am, is, are)', native: 'Be Verbs (am, is, are)' }, emoji: '🧍', levels: ['a1'] },
  { id: 'a1-have-has', name: { en: 'Have / Has', native: 'Have / Has' }, emoji: '🤝', levels: ['a1'] },
  { id: 'a1-present-simple', name: { en: 'Present Simple Tense', native: 'ပစ္စုပ္ပန်ကာလ (ရိုးရိုး)' }, emoji: '⏰', levels: ['a1'] },
  { id: 'a1-questions', name: { en: 'Basic Questions (Who, What, Where)', native: 'အခြေခံမေးခွန်းများ' }, emoji: '❓', levels: ['a1'] },
  { id: 'a1-possessives', name: { en: 'Possessives (my, your, \'s)', native: 'ပိုင်ဆိုင်မှုကိုပြသော စကားလုံးများ' }, emoji: '🎁', levels: ['a1'] },
  { id: 'a1-demonstratives', name: { en: 'Demonstratives (this, that)', native: 'အညွှန်းစကားလုံးများ' }, emoji: '👉', levels: ['a1'] },
  { id: 'a1-there-is-are', name: { en: 'There is / There are', native: 'There is / There are' }, emoji: '📍', levels: ['a1'] },
  { id: 'a1-can-cant', name: { en: 'can / can’t', native: 'can / can’t' }, emoji: '💪', levels: ['a1'] },

  // A2 (Elementary)
  { id: 'a2-past-simple', name: { en: 'Past Simple Tense', native: 'အတိတ်ကာလ (ရိုးရိုး)' }, emoji: '🕰️', levels: ['a2'] },
  { id: 'a2-future-forms', name: { en: 'Future (will, going to)', native: 'အနာဂတ်ကာလ (will, going to)' }, emoji: '🔮', levels: ['a2'] },
  { id: 'a2-present-continuous', name: { en: 'Present Continuous', native: 'ပစ္စုပ္ပန်ကာလ (ဆက်လက်ဖြစ်နေဆဲ)' }, emoji: '🏃', levels: ['a2'] },
  { id: 'a2-quantifiers', name: { en: 'Countable/Uncountable Nouns', native: 'ရေတွက်နိုင်သော/မနိုင်သော နာမ်များ' }, emoji: '🍚', levels: ['a2'] },
  { id: 'a2-comparatives', name: { en: 'Comparatives & Superlatives', native: 'နှိုင်းယှဉ်မှုဆိုင်ရာ စကားလုံးများ' }, emoji: '📊', levels: ['a2'] },
  { id: 'a2-adverbs-frequency', name: { en: 'Adverbs of Frequency', native: 'အကြိမ်နှုန်းပြ ကြိယာဝိသေသန' }, emoji: '🔁', levels: ['a2'] },
  { id: 'a2-object-pronouns', name: { en: 'Object Pronouns', native: 'ကံပုဒ်နာမ်စားများ' }, emoji: '🎯', levels: ['a2'] },
  { id: 'a2-prepositions', name: { en: 'Prepositions of Time & Place', native: 'အချိန်နှင့် နေရာပြ ဝိဘတ်များ' }, emoji: '🗺️', levels: ['a2'] },
  { id: 'a2-gerunds', name: { en: 'Like / love / hate + verb-ing', native: 'Like / love / hate + verb-ing' }, emoji: '😍', levels: ['a2'] },
  { id: 'a2-must-have-to', name: { en: 'Must / Have to', native: 'Must / Have to' }, emoji: '📜', levels: ['a2'] },
  
  // B1 (Intermediate)
  { id: 'b1-present-perfect', name: { en: 'Present Perfect', native: 'Present Perfect' }, emoji: '✅', levels: ['b1'] },
  { id: 'b1-present-perfect-continuous', name: { en: 'Present Perfect Continuous', native: 'Present Perfect Continuous' }, emoji: '🔄', levels: ['b1'] },
  { id: 'b1-past-continuous', name: { en: 'Past Continuous', native: 'အတိတ်ကာလ (ဆက်လက်ဖြစ်နေဆဲ)' }, emoji: '🚶‍♂️', levels: ['b1'] },
  { id: 'b1-used-to', name: { en: 'Used to', native: 'Used to' }, emoji: '👴', levels: ['b1'] },
  { id: 'b1-first-conditional', name: { en: 'First Conditional', native: 'First Conditional' }, emoji: '⚖️', levels: ['b1'] },
  { id: 'b1-second-conditional', name: { en: 'Second Conditional', native: 'Second Conditional' }, emoji: '🤔', levels: ['b1'] },
  { id: 'b1-reported-speech', name: { en: 'Reported Speech', native: 'သွယ်ဝိုက်ပြောဆိုခြင်း' }, emoji: '🗣️', levels: ['b1'] },
  { id: 'b1-passive-voice', name: { en: 'Passive Voice (Simple)', native: 'Passive Voice (ရိုးရိုး)' }, emoji: '🎭', levels: ['b1'] },
  { id: 'b1-relative-clauses', name: { en: 'Relative Clauses (who, which, that)', native: 'Relative Clauses' }, emoji: '🔗', levels: ['b1'] },
  { id: 'b1-gerunds-infinitives', name: { en: 'Gerunds & Infinitives', native: 'Gerunds နှင့် Infinitives' }, emoji: '📚', levels: ['b1'] },
  { id: 'b1-modals', name: { en: 'Modal Verbs (should, could, might)', native: 'Modal Verbs' }, emoji: '💡', levels: ['b1'] },
  
  // B2 (Upper Intermediate)
  { id: 'b2-past-perfect', name: { en: 'Past Perfect', native: 'Past Perfect' }, emoji: '⏳', levels: ['b2'] },
  { id: 'b2-mixed-conditionals', name: { en: 'Mixed Conditionals', native: 'Mixed Conditionals' }, emoji: '🔀', levels: ['b2'] },
  { id: 'b2-advanced-modals', name: { en: 'Advanced Modals (should have)', native: 'အဆင့်မြင့် Modal Verbs' }, emoji: '🧐', levels: ['b2'] },
  { id: 'b2-wish-if-only', name: { en: 'Wish / If only', native: 'Wish / If only' }, emoji: '🙏', levels: ['b2'] },
  { id: 'b2-passive-all-tenses', name: { en: 'Passive Voice (All Tenses)', native: 'Passive Voice (ကာလအားလုံး)' }, emoji: '🏛️', levels: ['b2'] },
  { id: 'b2-inversion', name: { en: 'Inversion (Never have I...)', native: 'Inversion' }, emoji: '🔄', levels: ['b2'] },
  { id: 'b2-linking-words', name: { en: 'Linking Words (although, despite)', native: 'ဆက်စပ်စကားလုံးများ' }, emoji: '🔗', levels: ['b2'] },
  { id: 'b2-gerund-vs-infinitive', name: { en: 'Gerund vs Infinitive (stop to do/doing)', native: 'Gerund နှင့် Infinitive ခြားနားချက်' }, emoji: '⚖️', levels: ['b2'] },
  { id: 'b2-cleft-sentences', name: { en: 'Cleft Sentences (It was...)', native: 'Cleft Sentences' }, emoji: '✨', levels: ['b2'] },

  // C1 (Advanced)
  { id: 'c1-future-perfect-continuous', name: { en: 'Future Perfect Continuous', native: 'Future Perfect Continuous' }, emoji: '🤖', levels: ['c1'] },
  { id: 'c1-subjunctive', name: { en: 'Subjunctive Mood', native: 'Subjunctive Mood' }, emoji: '🧐', levels: ['c1'] },
  { id: 'c1-advanced-conditionals', name: { en: 'Advanced Conditionals', native: 'အဆင့်မြင့် Conditionals' }, emoji: '🧠', levels: ['c1'] },
  { id: 'c1-complex-passive', name: { en: 'Complex Passive', native: 'ရှုပ်ထွေးသော Passive Voice' }, emoji: '🏗️', levels: ['c1'] },
  { id: 'c1-ellipsis-substitution', name: { en: 'Ellipsis & Substitution', native: 'Ellipsis နှင့် Substitution' }, emoji: '✂️', levels: ['c1'] },
  { id: 'c1-advanced-inversion', name: { en: 'Advanced Inversion', native: 'အဆင့်မြင့် Inversion' }, emoji: '🎢', levels: ['c1'] },
  { id: 'c1-hedging-language', name: { en: 'Hedging Language', native: 'Hedging Language' }, emoji: '⚖️', levels: ['c1'] },
  { id: 'c1-parallel-structures', name: { en: 'Parallel Structures', native: 'Parallel Structures' }, emoji: '⏸️', levels: ['c1'] },
  { id: 'c1-phrasal-verbs-academic', name: { en: 'Phrasal Verbs (Academic)', native: 'Phrasal Verbs (ပညာရပ်ဆိုင်ရာ)' }, emoji: '🎓', levels: ['c1'] },

  // C2 (Proficient)
  { id: 'c2-nuances-tense', name: { en: 'Nuances of Tense and Aspect', native: 'ကာလများ၏ အsubtle ခြားနားချက်' }, emoji: '🎨', levels: ['c2'] },
  { id: 'c2-idiomatic-structures', name: { en: 'Idiomatic Grammar Structures', native: 'Idiomatic သဒ္ဒါတည်ဆောက်ပုံ' }, emoji: '🎭', levels: ['c2'] },
  { id: 'c2-advanced-cohesion', name: { en: 'Advanced Cohesion', native: 'အဆင့်မြင့် စာဆက်စပ်မှု' }, emoji: '🔗', levels: ['c2'] },
  { id: 'c2-stylistic-fronting', name: { en: 'Stylistic Fronting', native: 'Stylistic Fronting' }, emoji: '💅', levels: ['c2'] },
  { id: 'c2-emotive-inversion', name: { en: 'Emotive Inversion & Emphasis', native: 'ခံစားမှုပြ Inversion' }, emoji: '💥', levels: ['c2'] },
  { id: 'c2-grammar-in-literature', name: { en: 'Grammar in Literature', native: 'စာပေမှ သဒ္ဒါ' }, emoji: '📜', levels: ['c2'] },
];

export const JAPANESE_GRAMMAR_TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'ja-a1-word-order', name: { en: 'Word Order (SOV)', native: '語順 (SOV)' }, emoji: '🧱', levels: ['a1'] },
  { id: 'ja-a1-particles-basic', name: { en: 'Particles (は, が, を, の, に, へ, で)', native: '助詞 (は, が, を, の, に, へ, で)' }, emoji: '🧩', levels: ['a1'] },
  { id: 'ja-a1-copula', name: { en: 'Copula (です, だ)', native: 'です・だ' }, emoji: '🔗', levels: ['a1'] },
  { id: 'ja-a1-sentence-types', name: { en: 'Basic Sentence Types', native: '基本的な文の種類' }, emoji: '❓', levels: ['a1'] },
  { id: 'ja-a1-politeness', name: { en: 'Politeness (です・ます form)', native: '丁寧語 (です・ます)' }, emoji: '🙇', levels: ['a1'] },
  { id: 'ja-a1-verbs-basic', name: { en: 'Basic Verb Conjugation', native: '動詞の基本活用' }, emoji: '🏃', levels: ['a1'] },
  { id: 'ja-a1-demonstratives', name: { en: 'Demonstratives (これ, それ, あれ)', native: '指示詞 (これ, それ, あれ)' }, emoji: '👉', levels: ['a1'] },
  { id: 'ja-a1-adjectives', name: { en: 'Adjectives (い & な)', native: '形容詞 (い・な)' }, emoji: '🎨', levels: ['a1'] },
  { id: 'ja-a1-existence', name: { en: 'Existence (あります, います)', native: '存在 (あります, います)' }, emoji: '📍', levels: ['a1'] },
  { id: 'ja-a1-counters', name: { en: 'Counters', native: '助数詞' }, emoji: '🔢', levels: ['a1'] },
  { id: 'ja-a1-desire', name: { en: 'Desire (~たい)', native: '願望 (～たい)' }, emoji: '🙏', levels: ['a1'] },

  // A2 (Elementary)
  { id: 'ja-a2-te-form', name: { en: 'Te-form', native: 'て形' }, emoji: '🔗', levels: ['a2'] },
  { id: 'ja-a2-te-form-uses', name: { en: 'Te-form Uses (requests, progressive)', native: 'て形の用法 (～てください, ～ている)' }, emoji: '⚙️', levels: ['a2'] },
  { id: 'ja-a2-past-polite', name: { en: 'Polite Past (~ました)', native: '過去形 (～ました)' }, emoji: '🕰️', levels: ['a2'] },
  { id: 'ja-a2-experience', name: { en: 'Experience (~たことがある)', native: '経験 (～たことがある)' }, emoji: '✈️', levels: ['a2'] },
  { id: 'ja-a2-frequency', name: { en: 'Frequency Adverbs', native: '頻度の副詞' }, emoji: '🔁', levels: ['a2'] },
  { id: 'ja-a2-comparisons', name: { en: 'Comparisons (より, ほど)', native: '比較 (より, ほど)' }, emoji: '📊', levels: ['a2'] },
  { id: 'ja-a2-giving-receiving', name: { en: 'Giving & Receiving', native: '授受動詞' }, emoji: '🎁', levels: ['a2'] },
  { id: 'ja-a2-suggestions', name: { en: 'Suggestions (~ましょう)', native: '提案 (～ましょう)' }, emoji: '🙋', levels: ['a2'] },
  { id: 'ja-a2-obligation', name: { en: 'Obligation (~なければなりません)', native: '義務 (～なければなりません)' }, emoji: '📜', levels: ['a2'] },
  { id: 'ja-a2-plans', name: { en: 'Future Plans (~つもりです)', native: '予定 (～つもりです)' }, emoji: '🗓️', levels: ['a2'] },
  { id: 'ja-a2-likes-dislikes', name: { en: 'Likes/Dislikes (~が好きです)', native: '好き嫌い (～が好きです)' }, emoji: '❤️', levels: ['a2'] },
  { id: 'ja-a2-conditional-tara', name: { en: 'Conditional (~たら)', native: '条件形 (～たら)' }, emoji: '☔', levels: ['a2'] },

  // B1 (Intermediate)
  { id: 'ja-b1-plain-form', name: { en: 'Plain Form vs Polite Form', native: '普通形と丁寧形' }, emoji: '🗣️', levels: ['b1'] },
  { id: 'ja-b1-sentence-particles', name: { en: 'Sentence-final Particles (ね, よ)', native: '終助詞 (ね, よ)' }, emoji: '💬', levels: ['b1'] },
  { id: 'ja-b1-conditionals', name: { en: 'Conditionals (なら, と, ば)', native: '条件形 (なら, と, ば)' }, emoji: '⚙️', levels: ['b1'] },
  { id: 'ja-b1-potential', name: { en: 'Potential Verbs', native: '可能動詞' }, emoji: '💪', levels: ['b1'] },
  { id: 'ja-b1-volitional', name: { en: 'Volitional Form', native: '意向形' }, emoji: '🚀', levels: ['b1'] },
  { id: 'ja-b1-transitive', name: { en: 'Transitive & Intransitive Verbs', native: '自動詞と他動詞' }, emoji: '↔️', levels: ['b1'] },
  { id: 'ja-b1-passive', name: { en: 'Passive Voice', native: '受身形' }, emoji: '🎭', levels: ['b1'] },
  { id: 'ja-b1-causative', name: { en: 'Causative', native: '使役形' }, emoji: ' puppeteer', levels: ['b1'] },
  { id: 'ja-b1-causative-passive', name: { en: 'Causative-Passive', native: '使役受身形' }, emoji: '😫', levels: ['b1'] },
  { id: 'ja-b1-relative-clauses', name: { en: 'Relative Clauses', native: '関係節' }, emoji: '🔗', levels: ['b1'] },
  { id: 'ja-b1-reported-speech', name: { en: 'Reported Speech (~と言う)', native: '伝聞 (～と言う)' }, emoji: '📢', levels: ['b1'] },
  { id: 'ja-b1-reason', name: { en: 'Reason/Cause (から, ので)', native: '理由 (から, ので)' }, emoji: '💡', levels: ['b1'] },
  { id: 'ja-b1-purpose', name: { en: 'Purpose (ために, ように)', native: '目的 (ために, ように)' }, emoji: '🎯', levels: ['b1'] },

  // B2 (Upper Intermediate)
  { id: 'ja-b2-concessive', name: { en: 'Concessive (~ても, ~のに)', native: '逆接 (～ても, ～のに)' }, emoji: '🤷', levels: ['b2'] },
  { id: 'ja-b2-nominalizers', name: { en: 'Nominalizers (こと, の)', native: '名詞化 (こと, の)' }, emoji: '📦', levels: ['b2'] },
  { id: 'ja-b2-probability', name: { en: 'Probability (~でしょう, ~らしい)', native: '推量 (～でしょう, ～らしい)' }, emoji: '🤔', levels: ['b2'] },
  { id: 'ja-b2-emphasis-ndesu', name: { en: 'Emphasis (なのです / んです)', native: '強調 (のです / んです)' }, emoji: '❗', levels: ['b2'] },
  { id: 'ja-b2-honorifics', name: { en: 'Honorifics (Sonkeigo)', native: '尊敬語' }, emoji: '👑', levels: ['b2'] },
  { id: 'ja-b2-humble', name: { en: 'Humble Forms (Kenjougo)', native: '謙譲語' }, emoji: '🙇‍♂️', levels: ['b2'] },
  { id: 'ja-b2-obligation-beki', name: { en: 'Obligation (~べきだ, ~はずだ)', native: '義務・当然 (～べきだ, ～はずだ)' }, emoji: '⚖️', levels: ['b2'] },
  { id: 'ja-b2-try', name: { en: 'Trying (~てみる)', native: '試行 (～てみる)' }, emoji: '🧪', levels: ['b2'] },
  { id: 'ja-b2-nuanced-aspect', name: { en: 'Nuanced Aspect (~てしまう, ~ておく)', native: 'アスペクト (～てしまう, ~ておく)' }, emoji: '✨', levels: ['b2'] },
  { id: 'ja-b2-similarity', name: { en: 'Similarity (~みたい, ~ようだ)', native: '様態 (～みたい, ～ようだ)' }, emoji: '👯', levels: ['b2'] },
  { id: 'ja-b2-contrast', name: { en: 'Contrast (は vs が)', native: '対比 (は vs が)' }, emoji: '🌓', levels: ['b2'] },
  { id: 'ja-b2-connectors', name: { en: 'Sentence Connectors', native: '接続詞' }, emoji: '🔗', levels: ['b2'] },

  // C1 (Advanced)
  { id: 'ja-c1-discourse-markers', name: { en: 'Advanced Discourse Markers', native: '高度な談話標識' }, emoji: '✒️', levels: ['c1'] },
  { id: 'ja-c1-emphasis-koso', name: { en: 'Emphasis (~こそ, ~しか~ない)', native: '強調 (～こそ, ～しか～ない)' }, emoji: '💥', levels: ['c1'] },
  { id: 'ja-c1-advanced-honorifics', name: { en: 'Advanced Honorifics Mastery', native: '敬語の習熟' }, emoji: '🎓', levels: ['c1'] },
  { id: 'ja-c1-formal-written', name: { en: 'Formal Written Grammar (~である)', native: '書き言葉の文法 (～である)' }, emoji: '📜', levels: ['c1'] },
  { id: 'ja-c1-advanced-concessive', name: { en: 'Advanced Concessive (~にしても)', native: '高度な逆接 (～にしても)' }, emoji: '🌪️', levels: ['c1'] },
  { id: 'ja-c1-complex-verbs', name: { en: 'Complex Verb Combinations', native: '複雑な動詞の組み合わせ' }, emoji: '🧩', levels: ['c1'] },
  { id: 'ja-c1-rhetorical-questions', name: { en: 'Rhetorical Questions', native: '反語' }, emoji: '🤔', levels: ['c1'] },

  // C2 (Proficient)
  { id: 'ja-c2-keigo', name: { en: 'Full Keigo System Mastery', native: '敬語体系の完全な習熟' }, emoji: '🏆', levels: ['c2'] },
  { id: 'ja-c2-classical-elements', name: { en: 'Classical Japanese Elements', native: '古典文法の要素' }, emoji: '🏮', levels: ['c2'] },
  { id: 'ja-c2-idiomatic-grammar', name: { en: 'Idiomatic Grammar', native: '慣用的な文法' }, emoji: '🎭', levels: ['c2'] },
  { id: 'ja-c2-nuanced-modality', name: { en: 'Nuanced Modality', native: 'ニュアンスのあるモダリティ' }, emoji: ' nuanced', levels: ['c2'] },
  { id: 'ja-c2-literary-grammar', name: { en: 'Stylistic/Literary Grammar', native: '文語・文体論' }, emoji: '📚', levels: ['c2'] },
  { id: 'ja-c2-academic-writing', name: { en: 'Grammar for Academic Writing', native: '学術論文の文法' }, emoji: '🔬', levels: ['c2'] },
  { id: 'ja-c2-register-switching', name: { en: 'Switching Between Registers', native: 'レジスターの切り替え' }, emoji: '🔄', levels: ['c2'] },
];

export const CHINESE_GRAMMAR_TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'zh-a1-word-order', name: { en: 'Word Order (SVO)', native: '语序 (SVO)' }, emoji: '🧱', levels: ['a1'] },
  { id: 'zh-a1-pronouns', name: { en: 'Personal Pronouns', native: '人称代词' }, emoji: '👤', levels: ['a1'] },
  { id: 'zh-a1-sentence-patterns', name: { en: 'Basic Sentence Patterns', native: '基本句型' }, emoji: '📝', levels: ['a1'] },
  { id: 'zh-a1-demonstratives', name: { en: 'Demonstratives (这, 那)', native: '指示代词 (这, 那)' }, emoji: '👉', levels: ['a1'] },
  { id: 'zh-a1-measure-words', name: { en: 'Measure Words', native: '量词' }, emoji: '📏', levels: ['a1'] },
  { id: 'zh-a1-time', name: { en: 'Numbers, Dates, Time', native: '数字、日期、时间' }, emoji: '📅', levels: ['a1'] },
  { id: 'zh-a1-modal-verbs', name: { en: 'Modal Verbs (会, 能, 要)', native: '能愿动词 (会, 能, 要)' }, emoji: '💡', levels: ['a1'] },
  { id: 'zh-a1-existence', name: { en: 'Existence (有 / 没有)', native: '有 / 没有' }, emoji: '🈶', levels: ['a1'] },
  { id: 'zh-a1-location', name: { en: 'Location with 在', native: '在字句' }, emoji: '📍', levels: ['a1'] },
  { id: 'zh-a1-prepositions', name: { en: 'Basic Prepositions', native: '基本介词' }, emoji: '🗺️', levels: ['a1'] },
  { id: 'zh-a1-aspect-le', name: { en: 'Aspect Markers (了, 过)', native: '动态助词 (了, 过)' }, emoji: '✅', levels: ['a1'] },

  // A2 (Elementary)
  { id: 'zh-a2-adverbs', name: { en: 'Adverbs of Frequency & Degree', native: '频率和程度副词' }, emoji: '🔁', levels: ['a2'] },
  { id: 'zh-a2-negation-mei-bu', name: { en: 'Negation (没 vs 不)', native: '否定 (没 vs 不)' }, emoji: '🚫', levels: ['a2'] },
  { id: 'zh-a2-progressive-aspect', name: { en: 'Progressive Aspect (在/正在)', native: '正在' }, emoji: '🏃', levels: ['a2'] },
  { id: 'zh-a2-de-possession', name: { en: 'Use of 的', native: '的字结构' }, emoji: ' sở hữu', levels: ['a2'] },
  { id: 'zh-a2-comparisons', name: { en: 'Comparisons (比, 没有, 一样)', native: '比较句 (比, 没有, 一样)' }, emoji: '📊', levels: ['a2'] },
  { id: 'zh-a2-resultative-complements', name: { en: 'Resultative Complements', native: '结果补语' }, emoji: '🎯', levels: ['a2'] },
  { id: 'zh-a2-sentence-particles', name: { en: 'Sentence-final Particles (吧, 呢, 啊)', native: '语气助词 (吧, 呢, 啊)' }, emoji: '💬', levels: ['a2'] },
  { id: 'zh-a2-verb-reduplication', name: { en: 'Verb Reduplication', native: '动词重叠' }, emoji: '👀', levels: ['a2'] },
  { id: 'zh-a2-serial-verbs', name: { en: 'Serial Verb Constructions', native: '连动句' }, emoji: '🚶‍♂️➡️️🛒', levels: ['a2'] },
  { id: 'zh-a2-desire', name: { en: 'Expressing Desire (想, 要, 打算)', native: '愿望 (想, 要, 打算)' }, emoji: '🙏', levels: ['a2'] },

  // B1 (Intermediate)
  { id: 'zh-b1-aspect-markers', name: { en: 'Aspect Markers in Detail (了, 过, 着)', native: '动态助词 (了, 过, 着)' }, emoji: '⚙️', levels: ['b1'] },
  { id: 'zh-b1-directional-complements', name: { en: 'Directional Complements', native: '趋向补语' }, emoji: '🧭', levels: ['b1'] },
  { id: 'zh-b1-potential-complements', name: { en: 'Potential Complements (得/不)', native: '可能补语' }, emoji: '💪', levels: ['b1'] },
  { id: 'zh-b1-complex-comparisons', name: { en: 'Complex Comparisons (比较, 更, 最)', native: '高级比较' }, emoji: '📈', levels: ['b1'] },
  { id: 'zh-b1-conjunctions', name: { en: 'Conjunctions', native: '连词' }, emoji: '🔗', levels: ['b1'] },
  { id: 'zh-b1-passive-bei', name: { en: 'Passive (被)', native: '被字句' }, emoji: '🎭', levels: ['b1'] },
  { id: 'zh-b1-ba-sentences', name: { en: '把 Sentences', native: '把字句' }, emoji: '📦', levels: ['b1'] },
  { id: 'zh-b1-duration', name: { en: 'Verb + 了 + Duration', native: '时量补语' }, emoji: '⏳', levels: ['b1'] },
  { id: 'zh-b1-haishi-huozhe', name: { en: '还是 vs 或者', native: '还是 vs 或者' }, emoji: '🤔', levels: ['b1'] },

  // B2 (Upper Intermediate)
  { id: 'zh-b2-degree-complements', name: { en: 'Advanced Complements of Degree', native: '程度补语' }, emoji: '🌡️', levels: ['b2'] },
  { id: 'zh-b2-nominalization-de', name: { en: 'Nominalization with 的', native: '的字短语' }, emoji: '✨', levels: ['b2'] },
  { id: 'zh-b2-topic-comment', name: { en: 'Topic-Comment Structure', native: '主谓谓语句' }, emoji: '💬', levels: ['b2'] },
  { id: 'zh-b2-shi-de', name: { en: 'Emphasis with 是…的', native: '是…的句' }, emoji: '❗', levels: ['b2'] },
  { id: 'zh-b2-hypothetical', name: { en: 'Hypothetical Clauses (要是, 如果)', native: '假设条件' }, emoji: '⚖️', levels: ['b2'] },
  { id: 'zh-b2-relative-clauses', name: { en: 'Relative Clauses', native: '定语从句' }, emoji: '🔗', levels: ['b2'] },
  { id: 'zh-b2-advanced-adverbs', name: { en: 'Advanced Adverbs', native: '高级副词' }, emoji: '🧐', levels: ['b2'] },

  // C1 (Advanced)
  { id: 'zh-c1-discourse-connectors', name: { en: 'Advanced Discourse Connectors', native: '高级关联词' }, emoji: '✒️', levels: ['c1'] },
  { id: 'zh-c1-formal-negation', name: { en: 'Formal Negation (未, 并不)', native: '书面语否定' }, emoji: '🚫', levels: ['c1'] },
  { id: 'zh-c1-cai-jiu', name: { en: 'Emphasis with 才 and 就', native: '才和就' }, emoji: '💥', levels: ['c1'] },
  { id: 'zh-c1-conditional-concessive', name: { en: 'Conditional & Concessive (即使)', native: '让步和条件' }, emoji: '🌪️', levels: ['c1'] },
  { id: 'zh-c1-formal-structures', name: { en: 'Formal Written Structures', native: '书面语结构' }, emoji: '📜', levels: ['c1'] },

  // C2 (Proficient)
  { id: 'zh-c2-classical-grammar', name: { en: 'Classical Chinese Grammar', native: '文言文语法' }, emoji: '🏮', levels: ['c2'] },
  { id: 'zh-c2-chengyu', name: { en: 'Idioms (成语)', native: '成语' }, emoji: '🎭', levels: ['c2'] },
  { id: 'zh-c2-discourse-grammar', name: { en: 'Discourse Grammar', native: '语篇语法' }, emoji: '📚', levels: ['c2'] },
  { id: 'zh-c2-rhetorical-devices', name: { en: 'Rhetorical Devices', native: '修辞手法' }, emoji: '🎨', levels: ['c2'] },
];

export const THAI_GRAMMAR_TOPICS: Topic[] = [
  // A1 (Beginner)
  { id: 'th-a1-word-order', name: { en: 'Word Order (SVO)', native: 'โครงสร้างประโยค (SVO)' }, emoji: '🧱', levels: ['a1'] },
  { id: 'th-a1-polite-particles', name: { en: 'Polite Particles (ครับ/ค่ะ)', native: 'คำลงท้ายสุภาพ (ครับ/ค่ะ)' }, emoji: '🙇', levels: ['a1'] },
  { id: 'th-a1-pronouns', name: { en: 'Personal Pronouns', native: 'คำสรรพนาม' }, emoji: '👤', levels: ['a1'] },
  { id: 'th-a1-negation-mai', name: { en: 'Negation (ไม่)', native: 'การปฏิเสธ (ไม่)' }, emoji: '🚫', levels: ['a1'] },
  { id: 'th-a1-questions', name: { en: 'Basic Questions', native: 'การสร้างคำถามพื้นฐาน' }, emoji: '❓', levels: ['a1'] },
  { id: 'th-a1-demonstratives', name: { en: 'Demonstratives (นี่, นั่น, โน่น)', native: 'คำชี้นำ (นี่, นั่น, โน่น)' }, emoji: '👉', levels: ['a1'] },
  { id: 'th-a1-classifiers', name: { en: 'Classifiers', native: 'လักษณนาม' }, emoji: '🔢', levels: ['a1'] },
  { id: 'th-a1-time', name: { en: 'Time, Days, Dates', native: 'เวลา วัน และวันที่' }, emoji: '📅', levels: ['a1'] },
  { id: 'th-a1-existence', name: { en: 'Possession/Existence (มี, อยู่)', native: 'การมีอยู่ (มี, อยู่)' }, emoji: '📍', levels: ['a1'] },
  { id: 'th-a1-adjectives', name: { en: 'Adjective Position', native: 'ตำแหน่งคำคุณศัพท์' }, emoji: '🎨', levels: ['a1'] },
  { id: 'th-a1-prepositions', name: { en: 'Basic Prepositions', native: 'คำบุพบทพื้นฐาน' }, emoji: '🗺️', levels: ['a1'] },
  { id: 'th-a1-conjunctions', name: { en: 'Simple Conjunctions', native: 'คำสันธานพื้นฐาน' }, emoji: '🔗', levels: ['a1'] },

  // A2 (Elementary)
  { id: 'th-a2-question-word-order', name: { en: 'Question Word Order', native: 'ลำดับคำในประโยคคำถาม' }, emoji: '🤔', levels: ['a2'] },
  { id: 'th-a2-yes-no-questions', name: { en: 'Yes/No Questions (ไหม, ใช่ไหม)', native: 'คำถามใช่/ไม่ใช่ (ไหม, ใช่ไหม)' }, emoji: '✅', levels: ['a2'] },
  { id: 'th-a2-negation-advanced', name: { en: 'Negation (ไม่ได้, ยังไม่)', native: 'การปฏิเสธ (ไม่ได้, ยังไม่)' }, emoji: '🚫', levels: ['a2'] },
  { id: 'th-a2-aspect-markers', name: { en: 'Aspect Markers (กำลัง, แล้ว, ยัง)', native: 'คำบอกการณ์ (กำลัง, แล้ว, ยัง)' }, emoji: '⚙️', levels: ['a2'] },
  { id: 'th-a2-desire-ability', name: { en: 'Desire & Ability', native: 'ความต้องการและความสามารถ' }, emoji: '💪', levels: ['a2'] },
  { id: 'th-a2-comparisons', name: { en: 'Comparisons', native: 'การเปรียบเทียบ' }, emoji: '📊', levels: ['a2'] },
  { id: 'th-a2-quantity', name: { en: 'Quantity Expressions', native: 'การบอกปริมาณ' }, emoji: '⚖️', levels: ['a2'] },
  { id: 'th-a2-commands', name: { en: 'Commands & Requests', native: 'คำสั่งและคำขอ' }, emoji: '🗣️', levels: ['a2'] },
  { id: 'th-a2-future', name: { en: 'Future Tense (จะ)', native: 'อนาคตกาล (จะ)' }, emoji: '🔮', levels: ['a2'] },
  { id: 'th-a2-serial-verbs', name: { en: 'Serial Verbs', native: 'คำกริยาเรียง' }, emoji: '🚶‍♂️➡️️🛒', levels: ['a2'] },
  { id: 'th-a2-hai-expressions', name: { en: 'Expressions with ให้', native: 'การใช้ "ให้"' }, emoji: '🎁', levels: ['a2'] },

  // B1 (Intermediate)
  { id: 'th-b1-time-expressions', name: { en: 'Complex Time Expressions', native: 'สำนวนบอกเวลาที่ซับซ้อน' }, emoji: '🕰️', levels: ['b1'] },
  { id: 'th-b1-past-tense', name: { en: 'Past Tense (ได้)', native: 'อดีตกาล (ได้)' }, emoji: '⏪', levels: ['b1'] },
  { id: 'th-b1-future-intention', name: { en: 'Future Intention (จะ, คงจะ)', native: 'ความตั้งใจในอนาคต (จะ, คงจะ)' }, emoji: '🚀', levels: ['b1'] },
  { id: 'th-b1-passive', name: { en: 'Passive Voice (ถูก/โดน)', native: 'ประโยคกรรมวาจก (ถูก/โดน)' }, emoji: '🎭', levels: ['b1'] },
  { id: 'th-b1-relative-clauses', name: { en: 'Relative Clauses (ที่)', native: 'ประโยคขยาย (ที่)' }, emoji: '🔗', levels: ['b1'] },
  { id: 'th-b1-cause-effect', name: { en: 'Cause & Effect (เพราะ...จึง)', native: 'เหตุและผล (เพราะ...จึง)' }, emoji: '💡', levels: ['b1'] },
  { id: 'th-b1-concessive', name: { en: 'Concessive (ถึงแม้ว่า...ก็)', native: 'ประโยคขัดแย้ง (ถึงแม้ว่า...ก็)' }, emoji: '🤷', levels: ['b1'] },
  { id: 'th-b1-conditionals', name: { en: 'Conditionals (ถ้า...ก็)', native: 'ประโยคเงื่อนไข (ถ้า...ก็)' }, emoji: '⚖️', levels: ['b1'] },
  { id: 'th-b1-mood-particles', name: { en: 'Mood Particles (ล่ะ, หรอก)', native: 'คำลงท้ายแสดงอารมณ์ (ล่ะ, หรอก)' }, emoji: '💬', levels: ['b1'] },
  { id: 'th-b1-causative-hai', name: { en: 'Causative (ให้)', native: 'การใช้ "ให้" (Causative)' }, emoji: ' puppeteer', levels: ['b1'] },
  { id: 'th-b1-reduplication', name: { en: 'Reduplication', native: 'การซ้ำคำ' }, emoji: '🔁', levels: ['b1'] },

  // B2 (Upper Intermediate)
  { id: 'th-b2-advanced-aspect', name: { en: 'Advanced Aspect Markers', native: 'คำบอกการณ์ขั้นสูง' }, emoji: '✨', levels: ['b2'] },
  { id: 'th-b2-nominalization', name: { en: 'Nominalization (การ/ความ)', native: 'การสร้างคำนาม (การ/ความ)' }, emoji: '📦', levels: ['b2'] },
  { id: 'th-b2-complex-comparisons', name: { en: 'Complex Comparisons (ยิ่ง...ยิ่ง)', native: 'การเปรียบเทียบขั้นสูง (ยิ่ง...ยิ่ง)' }, emoji: '📈', levels: ['b2'] },
  { id: 'th-b2-emphasis', name: { en: 'Emphasis Structures', native: 'โครงสร้างเน้นความ' }, emoji: '❗', levels: ['b2'] },
  { id: 'th-b2-contrast-conjunctions', name: { en: 'Contrast Conjunctions', native: 'คำสันธานแสดงความขัดแย้ง' }, emoji: '🌓', levels: ['b2'] },
  { id: 'th-b2-reported-speech', name: { en: 'Reported Speech (ว่า...)', native: 'ประโยคบอกเล่า (ว่า...)' }, emoji: '📢', levels: ['b2'] },
  { id: 'th-b2-pronoun-registers', name: { en: 'Formal vs Informal Pronouns', native: 'สรรพนามทางการและไม่ทางการ' }, emoji: '👑', levels: ['b2'] },

  // C1 (Advanced)
  { id: 'th-c1-advanced-connectors', name: { en: 'Advanced Connectors', native: 'คำเชื่อมขั้นสูง' }, emoji: '✒️', levels: ['c1'] },
  { id: 'th-c1-emphatic-word-order', name: { en: 'Emphatic Word Order', native: 'การเรียงลำดับคำเพื่อเน้นความ' }, emoji: '💥', levels: ['c1'] },
  { id: 'th-c1-rhetorical-questions', name: { en: 'Rhetorical Questions', native: 'คำถามเชิงวาทศิลป์' }, emoji: '🤔', levels: ['c1'] },
  { id: 'th-c1-academic-structures', name: { en: 'Formal/Academic Structures', native: 'โครงสร้างทางวิชาการ' }, emoji: '📜', levels: ['c1'] },
  { id: 'th-c1-nuanced-modality', name: { en: 'Nuanced Modality', native: 'กริยานุเคราะห์แสดงความน่าจะเป็น' }, emoji: '🧐', levels: ['c1'] },

  // C2 (Proficient)
  { id: 'th-c2-register-mastery', name: { en: 'Register Variation (Royal)', native: 'ระดับภาษา (ราชาศัพท์)' }, emoji: '🏆', levels: ['c2'] },
  { id: 'th-c2-particle-mastery', name: { en: 'Particle Nuance Mastery', native: 'การใช้คำลงท้ายอย่างเชี่ยวชาญ' }, emoji: ' nuanced', levels: ['c2'] },
  { id: 'th-c2-literary-grammar', name: { en: 'Literary & Poetic Structures', native: 'ไวยากรณ์ในวรรณกรรม' }, emoji: '📚', levels: ['c2'] },
  { id: 'th-c2-topic-comment', name: { en: 'Topic-Comment Structure', native: 'โครงสร้างหัวเรื่อง-ความคิดเห็น' }, emoji: '💬', levels: ['c2'] },
  { id: 'th-c2-idiomatic-grammar', name: { en: 'Idiomatic Grammar', native: 'ไวยากรณ์สำนวน' }, emoji: '🎭', levels: ['c2'] },
];

export const KNOWLEDGE_TOPICS: Topic[] = [
  // Geography & Places
  { id: 'k-geo-countries', name: { en: 'Continents, Countries, Capitals', native: 'Continents, Countries, Capitals' }, emoji: '🗺️' },
  { id: 'k-geo-landmarks', name: { en: 'Major Cities and Landmarks', native: 'Major Cities and Landmarks' }, emoji: '🗽' },
  { id: 'k-geo-features', name: { en: 'Rivers, Mountains, Deserts', native: 'Rivers, Mountains, Deserts' }, emoji: '🏞️' },
  { id: 'k-geo-climate', name: { en: 'Climate Zones and Seasons', native: 'Climate Zones and Seasons' }, emoji: '☀️' },
  { id: 'k-geo-wonders', name: { en: 'Famous Natural Wonders', native: 'Famous Natural Wonders' }, emoji: '🌋' },
  // History & Culture
  { id: 'k-hist-civilizations', name: { en: 'Ancient Civilizations', native: 'Ancient Civilizations' }, emoji: '🏺' },
  { id: 'k-hist-events', name: { en: 'Important Historical Events', native: 'Important Historical Events' }, emoji: '⚔️' },
  { id: 'k-hist-heritage', name: { en: 'Cultural Heritage & UNESCO Sites', native: 'Cultural Heritage & UNESCO Sites' }, emoji: '🏛️' },
  { id: 'k-hist-figures', name: { en: 'Famous Historical Figures', native: 'Famous Historical Figures' }, emoji: '👑' },
  { id: 'k-hist-holidays', name: { en: 'National Holidays and Festivals', native: 'National Holidays and Festivals' }, emoji: '🎉' },
  // Science & Nature
  { id: 'k-sci-body', name: { en: 'Human Body and Health', native: 'Human Body and Health' }, emoji: '🧍' },
  { id: 'k-sci-life', name: { en: 'Plants and Animals', native: 'Plants and Animals' }, emoji: '🌿' },
  { id: 'k-sci-space', name: { en: 'Space and Astronomy', native: 'Space and Astronomy' }, emoji: '🪐' },
  { id: 'k-sci-environment', name: { en: 'Environmental Awareness', native: 'Environmental Awareness' }, emoji: '♻️' },
  { id: 'k-sci-concepts', name: { en: 'Simple Physics Concepts', native: 'Simple Physics Concepts' }, emoji: '⚛️' },
  // Technology & Innovation
  { id: 'k-tech-internet', name: { en: 'Computers and the Internet', native: 'Computers and the Internet' }, emoji: '💻' },
  { id: 'k-tech-ai', name: { en: 'AI and Robotics', native: 'AI and Robotics' }, emoji: '🤖' },
  { id: 'k-tech-transport', name: { en: 'Transportation Technology', native: 'Transportation Technology' }, emoji: '✈️' },
  { id: 'k-tech-energy', name: { en: 'Renewable Energy', native: 'Renewable Energy' }, emoji: '🔋' },
  { id: 'k-tech-inventions', name: { en: 'Famous Inventions', native: 'Famous Inventions' }, emoji: '💡' },
  // Arts & Entertainment
  { id: 'k-art-literature', name: { en: 'Literature and Poetry', native: 'Literature and Poetry' }, emoji: '📚' },
  { id: 'k-art-music', name: { en: 'Music Genres and Instruments', native: 'Music Genres and Instruments' }, emoji: '🎵' },
  { id: 'k-art-visual', name: { en: 'Painting and Sculpture', native: 'Painting and Sculpture' }, emoji: '🎨' },
  { id: 'k-art-film', name: { en: 'Movies and TV Shows', native: 'Movies and TV Shows' }, emoji: '🎬' },
  { id: 'k-art-theatre', name: { en: 'Theatre and Performance Arts', native: 'Theatre and Performance Arts' }, emoji: '🎭' },
  // Society & Daily Life
  { id: 'k-soc-family', name: { en: 'Family Structures', native: 'Family Structures' }, emoji: '👨‍👩‍👧‍👦' },
  { id: 'k-soc-jobs', name: { en: 'Jobs and Professions', native: 'Jobs and Professions' }, emoji: '🧑‍🏫' },
  { id: 'k-soc-food', name: { en: 'Food and Cuisine', native: 'Food and Cuisine' }, emoji: '🍲' },
  { id: 'k-soc-sports', name: { en: 'Sports and Games', native: 'Sports and Games' }, emoji: '⚽' },
  { id: 'k-soc-education', name: { en: 'Education Systems', native: 'Education Systems' }, emoji: '🎓' },
  // Economics & Trade
  { id: 'k-econ-money', name: { en: 'Money and Banking', native: 'Money and Banking' }, emoji: '💰' },
  { id: 'k-econ-trade', name: { en: 'Trade and Commerce', native: 'Trade and Commerce' }, emoji: '📈' },
  { id: 'k-econ-brands', name: { en: 'Famous Companies', native: 'Famous Companies' }, emoji: '🏢' },
  // Politics & Governance
  { id: 'k-poli-gov', name: { en: 'Government Types', native: 'Government Types' }, emoji: '🏛️' },
  { id: 'k-poli-elections', name: { en: 'Voting and Elections', native: 'Voting and Elections' }, emoji: '🗳️' },
  { id: 'k-poli-orgs', name: { en: 'International Organizations', native: 'International Organizations' }, emoji: '🌐' },
  // Fun Knowledge
  { id: 'k-fun-quotes', name: { en: 'Famous Quotes', native: 'Famous Quotes' }, emoji: '💬' },
  { id: 'k-fun-myths', name: { en: 'Popular Myths and Legends', native: 'Popular Myths and Legends' }, emoji: '🐉' },
  { id: 'k-fun-records', name: { en: 'World Records', native: 'World Records' }, emoji: '🏆' },
];

export const THEMES: Theme[] = [
    { id: 'sakura', name: 'Sakura', emoji: '🌸' },
    { id: 'matcha', name: 'Matcha', emoji: '🍵' },
    { id: 'pastel-pop', name: 'Pastel Pop', emoji: '🍭' },
] as const;
